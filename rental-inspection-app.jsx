import React, { useMemo, useState } from "react";

/* -----------------------------------------------------------
   Helpers for printable report (no extra libraries needed)
----------------------------------------------------------- */
function collectFormValues(rootSelector = "#root") {
  const scope = document.querySelector(rootSelector) || document;
  const nodes = Array.from(scope.querySelectorAll("input, select, textarea"));

  const getLabel = (el) => {
    if (el.id) {
      const byFor = scope.querySelector(`label[for="${el.id}"]`);
      if (byFor) return byFor.textContent.trim();
    }
    if (
      el.previousElementSibling &&
      el.previousElementSibling.tagName === "LABEL"
    ) {
      return el.previousElementSibling.textContent.trim();
    }
    return el.name || el.placeholder || el.type || "Field";
  };

  // Merge radio buttons with same name; skip unchecked radios
  const grouped = {};
  nodes.forEach((el) => {
    if (el.type === "radio" && !el.checked) return;
    let val = "";
    if (el.type === "checkbox") val = el.checked ? "Yes" : "No";
    else val = el.value;

    const key = getLabel(el);
    if (!grouped[key]) grouped[key] = [];
    if (val !== "") grouped[key].push(val);
  });

  return Object.entries(grouped).map(([label, values]) => ({
    label,
    value: values.join(", "),
  }));
}

function openPrintableReport({ title = "NSPIRE Inspection Report", data = [] } = {}) {
  const rows = data
    .map(
      (r) => `
    <tr>
      <td>${r.label}</td>
      <td>${String(r.value).replace(/</g, "&lt;")}</td>
    </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    body { background:#fff; max-width:900px; margin:0 auto; padding:24px; }
    .report { background:#fff; padding:24px; border-radius:8px; }
    .report h1 { margin:0 0 12px; }
    table { width:100%; border-collapse:collapse; }
    th, td { border:1px solid #e5e7eb; padding:8px 10px; text-align:left; }
    th { background:#f8f9fa; }
    .noprint { margin-top:16px }
    @media print { .noprint{ display:none } }
  </style>
</head>
<body>
  <div class="report">
    <h1>NSPIRE-Compliant Rental Unit Inspection</h1>
    <p class="subtle">Generated ${new Date().toLocaleString()}</p>
    <table>
      <thead><tr><th>Field</th><th>Value</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="noprint">
      <button onclick="window.print()" class="btn">Print</button>
    </div>
  </div>
</body>
</html>`;

  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) {
    alert("Popup blocked. Allow popups to print the report.");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.onload = () => w.print();
}

/* -----------------------------------------------------------
   Main App
----------------------------------------------------------- */
function RentalInspectionApp() {
  // Step 1: high-level inspection info
  const [inspectionData, setInspectionData] = useState({
    programType: [],
    propertyName: "",
    propertyAddress: "",
    unitNumber: "",
    tenantFirstName: "",
    tenantLastName: "",
    tenantInitial: "",
    inspectorName: "",
    inspectionDate: new Date().toISOString().slice(0, 10),
    inspectionType: "Annual Inspection",
    reportNotes: "",
    complianceStatement: false,
  });

  // Stepper
  const [currentStep, setCurrentStep] = useState(1);

  // Step 2/4: rooms model (kept simple and robust)
  const [rooms, setRooms] = useState([]);

  const updateInspectionData = (field, value) =>
    setInspectionData((d) => ({ ...d, [field]: value }));

  const goToStep = (n) => setCurrentStep(n);
  const goToNextStep = () => setCurrentStep((n) => Math.min(5, n + 1));
  const goToPrevStep = () => setCurrentStep((n) => Math.max(1, n - 1));

  const programOptions = [
    "HUD",
    "HOME",
    "LIHTC",
    "USDA Rural Development",
    "Section 8",
    "Other",
  ];

  const availableRoomTypes = [
    "Living Room",
    "Kitchen",
    "Dining Area",
    "Bedroom",
    "Bathroom",
    "Hallway",
    "Laundry",
    "Closet",
    "Entry",
    "Balcony/Patio",
  ];

  // Add or remove a room entry
  const addRoom = (type) => {
    const id = `room-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
    setRooms((rs) => [
      ...rs,
      {
        id,
        type,
        name: `${type} ${rs.filter((r) => r.type === type).length + 1}`,
        notes: "",
        workOrder: false,
      },
    ]);
  };

  const removeRoom = (id) => setRooms((rs) => rs.filter((r) => r.id !== id));

  const updateRoom = (id, field, value) =>
    setRooms((rs) => rs.map((r) => (r.id === id ? { ...r, [field]: value } : r)));

  // Filename
  const generateFilename = useMemo(() => {
    const d = new Date(inspectionData.inspectionDate || Date.now());
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const last = (inspectionData.tenantLastName || "").trim();
    const initial =
      inspectionData.tenantInitial ||
      (inspectionData.tenantFirstName ? inspectionData.tenantFirstName[0] : "");
    // “LastName – Bi-annual Unit Inspection – YYYY-MM-DD” (you asked for this format earlier)
    return `${last} – Bi-annual Unit Inspection – ${yyyy}-${mm}-${dd}`;
  }, [inspectionData]);

  // Report
  const handleGenerateReport = () => {
    const data = collectFormValues("#root");
    // prepend a few key things that aren’t directly in labels
    data.unshift(
      { label: "Programs", value: inspectionData.programType.join(", ") },
      { label: "Rooms Count", value: rooms.length },
      {
        label: "Work Orders",
        value:
          rooms.filter((r) => r.workOrder).length > 0
            ? `${rooms.filter((r) => r.workOrder).length} flagged`
            : "None",
      },
      { label: "Report Filename", value: generateFilename }
    );
    openPrintableReport({ title: "NSPIRE Inspection Report", data });
  };

  /* ---------------------- RENDER HELPERS -------------------- */
  const Progress = () => (
    <div className="card">
      <div className="form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div><strong>NSPIRE-Compliant Unit Inspection</strong></div>
        <div style={{ textAlign: "right" }}>Step {currentStep} of 5</div>
      </div>
      <div className="checkbox-row" style={{ marginTop: 6 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`btn ${n === currentStep ? "" : "btn-secondary"}`}
            onClick={() => goToStep(n)}
            aria-label={`Go to step ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="file-list" style={{ marginTop: 8 }}>
        Property Info · Room Config · Global Features · Room Inspections · Generate Report
      </div>
    </div>
  );

  const Step1 = () => (
    <section className="card">
      <h2>Property & Tenant Information</h2>

      <fieldset>
        <legend>Federal Program Type (Select all that apply)</legend>
        <div className="checkbox-row">
          {programOptions.map((p) => (
            <label key={p}>
              <input
                type="checkbox"
                checked={inspectionData.programType.includes(p)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...inspectionData.programType, p]
                    : inspectionData.programType.filter((x) => x !== p);
                  updateInspectionData("programType", next);
                }}
              />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="form-grid">
        <div>
          <label htmlFor="propertyName">Property Name *</label>
          <input
            id="propertyName"
            type="text"
            placeholder="e.g., Park Village 1 & 2"
            value={inspectionData.propertyName}
            onChange={(e) => updateInspectionData("propertyName", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="propertyAddress">Property Address *</label>
          <input
            id="propertyAddress"
            type="text"
            placeholder="Full street address"
            value={inspectionData.propertyAddress}
            onChange={(e) => updateInspectionData("propertyAddress", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="unitNumber">Unit Number *</label>
          <input
            id="unitNumber"
            type="text"
            value={inspectionData.unitNumber}
            onChange={(e) => updateInspectionData("unitNumber", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tenantFirstName">Tenant First Name *</label>
          <input
            id="tenantFirstName"
            type="text"
            value={inspectionData.tenantFirstName}
            onChange={(e) => updateInspectionData("tenantFirstName", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tenantLastName">Tenant Last Name *</label>
          <input
            id="tenantLastName"
            type="text"
            value={inspectionData.tenantLastName}
            onChange={(e) => updateInspectionData("tenantLastName", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tenantInitial">Tenant Middle Initial</label>
          <input
            id="tenantInitial"
            type="text"
            maxLength={1}
            value={inspectionData.tenantInitial}
            onChange={(e) => updateInspectionData("tenantInitial", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="inspectorName">Inspector Name *</label>
          <input
            id="inspectorName"
            type="text"
            value={inspectionData.inspectorName}
            onChange={(e) => updateInspectionData("inspectorName", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="inspectionDate">Inspection Date *</label>
          <input
            id="inspectionDate"
            type="date"
            value={inspectionData.inspectionDate}
            onChange={(e) => updateInspectionData("inspectionDate", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="inspectionType">Inspection Type *</label>
          <select
            id="inspectionType"
            value={inspectionData.inspectionType}
            onChange={(e) => updateInspectionData("inspectionType", e.target.value)}
          >
            <option>Annual Inspection</option>
            <option>Move-In</option>
            <option>Move-Out</option>
            <option>Follow-Up</option>
          </select>
        </div>
      </div>

      <div className="nav">
        <button type="button" className="btn" onClick={goToNextStep}>
          Next
        </button>
      </div>
    </section>
  );

  const Step2 = () => (
    <section className="card">
      <h2>Configure Rooms</h2>

      <div className="checkbox-row">
        {availableRoomTypes.map((t) => (
          <button key={t} type="button" className="btn" onClick={() => addRoom(t)}>
            + Add {t}
          </button>
        ))}
      </div>

      <div className="file-list" style={{ marginTop: 10 }}>
        {rooms.length === 0 ? (
          <span>No rooms added yet.</span>
        ) : (
          rooms.map((r) => (
            <div key={r.id} className="section" style={{ marginTop: 8 }}>
              <div className="form-grid">
                <div>
                  <label>Room Name</label>
                  <input
                    type="text"
                    value={r.name}
                    onChange={(e) => updateRoom(r.id, "name", e.target.value)}
                  />
                </div>
                <div>
                  <label>Work Order Required</label>
                  <input
                    type="checkbox"
                    checked={!!r.workOrder}
                    onChange={(e) => updateRoom(r.id, "workOrder", e.target.checked)}
                  />
                </div>
              </div>
              <label>Notes</label>
              <textarea
                rows={3}
                value={r.notes}
                onChange={(e) => updateRoom(r.id, "notes", e.target.value)}
              />
              <div className="nav">
                <button type="button" className="btn btn-secondary" onClick={() => removeRoom(r.id)}>
                  Remove Room
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="nav">
        <button type="button" className="btn btn-secondary" onClick={goToPrevStep}>
          Previous
        </button>
        <button type="button" className="btn" onClick={goToNextStep}>
          Next
        </button>
      </div>
    </section>
  );

  const Step3 = () => (
    <section className="card">
      <h2>Global Safety & Compliance</h2>

      <fieldset>
        <legend>Safety Devices</legend>
        <div className="checkbox-row">
          <label><input type="checkbox" /> Smoke Alarms (Bedrooms & Hallways)</label>
          <label><input type="checkbox" /> CO₂ Alarm (Fuel-Burning Appliances)</label>
          <label><input type="checkbox" /> GFI Protection (Kitchen/Baths)</label>
          <label><input type="checkbox" /> Handrail (3+ risers)</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Water Heater Safety</legend>
        <div className="checkbox-row">
          <label><input type="checkbox" /> TPR Valve Present</label>
          <label><input type="checkbox" /> Drain Pan Installed</label>
          <label><input type="checkbox" /> Max Temp ≤ 120°F</label>
        </div>
      </fieldset>

      <div className="nav">
        <button type="button" className="btn btn-secondary" onClick={goToPrevStep}>
          Previous
        </button>
        <button type="button" className="btn" onClick={goToNextStep}>
          Next
        </button>
      </div>
    </section>
  );

  const Step4 = () => (
    <section className="card">
      <h2>Room-by-Room Inspection</h2>
      {rooms.length === 0 ? (
        <div className="alert info">No rooms configured yet. Add rooms in Step 2.</div>
      ) : (
        rooms.map((r) => (
          <div key={r.id} className="section">
            <h3 style={{ marginTop: 0 }}>{r.name}</h3>
            <div className="form-grid">
              <div>
                <label>Condition</label>
                <select
                  value={r.condition || ""}
                  onChange={(e) => updateRoom(r.id, "condition", e.target.value)}
                >
                  <option value=""></option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Poor</option>
                </select>
              </div>
              <div>
                <label>Defective Paint (Lead Concern)</label>
                <select
                  value={r.defectivePaint || ""}
                  onChange={(e) => updateRoom(r.id, "defectivePaint", e.target.value)}
                >
                  <option value=""></option>
                  <option>None</option>
                  <option>Minor</option>
                  <option>Major</option>
                </select>
              </div>
            </div>
            <label>Room Notes</label>
            <textarea
              rows={3}
              value={r.notes}
              onChange={(e) => updateRoom(r.id, "notes", e.target.value)}
            />
            <div className="nav">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={!!r.workOrder}
                  onChange={(e) => updateRoom(r.id, "workOrder", e.target.checked)}
                />
                Flag Work Order
              </label>
            </div>
          </div>
        ))
      )}

      <div className="nav">
        <button type="button" className="btn btn-secondary" onClick={goToPrevStep}>
          Previous
        </button>
        <button type="button" className="btn" onClick={goToNextStep}>
          Next
        </button>
      </div>
    </section>
  );

  const Step5 = () => (
    <section className="card">
      <h2>Generate Report</h2>

      <div className="section">
        <h3>Inspection Summary</h3>
        <div className="form-grid">
          <div>
            <strong>Property:</strong><br /> {inspectionData.propertyName}
          </div>
          <div>
            <strong>Unit:</strong><br /> {inspectionData.unitNumber}
          </div>
          <div>
            <strong>Tenant:</strong><br /> {inspectionData.tenantFirstName} {inspectionData.tenantLastName}
          </div>
          <div>
            <strong>Inspector:</strong><br /> {inspectionData.inspectorName}
          </div>
          <div>
            <strong>Date:</strong><br /> {inspectionData.inspectionDate}
          </div>
          <div>
            <strong>Type:</strong><br /> {inspectionData.inspectionType}
          </div>
        </div>
        <p className="subtle" style={{ marginTop: 6 }}>
          <strong>Programs:</strong> {inspectionData.programType.join(", ") || "—"}
        </p>
      </div>

      <div className="section">
        <h3>Rooms Inspected</h3>
        {rooms.length === 0 ? (
          <div className="alert info">No rooms configured.</div>
        ) : (
          <div className="file-list">
            {rooms.map((r) => (
              <div key={r.id}>
                ✅ {r.name}
                {r.workOrder ? " — 🔧 Work Order" : ""}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section">
        <label>Additional Report Notes</label>
        <textarea
          rows={4}
          value={inspectionData.reportNotes}
          onChange={(e) => updateInspectionData("reportNotes", e.target.value)}
        />
      </div>

      <div className="file-list">
        <strong>Report Filename:</strong> {generateFilename}
      </div>

      <div className="alert warning">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={inspectionData.complianceStatement}
            onChange={(e) => updateInspectionData("complianceStatement", e.target.checked)}
          />
          <span>
            NSPIRE Compliance Declaration: I certify this inspection was conducted in accordance with HUD NSPIRE and all applicable federal regulations.
          </span>
        </label>
      </div>

      <div className="nav">
        <button type="button" className="btn btn-secondary" onClick={goToPrevStep}>
          Previous
        </button>
        <button type="button" className="btn" onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
    </section>
  );

  /* ---------------------- MOUNT -------------------- */
  return (
    <div>
      <Progress />
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
      {currentStep === 3 && <Step3 />}
      {currentStep === 4 && <Step4 />}
      {currentStep === 5 && <Step5 />}
    </div>
  );
}

export default RentalInspectionApp;
