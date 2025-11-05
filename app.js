/**
 * NSPIRE-COMPLIANT RENTAL UNIT INSPECTION SYSTEM
 * 
 * Federal Compliance: HUD, HOME, LIHTC, USDA Rural Development
 * Standards: NSPIRE, Fair Housing Act, Section 504, 24 CFR Parts 5, 8, 100
 * 
 * This system assists with compliance but organizations are responsible for:
 * - Final compliance verification
 * - Staff training
 * - Legal counsel consultation
 * - State/local code compliance
 */

// ==================== GLOBAL STATE ====================
const AppState = {
    currentStep: 1,
    inspection: {
        // Step 1: Property & Tenant Information
        noticeServedDate: '',
        propertyName: '',
        propertyNameCustom: '',
        propertyNumber: '',
        propertyNumberCustom: '',
        todaysDate: new Date().toISOString().split('T')[0],
        inspector: '',
        inspectorCustom: '',
        building: '',
        buildingCustom: '',
        unitNumber: '',
        unitType: '',
        tenantFirstName: '',
        tenantLastName: '',
        programType: [],
        inspectionType: 'Bi-annual',
        
        // Step 2: Unit Layout
        bedrooms: 2,
        bathrooms: 1,
        hasLaundryRoom: false,
        hasLivingRoom: true,
        hasDiningRoom: false,
        hasKitchen: true,
        hasOutsideDeck: false,
        hasYard: false,
        hallways: 0,
        stairways: 0,
        
        // Step 3: Global Features
        heatingType: '',
        heatingFuel: '',
        coolingType: '',
        
        // Step 4: Rooms (generated dynamically)
        rooms: [],
        
        // Step 5: Water Heater
        waterHeater: {
            present: false,
            room: '',
            brand: '',
            model: '',
            serial: '',
            installDate: 'Unknown',
            customInstallDate: '',
            tempLTE120: true,
            hotWaterOK: true,
            duration: 'Adequate',
            hasTPRValve: true,
            hasDischargeLine: true,
            hasSedimentTrap: true,
            hasShutOff: true,
            hasGasFlue: true,
            condition: 'Good',
            action: 'None',
            comments: '',
            photos: [],
            workOrder: false,
            woNumber: ''
        },
        
        // Step 6: General/Safety
        generalSafety: {
            utilitiesOn: true,
            unitClean: true,
            dryerVentOutside: true,
            amenitiesWork: true,
            doorsSecure: true,
            locksWork: true,
            electricalSafe: true,
            windowsSecure: true,
            exteriorIssues: false,
            petsPresent: false,
            pestsPresent: false,
            comments: '',
            photos: [],
            workOrder: false,
            woNumber: ''
        },
        
        // Final Report
        reportNotes: '',
        complianceStatement: true
    },
    currentRoomIndex: 0
};

// ==================== CONSTANTS ====================
const PROPERTY_NAMES = [
    'Park Village 1 & 2',
    'Maple Court',
    'Oak Ridge Apartments',
    'Riverside Terrace',
    'Other (Custom)'
];

const PROPERTY_NUMBERS = ['001', '002', '003', '004', 'Other (Custom)'];

const INSPECTORS = [
    'Ellie McNelley',
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Other (Custom)'
];

const BUILDINGS = ['A', 'B', 'C', 'D', 'Other (Custom)'];

const UNIT_TYPES = [
    'Studio',
    '1 Bedroom',
    '2 Bedroom',
    '3 Bedroom',
    '4 Bedroom',
    '5 Bedroom'
];

const PROGRAM_TYPES = [
    'HUD',
    'HOME',
    'LIHTC',
    'USDA Rural Development',
    'Section 8',
    'Other'
];

const FLOORING_TYPES = [
    'Carpet',
    'Vinyl',
    'Hardwood',
    'Linoleum',
    'Vinyl Plank',
    'Cement',
    'Tile',
    'Laminate'
];

const CONDITIONS = ['New', 'Good', 'Fair', 'Poor', 'N/A'];

const INSTALL_DATES = ['Unknown', 'Pre-Rehab', 'Original', 'Custom'];

const ACTIONS = ['None', 'Repair', 'Replace', 'Diagnose'];

const APPLIANCE_TYPES = [
    'Refrigerator',
    'Stove/Range',
    'Range Hood',
    'Dishwasher',
    'Garbage Disposal',
    'Microwave',
    'Washer',
    'Dryer',
    'Other'
];

const DOOR_WIDTHS = ['28"', '30"', '35"', 'Custom'];
const DOOR_HEIGHTS = ['80"', '90"', 'Custom'];

// ==================== UTILITY FUNCTIONS ====================
function generateId() {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
}

function generateFilename() {
    const { propertyName, propertyNameCustom, unitNumber, tenantFirstName, tenantLastName, todaysDate } = AppState.inspection;
    
    const propName = propertyName === 'Other (Custom)' ? propertyNameCustom : propertyName;
    const initial = tenantFirstName.charAt(0).toUpperCase();
    const lastName = tenantLastName.replace(/\s+/g, '').replace(/-/g, '');
    const formattedDate = formatDate(todaysDate);
    
    return `${propName} ${unitNumber} ${initial}${lastName} Bi-annual Unit Inspection ${formattedDate}`;
}

function handlePhotoUpload(event, targetArray) {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
            targetArray.push({
                id: generateId(),
                data: reader.result,
                filename: file.name,
                timestamp: new Date().toISOString(),
                comment: ''
            });
            render();
        };
        reader.readAsDataURL(file);
    });
}

function removePhoto(targetArray, photoId) {
    const index = targetArray.findIndex(p => p.id === photoId);
    if (index > -1) {
        targetArray.splice(index, 1);
        render();
    }
}

// ==================== ROOM GENERATION ====================
function createRoom(type, name) {
    return {
        id: generateId(),
        type,
        name,
        
        // Universal fields
        closetsPresent: false,
        closetCount: 0,
        housekeeping: 'Yes',
        housekeepingComments: '',
        housekeepingPhotos: [],
        housekeepingWO: false,
        housekeepingWONumber: '',
        
        // Smoke/CO alarms
        hasSmokeAlarm: false,
        hasComboAlarm: false,
        hasCO2Alarm: false,
        alarmStatus: 'Working',
        alarmComments: '',
        alarmPhotos: [],
        alarmWO: false,
        alarmWONumber: '',
        
        // Flooring (not for Deck)
        flooringType: '',
        flooringInstallDate: 'Unknown',
        flooringCustomDate: '',
        flooringCondition: 'Good',
        flooringComments: '',
        flooringPhotos: [],
        flooringWO: false,
        flooringWONumber: '',
        
        // Walls/Paint/Bullnose
        wallsCondition: 'Good',
        paintDefective: false,
        bullnoseCondition: 'Good',
        closetOpeningsCondition: 'Good',
        wallsComments: '',
        wallsPhotos: [],
        wallsWO: false,
        wallsWONumber: '',
        
        // Doors
        entryDoorPresent: true,
        doorType: '',
        doorWidth: '30"',
        doorWidthCustom: '',
        doorHeight: '80"',
        doorHeightCustom: '',
        doorCondition: 'Good',
        doorAction: 'None',
        doorComments: '',
        doorPhotos: [],
        doorWO: false,
        doorWONumber: '',
        
        // Windows
        windowCount: 0,
        windowsOperable: true,
        windowsLocksWork: true,
        windowsTreatments: true,
        windowsCondition: 'Good',
        windowsComments: '',
        windowsPhotos: [],
        windowsWO: false,
        windowsWONumber: '',
        
        // Electrical
        outletCount: 0,
        outletsLoose: false,
        outletsFunctional: true,
        gfiRequired: false,
        gfiPresent: false,
        gfiWorks: true,
        electricalComments: '',
        electricalPhotos: [],
        electricalWO: false,
        electricalWONumber: '',
        
        // Heating/Cooling
        heatSources: [],
        coolingType: '',
        hvacCondition: 'Good',
        hvacAction: 'None',
        hvacComments: '',
        hvacPhotos: [],
        hvacWO: false,
        hvacWONumber: '',
        
        // Room-specific fields will be added based on type
        ...getRoomSpecificFields(type),
        
        // Appliances (for kitchen, laundry)
        appliances: []
    };
}

function getRoomSpecificFields(type) {
    const fields = {};
    
    switch(type) {
        case 'bedroom':
            fields.closetDoorsCondition = 'Good';
            fields.heaterPresent = false;
            fields.thermostatPresent = false;
            break;
            
        case 'bathroom':
            fields.sinkPresent = true;
            fields.sinkCondition = 'Good';
            fields.faucetCondition = 'Good';
            fields.plumbingLeaks = false;
            fields.toiletPresent = true;
            fields.toiletSecure = true;
            fields.toiletFlushes = true;
            fields.tubPresent = false;
            fields.showerPresent = false;
            fields.showerHeadCondition = 'Good';
            fields.surroundCondition = 'Good';
            fields.drainsWork = true;
            fields.ventingPresent = true;
            fields.ventingType = '';
            fields.bathroomComments = '';
            fields.bathroomPhotos = [];
            fields.bathroomWO = false;
            fields.bathroomWONumber = '';
            break;
            
        case 'kitchen':
            fields.cupboardsPresent = true;
            fields.cupboardCount = 0;
            fields.cupboardCondition = 'Good';
            fields.drawersPresent = true;
            fields.drawerCount = 0;
            fields.drawerCondition = 'Good';
            fields.sinkPresent = true;
            fields.sinkCondition = 'Good';
            fields.plumbingComments = '';
            fields.plumbingPhotos = [];
            fields.plumbingWO = false;
            fields.plumbingWONumber = '';
            break;
            
        case 'laundryRoom':
            fields.washerHookup = true;
            fields.dryerHookup = true;
            fields.dryerVentExterior = true;
            fields.laundryComments = '';
            fields.laundryPhotos = [];
            fields.laundryWO = false;
            fields.laundryWONumber = '';
            break;
            
        case 'stairway':
            fields.railPresent = false;
            fields.guardPresent = false;
            fields.balusterSpacing = 'OK';
            fields.stairComments = '';
            fields.stairPhotos = [];
            fields.stairWO = false;
            fields.stairWONumber = '';
            break;
            
        case 'deck':
        case 'yard':
            fields.cleanliness = 'Good';
            fields.tripHazards = false;
            fields.railGuardPresent = false;
            fields.outdoorComments = '';
            fields.outdoorPhotos = [];
            fields.outdoorWO = false;
            fields.outdoorWONumber = '';
            break;
    }
    
    return fields;
}

function createAppliance(type) {
    const appliance = {
        id: generateId(),
        type,
        brand: '',
        model: '',
        serial: '',
        installDate: 'Unknown',
        customInstallDate: '',
        condition: 'Good',
        action: 'None',
        comments: '',
        photos: [],
        workOrder: false,
        woNumber: ''
    };
    
    // Add appliance-specific fields
    switch(type) {
        case 'Refrigerator':
            appliance.tempOK = 'Yes';
            appliance.noisy = false;
            appliance.brokenShelves = 0;
            appliance.brokenSeals = 0;
            appliance.brokenDrawers = 0;
            break;
            
        case 'Stove/Range':
            appliance.burnersWork = true;
            appliance.ovenWorks = true;
            appliance.knobsWork = true;
            appliance.ovenTemp = 'Accurate';
            break;
            
        case 'Range Hood':
            appliance.lightWorks = true;
            appliance.fanWorks = true;
            appliance.filterCondition = 'Good';
            break;
    }
    
    return appliance;
}

function initializeRooms() {
    const rooms = [];
    const { bedrooms, bathrooms, hasLaundryRoom, hasLivingRoom, hasDiningRoom, 
            hasKitchen, hasOutsideDeck, hasYard, hallways, stairways } = AppState.inspection;
    
    // Bedrooms
    for (let i = 1; i <= bedrooms; i++) {
        rooms.push(createRoom('bedroom', `Bedroom ${i}`));
    }
    
    // Bathrooms
    for (let i = 1; i <= bathrooms; i++) {
        rooms.push(createRoom('bathroom', `Bathroom ${i}`));
    }
    
    // Other rooms
    if (hasKitchen) rooms.push(createRoom('kitchen', 'Kitchen'));
    if (hasLivingRoom) rooms.push(createRoom('livingRoom', 'Living Room'));
    if (hasDiningRoom) rooms.push(createRoom('diningRoom', 'Dining Room'));
    if (hasLaundryRoom) rooms.push(createRoom('laundryRoom', 'Laundry Room'));
    
    // Hallways
    for (let i = 1; i <= hallways; i++) {
        rooms.push(createRoom('hallway', `Hallway ${i}`));
    }
    
    // Stairways
    for (let i = 1; i <= stairways; i++) {
        rooms.push(createRoom('stairway', `Stairway ${i}`));
    }
    
    // Outdoor areas
    if (hasOutsideDeck) rooms.push(createRoom('deck', 'Outside Deck'));
    if (hasYard) rooms.push(createRoom('yard', 'Yard'));
    
    AppState.inspection.rooms = rooms;
    AppState.currentRoomIndex = 0;
}

// ==================== PDF GENERATION ====================
function generatePrintView() {
    const inspection = AppState.inspection;
    const filename = generateFilename();
    
    let html = `
        <div class="report-header">
            <div class="report-logo-placeholder" style="width: 120pt; height: 60pt; border: 1pt solid #ccc; display: flex; align-items: center; justify-content: center; margin-bottom: 10pt;">
                <span style="color: #999;">Logo Area</span>
            </div>
            <h1 class="report-title">NSPIRE-Compliant Unit Inspection Report</h1>
            <p class="report-subtitle">${filename}</p>
        </div>
        
        <div class="report-section">
            <h2 class="section-title">Property & Tenant Information</h2>
            <table class="report-table">
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Notice Served Date</td>
                    <td>${inspection.noticeServedDate || 'N/A'}</td>
                </tr>
                <tr>
                    <td>Property Name</td>
                    <td>${inspection.propertyName === 'Other (Custom)' ? inspection.propertyNameCustom : inspection.propertyName}</td>
                </tr>
                <tr>
                    <td>Property Number</td>
                    <td>${inspection.propertyNumber === 'Other (Custom)' ? inspection.propertyNumberCustom : inspection.propertyNumber}</td>
                </tr>
                <tr>
                    <td>Building</td>
                    <td>${inspection.building === 'Other (Custom)' ? inspection.buildingCustom : inspection.building}</td>
                </tr>
                <tr>
                    <td>Unit Number</td>
                    <td>${inspection.unitNumber}</td>
                </tr>
                <tr>
                    <td>Unit Type</td>
                    <td>${inspection.unitType}</td>
                </tr>
                <tr>
                    <td>Tenant Name</td>
                    <td>${inspection.tenantFirstName} ${inspection.tenantLastName}</td>
                </tr>
                <tr>
                    <td>Inspector</td>
                    <td>${inspection.inspector === 'Other (Custom)' ? inspection.inspectorCustom : inspection.inspector}</td>
                </tr>
                <tr>
                    <td>Inspection Date</td>
                    <td>${inspection.todaysDate}</td>
                </tr>
                <tr>
                    <td>Programs</td>
                    <td>${inspection.programType.join(', ') || 'N/A'}</td>
                </tr>
            </table>
        </div>
    `;
    
    // Room inspections
    inspection.rooms.forEach(room => {
        html += generateRoomReport(room);
    });
    
    // Water heater
    if (inspection.waterHeater.present) {
        html += generateWaterHeaterReport(inspection.waterHeater);
    }
    
    // General/Safety
    html += generateGeneralSafetyReport(inspection.generalSafety);
    
    // Photos section
    html += generatePhotosSection(inspection);
    
    // Compliance statement
    html += `
        <div class="report-section">
            <h2 class="section-title">Compliance Statement</h2>
            <p>I certify that this inspection was conducted in accordance with HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE) and all applicable federal regulations.</p>
            <p style="margin-top: 12pt;"><strong>Inspector:</strong> ${inspection.inspector === 'Other (Custom)' ? inspection.inspectorCustom : inspection.inspector}</p>
            <p><strong>Date:</strong> ${inspection.todaysDate}</p>
        </div>
    `;
    
    return html;
}

function generateRoomReport(room) {
    let html = `
        <div class="report-section">
            <h2 class="section-title">${room.name}</h2>
            <table class="report-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Status/Condition</th>
                        <th>Comments</th>
                        <th>W/O</th>
                        <th>WO#</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Add room-specific rows
    html += `
        <tr>
            <td>Housekeeping</td>
            <td>${room.housekeeping}</td>
            <td>${room.housekeepingComments || '-'}</td>
            <td>${room.housekeepingWO ? 'Yes' : 'No'}</td>
            <td>${room.housekeepingWONumber || '-'}</td>
        </tr>
    `;
    
    if (room.type !== 'deck' && room.type !== 'yard') {
        html += `
            <tr>
                <td>Flooring (${room.flooringType})</td>
                <td>${room.flooringCondition}</td>
                <td>${room.flooringComments || '-'}</td>
                <td>${room.flooringWO ? 'Yes' : 'No'}</td>
                <td>${room.flooringWONumber || '-'}</td>
            </tr>
        `;
    }
    
    // Add more room details...
    
    html += `
                </tbody>
            </table>
        </div>
    `;
    
    return html;
}

function generateWaterHeaterReport(wh) {
    return `
        <div class="report-section">
            <h2 class="section-title">Water Heater</h2>
            <table class="report-table">
                <tr><th>Item</th><th>Status</th></tr>
                <tr><td>Location</td><td>${wh.room}</td></tr>
                <tr><td>Brand/Model</td><td>${wh.brand} ${wh.model}</td></tr>
                <tr><td>Temperature ≤ 120°F</td><td>${wh.tempLTE120 ? 'Yes' : 'No'}</td></tr>
                <tr><td>TPR Valve</td><td>${wh.hasTPRValve ? 'Yes' : 'No'}</td></tr>
                <tr><td>Condition</td><td>${wh.condition}</td></tr>
            </table>
        </div>
    `;
}

function generateGeneralSafetyReport(gs) {
    return `
        <div class="report-section">
            <h2 class="section-title">General & Safety</h2>
            <table class="report-table">
                <tr><th>Item</th><th>Status</th></tr>
                <tr><td>Utilities On</td><td>${gs.utilitiesOn ? 'Yes' : 'No'}</td></tr>
                <tr><td>Unit Clean</td><td>${gs.unitClean ? 'Yes' : 'No'}</td></tr>
                <tr><td>Dryer Vent Outside</td><td>${gs.dryerVentOutside ? 'Yes' : 'No'}</td></tr>
                <tr><td>Exterior Issues</td><td>${gs.exteriorIssues ? 'Yes' : 'No'}</td></tr>
                <tr><td>Pets Present</td><td>${gs.petsPresent ? 'Yes' : 'No'}</td></tr>
                <tr><td>Pests Present</td><td>${gs.pestsPresent ? 'Yes' : 'No'}</td></tr>
            </table>
        </div>
    `;
}

function generatePhotosSection(inspection) {
    let html = '<div class="report-section"><h2 class="section-title">Photo Documentation</h2>';
    let hasPhotos = false;
    
    // Collect all photos from all rooms
    inspection.rooms.forEach(room => {
        const allPhotos = [
            ...room.housekeepingPhotos,
            ...room.alarmPhotos,
            ...room.flooringPhotos,
            ...room.wallsPhotos,
            ...room.doorPhotos,
            ...room.windowsPhotos,
            ...room.electricalPhotos,
            ...room.hvacPhotos
        ];
        
        if (allPhotos.length > 0) {
            hasPhotos = true;
            html += `<h3 style="font-size: 11pt; margin-top: 12pt;">${room.name}</h3>`;
            html += '<div class="report-photos">';
            allPhotos.forEach(photo => {
                html += `
                    <div class="report-photo">
                        <img src="${photo.data}" alt="Inspection photo">
                        <div class="report-photo-caption">${photo.comment || 'No comment'}</div>
                    </div>
                `;
            });
            html += '</div>';
        }
    });
    
    if (!hasPhotos) {
        html += '<p>No photos attached to this inspection.</p>';
    }
    
    html += '</div>';
    return html;
}

function printToPDF() {
    const printView = document.getElementById('print-view');
    printView.innerHTML = generatePrintView();
    
    // Trigger print
    window.print();
}

function emailReport() {
    const filename = generateFilename();
    const subject = encodeURIComponent(filename);
    const body = encodeURIComponent(`Please find attached the inspection report: ${filename}.pdf`);
    
    // Note: Actual PDF attachment requires backend or use of libraries like jsPDF
    // This opens the email client with pre-filled subject/body
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    
    alert('Note: Please use "Print to PDF" to generate the PDF file, then manually attach it to your email.');
}

// ==================== RENDERING FUNCTIONS ====================
// (Continued in next part due to size...)

function render() {
    const app = document.getElementById('app');
    app.innerHTML = renderApp();
    attachEventListeners();
}

function renderApp() {
    return `
        ${renderHeader()}
        ${renderProgress()}
        ${renderCurrentStep()}
        ${renderNavigation()}
    `;
}

function renderHeader() {
    return `
        <div class="app-header">
            <h1>NSPIRE-Compliant Rental Unit Inspection</h1>
            <p>HUD | HOME | LIHTC | USDA Rural Development | Federal Compliance</p>
        </div>
    `;
}

function renderProgress() {
    const totalSteps = 7;
    const { currentStep } = AppState;
    
    return `
        <div class="progress-container">
            <div class="progress-header">
                <span class="progress-title">Inspection Progress</span>
                <span class="progress-step">Step ${currentStep} of ${totalSteps}</span>
            </div>
            <div class="progress-bar">
                ${Array.from({length: totalSteps}, (_, i) => `
                    <div class="progress-segment ${i + 1 < currentStep ? 'complete' : i + 1 === currentStep ? 'active' : ''}" 
                         onclick="goToStep(${i + 1})"></div>
                `).join('')}
            </div>
            <div class="progress-labels">
                <span>Start</span>
                <span>Layout</span>
                <span>Features</span>
                <span>Rooms</span>
                <span>Water Heater</span>
                <span>Safety</span>
                <span>Report</span>
            </div>
        </div>
    `;
}

function renderCurrentStep() {
    switch(AppState.currentStep) {
        case 1: return renderStep1();
        case 2: return renderStep2();
        case 3: return renderStep3();
        case 4: return renderStep4();
        case 5: return renderStep5();
        case 6: return renderStep6();
        case 7: return renderStep7();
        default: return '';
    }
}

function renderStep1() {
    const i = AppState.inspection;
    
    return `
        <div class="card">
            <h2 class="card-header">Start Unit Inspection</h2>
            <p style="color: #6b7280; margin-bottom: 24px;">Complete this wizard to produce a printable report & email it.</p>
            
            <div class="alert alert-info">
                <div>
                    <strong>Federal Program Compliance</strong>
                    <p style="margin-top: 4px; font-size: 14px;">Select all applicable programs for this property</p>
                    <div style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 16px;">
                        ${PROGRAM_TYPES.map(program => `
                            <label class="checkbox-group">
                                <input type="checkbox" value="${program}" 
                                       ${i.programType.includes(program) ? 'checked' : ''}
                                       onchange="updateProgramTypes(this)">
                                <span>${program}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label required">Notice Served Date</label>
                    <input type="date" value="${i.noticeServedDate}" 
                           onchange="updateField('noticeServedDate', this.value)">
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Property Name</label>
                    <select onchange="updateField('propertyName', this.value)">
                        <option value="">Select...</option>
                        ${PROPERTY_NAMES.map(name => `
                            <option value="${name}" ${i.propertyName === name ? 'selected' : ''}>${name}</option>
                        `).join('')}
                    </select>
                    ${i.propertyName === 'Other (Custom)' ? `
                        <input type="text" placeholder="Enter property name" 
                               value="${i.propertyNameCustom}"
                               onchange="updateField('propertyNameCustom', this.value)"
                               style="margin-top: 8px;">
                    ` : ''}
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Property Number</label>
                    <select onchange="updateField('propertyNumber', this.value)">
                        <option value="">Select...</option>
                        ${PROPERTY_NUMBERS.map(num => `
                            <option value="${num}" ${i.propertyNumber === num ? 'selected' : ''}>${num}</option>
                        `).join('')}
                    </select>
                    ${i.propertyNumber === 'Other (Custom)' ? `
                        <input type="text" placeholder="Enter property number" 
                               value="${i.propertyNumberCustom}"
                               onchange="updateField('propertyNumberCustom', this.value)"
                               style="margin-top: 8px;">
                    ` : ''}
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Today's Date</label>
                    <input type="date" value="${i.todaysDate}" 
                           onchange="updateField('todaysDate', this.value)">
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Inspector</label>
                    <select onchange="updateField('inspector', this.value)">
                        <option value="">Select...</option>
                        ${INSPECTORS.map(insp => `
                            <option value="${insp}" ${i.inspector === insp ? 'selected' : ''}>${insp}</option>
                        `).join('')}
                    </select>
                    ${i.inspector === 'Other (Custom)' ? `
                        <input type="text" placeholder="Enter inspector name" 
                               value="${i.inspectorCustom}"
                               onchange="updateField('inspectorCustom', this.value)"
                               style="margin-top: 8px;">
                    ` : ''}
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Building</label>
                    <select onchange="updateField('building', this.value)">
                        <option value="">Select...</option>
                        ${BUILDINGS.map(bld => `
                            <option value="${bld}" ${i.building === bld ? 'selected' : ''}>${bld}</option>
                        `).join('')}
                    </select>
                    ${i.building === 'Other (Custom)' ? `
                        <input type="text" placeholder="Enter building" 
                               value="${i.buildingCustom}"
                               onchange="updateField('buildingCustom', this.value)"
                               style="margin-top: 8px;">
                    ` : ''}
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Unit Number</label>
                    <input type="text" value="${i.unitNumber}" 
                           onchange="updateField('unitNumber', this.value)"
                           placeholder="e.g., 001, A-1">
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Unit Type</label>
                    <select onchange="updateField('unitType', this.value)">
                        <option value="">Select...</option>
                        ${UNIT_TYPES.map(type => `
                            <option value="${type}" ${i.unitType === type ? 'selected' : ''}>${type}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label required">Tenant First Name</label>
                    <input type="text" value="${i.tenantFirstName}" 
                           onchange="updateField('tenantFirstName', this.value)">
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Tenant Last Name</label>
                    <input type="text" value="${i.tenantLastName}" 
                           onchange="updateField('tenantLastName', this.value)">
                </div>
            </div>
            
            <div class="alert alert-warning">
                <div>
                    <strong>NSPIRE Inspection Standards</strong>
                    <p style="margin-top: 4px; font-size: 14px;">
                        This inspection follows HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE).
                        All federal compliance requirements will be checked.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderStep2() {
    const i = AppState.inspection;
    
    return `
        <div class="card">
            <h2 class="card-header">Unit Layout Configuration</h2>
            
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label required">Number of Bedrooms</label>
                    <input type="number" min="0" max="10" value="${i.bedrooms}" 
                           onchange="updateField('bedrooms', parseInt(this.value))">
                    <small style="color: #6b7280; font-size: 12px;">NSPIRE requires smoke alarms in each bedroom</small>
                </div>
                
                <div class="form-group">
                    <label class="form-label required">Number of Bathrooms</label>
                    <input type="number" min="1" max="10" value="${i.bathrooms}" 
                           onchange="updateField('bathrooms', parseInt(this.value))">
                    <small style="color: #6b7280; font-size: 12px;">NSPIRE requires GFI protection in bathrooms</small>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Number of Hallways</label>
                    <input type="number" min="0" max="5" value="${i.hallways}" 
                           onchange="updateField('hallways', parseInt(this.value))">
                    <small style="color: #6b7280; font-size: 12px;">Smoke alarms required in hallways serving bedrooms</small>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Number of Stairways</label>
                    <input type="number" min="0" max="5" value="${i.stairways}" 
                           onchange="updateField('stairways', parseInt(this.value))">
                    <small style="color: #6b7280; font-size: 12px;">Railings required for 3+ rises</small>
                </div>
            </div>
            
            <div style="margin-top: 24px;">
                <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Additional Rooms</h3>
                <div class="form-grid">
                    ${[
                        {key: 'hasLaundryRoom', label: 'Laundry Room', note: 'In-unit laundry'},
                        {key: 'hasLivingRoom', label: 'Living Room'},
                        {key: 'hasDiningRoom', label: 'Dining Room'},
                        {key: 'hasKitchen', label: 'Kitchen', note: 'GFI required'},
                        {key: 'hasOutsideDeck', label: 'Outside Deck'},
                        {key: 'hasYard', label: 'Yard'}
                    ].map(room => `
                        <label class="checkbox-group">
                            <input type="checkbox" ${i[room.key] ? 'checked' : ''} 
                                   onchange="updateField('${room.key}', this.checked)">
                            <div>
                                <span style="font-weight: 500;">${room.label}</span>
                                ${room.note ? `<div style="font-size: 12px; color: #6b7280;">${room.note}</div>` : ''}
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div class="alert alert-info" style="margin-top: 24px;">
                <div>
                    <strong>Configuration Summary</strong>
                    <p style="margin-top: 4px;">Total rooms to inspect: ${
                        i.bedrooms + i.bathrooms + (i.hasKitchen ? 1 : 0) + (i.hasLivingRoom ? 1 : 0) +
                        (i.hasDiningRoom ? 1 : 0) + (i.hasLaundryRoom ? 1 : 0) + i.hallways + i.stairways +
                        (i.hasOutsideDeck ? 1 : 0) + (i.hasYard ? 1 : 0)
                    }</p>
                </div>
            </div>
        </div>
    `;
}

function renderStep3() {
    const i = AppState.inspection;
    
    return `
        <div class="card">
            <h2 class="card-header">Global Features & Systems</h2>
            
            <div class="alert alert-danger">
                <div>
                    <strong>NSPIRE Required: Heating System</strong>
                    <p style="margin-top: 4px; font-size: 14px;">All units must have adequate heating</p>
                </div>
            </div>
            
            <div class="form-grid" style="margin-top: 20px;">
                <div class="form-group">
                    <label class="form-label required">Heating Type</label>
                    <select onchange="updateField('heatingType', this.value)">
                        <option value="">Select...</option>
                        <option value="Central Furnace" ${i.heatingType === 'Central Furnace' ? 'selected' : ''}>Central Furnace</option>
                        <option value="Baseboard" ${i.heatingType === 'Baseboard' ? 'selected' : ''}>Baseboard Heaters</option>
                        <option value="Radiator" ${i.heatingType === 'Radiator' ? 'selected' : ''}>Radiator Heaters</option>
                        <option value="Mini Split" ${i.heatingType === 'Mini Split' ? 'selected' : ''}>Mini Split Heat Pump</option>
                        <option value="Other" ${i.heatingType === 'Other' ? 'selected' : ''}>Other</option>
                    </select>
                </div>
                
                ${i.heatingType === 'Central Furnace' ? `
                    <div class="form-group">
                        <label class="form-label required">Fuel Type</label>
                        <select onchange="updateField('heatingFuel', this.value)">
                            <option value="">Select...</option>
                            <option value="Electric" ${i.heatingFuel === 'Electric' ? 'selected' : ''}>Electric</option>
                            <option value="Natural Gas" ${i.heatingFuel === 'Natural Gas' ? 'selected' : ''}>Natural Gas</option>
                            <option value="Propane" ${i.heatingFuel === 'Propane' ? 'selected' : ''}>Propane</option>
                            <option value="Oil" ${i.heatingFuel === 'Oil' ? 'selected' : ''}>Oil</option>
                        </select>
                        <small style="color: #ef4444; font-size: 12px;">CO2 alarm required for fuel-burning furnaces</small>
                    </div>
                ` : ''}
                
                <div class="form-group">
                    <label class="form-label">Cooling Type</label>
                    <select onchange="updateField('coolingType', this.value)">
                        <option value="">Select...</option>
                        <option value="Central Air" ${i.coolingType === 'Central Air' ? 'selected' : ''}>Central Air Conditioning</option>
                        <option value="Through-Wall" ${i.coolingType === 'Through-Wall' ? 'selected' : ''}>Through-Wall Units</option>
                        <option value="Mini-split" ${i.coolingType === 'Mini-split' ? 'selected' : ''}>Mini-split System</option>
                        <option value="None" ${i.coolingType === 'None' ? 'selected' : ''}>No Air Conditioning</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

function renderStep4() {
    if (AppState.inspection.rooms.length === 0) {
        return `
            <div class="card">
                <h2 class="card-header">Room-by-Room Inspection</h2>
                <div style="text-align: center; padding: 40px 20px;">
                    <p style="color: #6b7280; margin-bottom: 20px;">Rooms not initialized yet.</p>
                    <button class="btn btn-primary" onclick="initializeRooms(); render();">Initialize Rooms</button>
                </div>
            </div>
        `;
    }
    
    const room = AppState.inspection.rooms[AppState.currentRoomIndex];
    if (!room) return '';
    
    return `
        <div class="card">
            <div class="room-header">
                <h3>${room.name}</h3>
                <p>Room ${AppState.currentRoomIndex + 1} of ${AppState.inspection.rooms.length}</p>
            </div>
            
            ${renderRoomFields(room)}
            
            <div class="btn-group" style="margin-top: 24px;">
                <button class="btn btn-secondary" 
                        onclick="previousRoom()" 
                        ${AppState.currentRoomIndex === 0 ? 'disabled' : ''}>
                    ← Previous Room
                </button>
                
                ${AppState.currentRoomIndex < AppState.inspection.rooms.length - 1 ? `
                    <button class="btn btn-primary" onclick="nextRoom()">
                        Next Room →
                    </button>
                ` : `
                    <button class="btn btn-success" onclick="nextStep()">
                        Complete Rooms →
                    </button>
                `}
            </div>
        </div>
    `;
}

function renderRoomFields(room) {
    let html = '';
    
    // Universal: Housekeeping
    html += `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Housekeeping (NSPIRE Required)</h4>
            <div class="form-group">
                <label class="form-label">Housekeeping Acceptable?</label>
                <select onchange="updateRoomField('${room.id}', 'housekeeping', this.value)">
                    <option value="Yes" ${room.housekeeping === 'Yes' ? 'selected' : ''}>Yes</option>
                    <option value="No" ${room.housekeeping === 'No' ? 'selected' : ''}>No</option>
                    <option value="N/A" ${room.housekeeping === 'N/A' ? 'selected' : ''}>N/A</option>
                </select>
            </div>
            ${room.housekeeping === 'No' ? renderWorkOrderSection(room, 'housekeeping') : ''}
        </div>
    `;
    
    // Universal: Closets
    html += `
        <div style="margin-bottom: 24px;">
            <label class="checkbox-group">
                <input type="checkbox" ${room.closetsPresent ? 'checked' : ''} 
                       onchange="updateRoomField('${room.id}', 'closetsPresent', this.checked)">
                <span style="font-weight: 500;">Closet(s) Present</span>
            </label>
            ${room.closetsPresent ? `
                <div style="margin-top: 12px; margin-left: 28px;">
                    <label class="form-label">Number of Closets</label>
                    <input type="number" min="1" value="${room.closetCount}" 
                           onchange="updateRoomField('${room.id}', 'closetCount', parseInt(this.value))">
                </div>
            ` : ''}
        </div>
    `;
    
    // Alarms (for bedrooms, hallways)
    if (['bedroom', 'hallway'].includes(room.type)) {
        html += renderAlarmsSection(room);
    }
    
    // Flooring (not for deck/yard)
    if (!['deck', 'yard'].includes(room.type)) {
        html += renderFlooringSection(room);
    }
    
    // Electrical
    html += renderElectricalSection(room);
    
    // Room-specific sections
    if (room.type === 'bathroom') {
        html += renderBathroomSection(room);
    } else if (room.type === 'kitchen') {
        html += renderKitchenSection(room);
    } else if (room.type === 'laundryRoom') {
        html += renderLaundrySection(room);
    }
    
    // Appliances (for kitchen, laundry)
    if (['kitchen', 'laundryRoom'].includes(room.type)) {
        html += renderAppliancesSection(room);
    }
    
    return html;
}

function renderAlarmsSection(room) {
    return `
        <div class="alert alert-danger" style="margin-bottom: 24px;">
            <div>
                <strong>Safety Devices (NSPIRE REQUIRED)</strong>
                <div style="margin-top: 12px;">
                    <label class="checkbox-group">
                        <input type="checkbox" ${room.hasSmokeAlarm ? 'checked' : ''} 
                               onchange="updateRoomField('${room.id}', 'hasSmokeAlarm', this.checked)">
                        <span>Smoke Alarm Present (REQUIRED)</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${room.hasComboAlarm ? 'checked' : ''} 
                               onchange="updateRoomField('${room.id}', 'hasComboAlarm', this.checked)">
                        <span>Combination Smoke/CO Alarm</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${room.hasCO2Alarm ? 'checked' : ''} 
                               onchange="updateRoomField('${room.id}', 'hasCO2Alarm', this.checked)">
                        <span>CO2 Alarm (Required with fuel-burning appliances)</span>
                    </label>
                </div>
                ${(room.hasSmokeAlarm || room.hasComboAlarm || room.hasCO2Alarm) ? `
                    <div style="margin-top: 12px;">
                        <label class="form-label">Alarm Status</label>
                        <select onchange="updateRoomField('${room.id}', 'alarmStatus', this.value)">
                            <option value="Working" ${room.alarmStatus === 'Working' ? 'selected' : ''}>Working</option>
                            <option value="Needs Battery" ${room.alarmStatus === 'Needs Battery' ? 'selected' : ''}>Needs Battery</option>
                            <option value="Replace" ${room.alarmStatus === 'Replace' ? 'selected' : ''}>Needs Replacement</option>
                            <option value="N/A" ${room.alarmStatus === 'N/A' ? 'selected' : ''}>N/A</option>
                        </select>
                    </div>
                    ${room.alarmStatus !== 'Working' && room.alarmStatus !== 'N/A' ? renderWorkOrderSection(room, 'alarm') : ''}
                ` : ''}
            </div>
        </div>
    `;
}

function renderFlooringSection(room) {
    return `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Flooring (NSPIRE Required)</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Flooring Type</label>
                    <select onchange="updateRoomField('${room.id}', 'flooringType', this.value)">
                        <option value="">Select...</option>
                        ${FLOORING_TYPES.map(type => `
                            <option value="${type}" ${room.flooringType === type ? 'selected' : ''}>${type}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Install Date</label>
                    <select onchange="updateRoomField('${room.id}', 'flooringInstallDate', this.value)">
                        ${INSTALL_DATES.map(date => `
                            <option value="${date}" ${room.flooringInstallDate === date ? 'selected' : ''}>${date}</option>
                        `).join('')}
                    </select>
                </div>
                ${room.flooringInstallDate === 'Custom' ? `
                    <div class="form-group">
                        <label class="form-label">Custom Date</label>
                        <input type="month" value="${room.flooringCustomDate}" 
                               onchange="updateRoomField('${room.id}', 'flooringCustomDate', this.value)">
                    </div>
                ` : ''}
                <div class="form-group">
                    <label class="form-label">Condition</label>
                    <select onchange="updateRoomField('${room.id}', 'flooringCondition', this.value)">
                        ${CONDITIONS.map(cond => `
                            <option value="${cond}" ${room.flooringCondition === cond ? 'selected' : ''}>${cond}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            ${['Fair', 'Poor'].includes(room.flooringCondition) ? renderWorkOrderSection(room, 'flooring') : ''}
        </div>
    `;
}

function renderElectricalSection(room) {
    return `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Electrical Outlets (NSPIRE Required)</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Number of Outlets</label>
                    <input type="number" min="0" value="${room.outletCount}" 
                           onchange="updateRoomField('${room.id}', 'outletCount', parseInt(this.value))">
                    <small style="font-size: 12px; color: #6b7280;">NSPIRE: No point >6 feet from outlet</small>
                </div>
            </div>
            <div style="margin-top: 12px;">
                <label class="checkbox-group">
                    <input type="checkbox" ${room.outletsLoose ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'outletsLoose', this.checked)">
                    <span>Any outlets loose?</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${!room.outletsFunctional ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'outletsFunctional', !this.checked)">
                    <span>Any outlets non-functional?</span>
                </label>
            </div>
            ${(['kitchen', 'bathroom'].includes(room.type)) ? `
                <div class="alert alert-danger" style="margin-top: 12px;">
                    <div>
                        <strong>GFI Protection (NSPIRE REQUIRED)</strong>
                        <div style="margin-top: 8px;">
                            <label class="checkbox-group">
                                <input type="checkbox" ${room.gfiRequired ? 'checked' : ''} 
                                       onchange="updateRoomField('${room.id}', 'gfiRequired', this.checked)">
                                <span>GFI Required</span>
                            </label>
                            ${room.gfiRequired ? `
                                <label class="checkbox-group">
                                    <input type="checkbox" ${room.gfiPresent ? 'checked' : ''} 
                                           onchange="updateRoomField('${room.id}', 'gfiPresent', this.checked)">
                                    <span>GFI Present</span>
                                </label>
                                ${room.gfiPresent ? `
                                    <label class="checkbox-group">
                                        <input type="checkbox" ${room.gfiWorks ? 'checked' : ''} 
                                               onchange="updateRoomField('${room.id}', 'gfiWorks', this.checked)">
                                        <span>GFI Works</span>
                                    </label>
                                ` : ''}
                            ` : ''}
                        </div>
                    </div>
                </div>
            ` : ''}
            ${(room.outletsLoose || !room.outletsFunctional || (room.gfiRequired && (!room.gfiPresent || !room.gfiWorks))) ? 
                renderWorkOrderSection(room, 'electrical') : ''}
        </div>
    `;
}

function renderBathroomSection(room) {
    return `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Bathroom Fixtures</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Sink Condition</label>
                    <select onchange="updateRoomField('${room.id}', 'sinkCondition', this.value)">
                        ${CONDITIONS.map(cond => `
                            <option value="${cond}" ${room.sinkCondition === cond ? 'selected' : ''}>${cond}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Faucet Condition</label>
                    <select onchange="updateRoomField('${room.id}', 'faucetCondition', this.value)">
                        ${CONDITIONS.map(cond => `
                            <option value="${cond}" ${room.faucetCondition === cond ? 'selected' : ''}>${cond}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
            <div style="margin-top: 12px;">
                <label class="checkbox-group">
                    <input type="checkbox" ${room.plumbingLeaks ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'plumbingLeaks', this.checked)">
                    <span>Plumbing leaks present</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${room.toiletSecure ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'toiletSecure', this.checked)">
                    <span>Toilet secure to floor</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${room.toiletFlushes ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'toiletFlushes', this.checked)">
                    <span>Toilet flushes properly</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${room.drainsWork ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'drainsWork', this.checked)">
                    <span>All drains work properly</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${room.ventingPresent ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'ventingPresent', this.checked)">
                    <span>Ventilation present (window or fan)</span>
                </label>
            </div>
            ${(room.plumbingLeaks || !room.toiletSecure || !room.toiletFlushes || !room.drainsWork || !room.ventingPresent) ? 
                renderWorkOrderSection(room, 'bathroom') : ''}
        </div>
    `;
}

function renderKitchenSection(room) {
    return `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Kitchen Features</h4>
            <div class="form-grid">
                <div class="form-group">
                    <label class="checkbox-group">
                        <input type="checkbox" ${room.cupboardsPresent ? 'checked' : ''} 
                               onchange="updateRoomField('${room.id}', 'cupboardsPresent', this.checked)">
                        <span>Cupboards Present</span>
                    </label>
                    ${room.cupboardsPresent ? `
                        <input type="number" min="0" value="${room.cupboardCount}" 
                               onchange="updateRoomField('${room.id}', 'cupboardCount', parseInt(this.value))"
                               placeholder="Count" style="margin-top: 8px;">
                        <select onchange="updateRoomField('${room.id}', 'cupboardCondition', this.value)"
                                style="margin-top: 8px;">
                            ${CONDITIONS.map(cond => `
                                <option value="${cond}" ${room.cupboardCondition === cond ? 'selected' : ''}>${cond}</option>
                            `).join('')}
                        </select>
                    ` : ''}
                </div>
                <div class="form-group">
                    <label class="checkbox-group">
                        <input type="checkbox" ${room.drawersPresent ? 'checked' : ''} 
                               onchange="updateRoomField('${room.id}', 'drawersPresent', this.checked)">
                        <span>Drawers Present</span>
                    </label>
                    ${room.drawersPresent ? `
                        <input type="number" min="0" value="${room.drawerCount}" 
                               onchange="updateRoomField('${room.id}', 'drawerCount', parseInt(this.value))"
                               placeholder="Count" style="margin-top: 8px;">
                        <select onchange="updateRoomField('${room.id}', 'drawerCondition', this.value)"
                                style="margin-top: 8px;">
                            ${CONDITIONS.map(cond => `
                                <option value="${cond}" ${room.drawerCondition === cond ? 'selected' : ''}>${cond}</option>
                            `).join('')}
                        </select>
                    ` : ''}
                </div>
            </div>
            <div class="form-group" style="margin-top: 12px;">
                <label class="form-label">Sink Condition</label>
                <select onchange="updateRoomField('${room.id}', 'sinkCondition', this.value)">
                    ${CONDITIONS.map(cond => `
                        <option value="${cond}" ${room.sinkCondition === cond ? 'selected' : ''}>${cond}</option>
                    `).join('')}
                </select>
            </div>
            ${['Fair', 'Poor'].includes(room.cupboardCondition) || ['Fair', 'Poor'].includes(room.drawerCondition) || 
              ['Fair', 'Poor'].includes(room.sinkCondition) ? renderWorkOrderSection(room, 'plumbing') : ''}
        </div>
    `;
}

function renderLaundrySection(room) {
    return `
        <div style="margin-bottom: 24px;">
            <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Laundry Features</h4>
            <div style="margin-top: 12px;">
                <label class="checkbox-group">
                    <input type="checkbox" ${room.washerHookup ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'washerHookup', this.checked)">
                    <span>Washer hookup present</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${room.dryerHookup ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'dryerHookup', this.checked)">
                    <span>Dryer hookup present</span>
                </label>
                <label class="checkbox-group">
                    <input type="checkbox" ${room.dryerVentExterior ? 'checked' : ''} 
                           onchange="updateRoomField('${room.id}', 'dryerVentExterior', this.checked)">
                    <span>Dryer vent to exterior (fire safety)</span>
                </label>
            </div>
            ${!room.dryerVentExterior ? renderWorkOrderSection(room, 'laundry') : ''}
        </div>
    `;
}

function renderAppliancesSection(room) {
    return `
        <div style="margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="font-size: 16px; font-weight: 600; margin: 0;">Appliances</h4>
                <button class="btn btn-success" onclick="addAppliance('${room.id}')">+ Add Appliance</button>
            </div>
            ${room.appliances.length === 0 ? `
                <p style="text-align: center; color: #6b7280; padding: 20px;">No appliances added yet</p>
            ` : `
                ${room.appliances.map((app, idx) => renderAppliance(room.id, app, idx)).join('')}
            `}
        </div>
    `;
}

function renderAppliance(roomId, appliance, index) {
    return `
        <div class="appliance-item">
            <div class="appliance-header">
                <h5 style="margin: 0; font-size: 14px; font-weight: 600;">Appliance ${index + 1}</h5>
                <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;" 
                        onclick="removeAppliance('${roomId}', '${appliance.id}')">Remove</button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Type</label>
                    <select onchange="updateApplianceField('${roomId}', '${appliance.id}', 'type', this.value)">
                        ${APPLIANCE_TYPES.map(type => `
                            <option value="${type}" ${appliance.type === type ? 'selected' : ''}>${type}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Brand</label>
                    <input type="text" value="${appliance.brand}" 
                           onchange="updateApplianceField('${roomId}', '${appliance.id}', 'brand', this.value)">
                </div>
                <div class="form-group">
                    <label class="form-label">Model #</label>
                    <input type="text" value="${appliance.model}" 
                           onchange="updateApplianceField('${roomId}', '${appliance.id}', 'model', this.value)">
                </div>
                <div class="form-group">
                    <label class="form-label">Serial #</label>
                    <input type="text" value="${appliance.serial}" 
                           onchange="updateApplianceField('${roomId}', '${appliance.id}', 'serial', this.value)">
                </div>
                <div class="form-group">
                    <label class="form-label">Install Date</label>
                    <select onchange="updateApplianceField('${roomId}', '${appliance.id}', 'installDate', this.value)">
                        ${INSTALL_DATES.map(date => `
                            <option value="${date}" ${appliance.installDate === date ? 'selected' : ''}>${date}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Condition</label>
                    <select onchange="updateApplianceField('${roomId}', '${appliance.id}', 'condition', this.value)">
                        <option value="Like New" ${appliance.condition === 'Like New' ? 'selected' : ''}>Like New</option>
                        <option value="Acceptable" ${appliance.condition === 'Acceptable' ? 'selected' : ''}>Acceptable</option>
                        <option value="Repair" ${appliance.condition === 'Repair' ? 'selected' : ''}>Needs Repair</option>
                        <option value="Replace" ${appliance.condition === 'Replace' ? 'selected' : ''}>Needs Replacement</option>
                        <option value="N/A" ${appliance.condition === 'N/A' ? 'selected' : ''}>N/A</option>
                    </select>
                </div>
            </div>
            ${appliance.type === 'Refrigerator' ? renderRefrigeratorDetails(roomId, appliance) : ''}
            ${appliance.type === 'Stove/Range' ? renderStoveDetails(roomId, appliance) : ''}
            ${appliance.type === 'Range Hood' ? renderRangeHoodDetails(roomId, appliance) : ''}
            ${!['Like New', 'Acceptable', 'N/A'].includes(appliance.condition) ? renderApplianceWorkOrder(roomId, appliance) : ''}
        </div>
    `;
}

function renderRefrigeratorDetails(roomId, app) {
    return `
        <div class="alert alert-info" style="margin-top: 12px;">
            <div>
                <strong>Refrigerator Details</strong>
                <div class="form-grid" style="margin-top: 12px;">
                    <div class="form-group">
                        <label class="form-label">Temperature</label>
                        <select onchange="updateApplianceField('${roomId}', '${app.id}', 'tempOK', this.value)">
                            <option value="Yes" ${app.tempOK === 'Yes' ? 'selected' : ''}>OK</option>
                            <option value="No" ${app.tempOK === 'No' ? 'selected' : ''}>Not Tested</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-group">
                            <input type="checkbox" ${app.noisy ? 'checked' : ''} 
                                   onchange="updateApplianceField('${roomId}', '${app.id}', 'noisy', this.checked)">
                            <span>Noisy</span>
                        </label>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Broken Shelves</label>
                        <input type="number" min="0" value="${app.brokenShelves}" 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'brokenShelves', parseInt(this.value))">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Broken Seals</label>
                        <input type="number" min="0" value="${app.brokenSeals}" 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'brokenSeals', parseInt(this.value))">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Broken Drawers</label>
                        <input type="number" min="0" value="${app.brokenDrawers}" 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'brokenDrawers', parseInt(this.value))">
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderStoveDetails(roomId, app) {
    return `
        <div class="alert alert-info" style="margin-top: 12px;">
            <div>
                <strong>Stove/Range Details</strong>
                <div style="margin-top: 12px;">
                    <label class="checkbox-group">
                        <input type="checkbox" ${app.burnersWork ? 'checked' : ''} 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'burnersWork', this.checked)">
                        <span>All burners work</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${app.ovenWorks ? 'checked' : ''} 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'ovenWorks', this.checked)">
                        <span>Oven works</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${app.knobsWork ? 'checked' : ''} 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'knobsWork', this.checked)">
                        <span>All knobs work</span>
                    </label>
                </div>
                <div class="form-group" style="margin-top: 12px;">
                    <label class="form-label">Oven Temperature</label>
                    <select onchange="updateApplianceField('${roomId}', '${app.id}', 'ovenTemp', this.value)">
                        <option value="Accurate" ${app.ovenTemp === 'Accurate' ? 'selected' : ''}>Accurate</option>
                        <option value="Off-Low" ${app.ovenTemp === 'Off-Low' ? 'selected' : ''}>Runs Low</option>
                        <option value="Off-High" ${app.ovenTemp === 'Off-High' ? 'selected' : ''}>Runs High</option>
                        <option value="Not Tested" ${app.ovenTemp === 'Not Tested' ? 'selected' : ''}>Not Tested</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

function renderRangeHoodDetails(roomId, app) {
    return `
        <div class="alert alert-info" style="margin-top: 12px;">
            <div>
                <strong>Range Hood Details</strong>
                <div style="margin-top: 12px;">
                    <label class="checkbox-group">
                        <input type="checkbox" ${app.lightWorks ? 'checked' : ''} 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'lightWorks', this.checked)">
                        <span>Light works</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${app.fanWorks ? 'checked' : ''} 
                               onchange="updateApplianceField('${roomId}', '${app.id}', 'fanWorks', this.checked)">
                        <span>Fan works</span>
                    </label>
                </div>
                <div class="form-group" style="margin-top: 12px;">
                    <label class="form-label">Filter Condition</label>
                    <select onchange="updateApplianceField('${roomId}', '${app.id}', 'filterCondition', this.value)">
                        ${CONDITIONS.map(cond => `
                            <option value="${cond}" ${app.filterCondition === cond ? 'selected' : ''}>${cond}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
        </div>
    `;
}

function renderApplianceWorkOrder(roomId, appliance) {
    return `
        <div class="work-order-section" style="margin-top: 12px;">
            <label class="checkbox-group">
                <input type="checkbox" ${appliance.workOrder ? 'checked' : ''} 
                       onchange="updateApplianceField('${roomId}', '${appliance.id}', 'workOrder', this.checked)">
                <strong>Create Work Order</strong>
            </label>
            ${appliance.workOrder ? `
                <div style="margin-top: 12px;">
                    <div class="form-group">
                        <label class="form-label">Action Needed</label>
                        <select onchange="updateApplianceField('${roomId}', '${appliance.id}', 'action', this.value)">
                            ${ACTIONS.map(action => `
                                <option value="${action}" ${appliance.action === action ? 'selected' : ''}>${action}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">WO# (10 characters)</label>
                        <input type="text" maxlength="10" value="${appliance.woNumber}" 
                               onchange="updateApplianceField('${roomId}', '${appliance.id}', 'woNumber', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Comments</label>
                        <textarea rows="3" onchange="updateApplianceField('${roomId}', '${appliance.id}', 'comments', this.value)">${appliance.comments}</textarea>
                    </div>
                    <div class="photo-upload">
                        <button class="btn btn-primary" onclick="document.getElementById('photo-${appliance.id}').click()">
                            Add Photos
                        </button>
                        <input type="file" id="photo-${appliance.id}" multiple accept="image/*" 
                               onchange="handleAppliancePhoto(event, '${roomId}', '${appliance.id}')" style="display: none;">
                        ${appliance.photos.length > 0 ? `
                            <div class="photo-grid">
                                ${appliance.photos.map(photo => `
                                    <div class="photo-item">
                                        <img src="${photo.data}" alt="Photo">
                                        <button class="photo-remove" onclick="removeAppliancePhoto('${roomId}', '${appliance.id}', '${photo.id}')">×</button>
                                        <input type="text" class="photo-comment" placeholder="Comment" 
                                               value="${photo.comment}"
                                               onchange="updateAppliancePhotoComment('${roomId}', '${appliance.id}', '${photo.id}', this.value)">
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderWorkOrderSection(room, fieldPrefix) {
    const woField = `${fieldPrefix}WO`;
    const woNumberField = `${fieldPrefix}WONumber`;
    const commentsField = `${fieldPrefix}Comments`;
    const photosField = `${fieldPrefix}Photos`;
    
    return `
        <div class="work-order-section" style="margin-top: 12px;">
            <label class="checkbox-group">
                <input type="checkbox" ${room[woField] ? 'checked' : ''} 
                       onchange="updateRoomField('${room.id}', '${woField}', this.checked)">
                <strong>Create Work Order</strong>
            </label>
            ${room[woField] ? `
                <div style="margin-top: 12px;">
                    <div class="form-group">
                        <label class="form-label">WO# (10 characters)</label>
                        <input type="text" maxlength="10" value="${room[woNumberField]}" 
                               onchange="updateRoomField('${room.id}', '${woNumberField}', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Comments</label>
                        <textarea rows="3" onchange="updateRoomField('${room.id}', '${commentsField}', this.value)">${room[commentsField]}</textarea>
                    </div>
                    <div class="photo-upload">
                        <button class="btn btn-primary" onclick="document.getElementById('photo-${room.id}-${fieldPrefix}').click()">
                            Add Photos
                        </button>
                        <input type="file" id="photo-${room.id}-${fieldPrefix}" multiple accept="image/*" 
                               onchange="handleRoomPhoto(event, '${room.id}', '${photosField}')" style="display: none;">
                        ${room[photosField] && room[photosField].length > 0 ? `
                            <div class="photo-grid">
                                ${room[photosField].map(photo => `
                                    <div class="photo-item">
                                        <img src="${photo.data}" alt="Photo">
                                        <button class="photo-remove" onclick="removeRoomPhoto('${room.id}', '${photosField}', '${photo.id}')">×</button>
                                        <input type="text" class="photo-comment" placeholder="Comment" 
                                               value="${photo.comment}"
                                               onchange="updateRoomPhotoComment('${room.id}', '${photosField}', '${photo.id}', this.value)">
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderStep5() {
    const wh = AppState.inspection.waterHeater;
    
    return `
        <div class="card">
            <h2 class="card-header">Water Heater</h2>
            
            <label class="checkbox-group" style="margin-bottom: 20px;">
                <input type="checkbox" ${wh.present ? 'checked' : ''} 
                       onchange="updateWaterHeaterField('present', this.checked)">
                <span style="font-weight: 600;">Unit has water heater</span>
            </label>
            
            ${wh.present ? `
                <div class="alert alert-danger">
                    <div>
                        <strong>NSPIRE Water Heater Requirements</strong>
                        <ul style="margin-top: 8px; margin-left: 20px; font-size: 14px;">
                            <li>TPR valve required and functional</li>
                            <li>Discharge line 2-6 inches from floor</li>
                            <li>Maximum 120°F at fixtures</li>
                            <li>Proper venting for gas/oil units</li>
                            <li>Sediment trap for gas units</li>
                        </ul>
                    </div>
                </div>
                
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label required">Room/Location</label>
                        <input type="text" value="${wh.room}" 
                               onchange="updateWaterHeaterField('room', this.value)"
                               placeholder="e.g., Closet, Basement">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Brand</label>
                        <input type="text" value="${wh.brand}" 
                               onchange="updateWaterHeaterField('brand', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Model #</label>
                        <input type="text" value="${wh.model}" 
                               onchange="updateWaterHeaterField('model', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Serial #</label>
                        <input type="text" value="${wh.serial}" 
                               onchange="updateWaterHeaterField('serial', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Install Date</label>
                        <select onchange="updateWaterHeaterField('installDate', this.value)">
                            ${INSTALL_DATES.map(date => `
                                <option value="${date}" ${wh.installDate === date ? 'selected' : ''}>${date}</option>
                            `).join('')}
                        </select>
                    </div>
                    ${wh.installDate === 'Custom' ? `
                        <div class="form-group">
                            <label class="form-label">Custom Date</label>
                            <input type="month" value="${wh.customInstallDate}" 
                                   onchange="updateWaterHeaterField('customInstallDate', this.value)">
                        </div>
                    ` : ''}
                </div>
                
                <div style="margin-top: 20px;">
                    <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Safety Checks</h4>
                    <div class="form-grid">
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.tempLTE120 ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('tempLTE120', this.checked)">
                            <span>Temperature ≤ 120°F (REQUIRED)</span>
                        </label>
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.hotWaterOK ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('hotWaterOK', this.checked)">
                            <span>Hot water OK at fixtures</span>
                        </label>
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.hasTPRValve ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('hasTPRValve', this.checked)">
                            <span>TPR valve present (REQUIRED)</span>
                        </label>
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.hasDischargeLine ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('hasDischargeLine', this.checked)">
                            <span>Discharge line 2-6" from floor</span>
                        </label>
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.hasSedimentTrap ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('hasSedimentTrap', this.checked)">
                            <span>Sediment trap (gas units)</span>
                        </label>
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.hasShutOff ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('hasShutOff', this.checked)">
                            <span>Shut-off valve present</span>
                        </label>
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.hasGasFlue ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('hasGasFlue', this.checked)">
                            <span>Gas flue ¼"/ft rise & sealed</span>
                        </label>
                    </div>
                </div>
                
                <div class="form-grid" style="margin-top: 20px;">
                    <div class="form-group">
                        <label class="form-label">Hot Water Duration</label>
                        <select onchange="updateWaterHeaterField('duration', this.value)">
                            <option value="Short" ${wh.duration === 'Short' ? 'selected' : ''}>Short</option>
                            <option value="Adequate" ${wh.duration === 'Adequate' ? 'selected' : ''}>Adequate</option>
                            <option value="Long" ${wh.duration === 'Long' ? 'selected' : ''}>Long</option>
                            <option value="Not Tested" ${wh.duration === 'Not Tested' ? 'selected' : ''}>Not Tested</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Overall Condition</label>
                        <select onchange="updateWaterHeaterField('condition', this.value)">
                            ${CONDITIONS.map(cond => `
                                <option value="${cond}" ${wh.condition === cond ? 'selected' : ''}>${cond}</option>
                            `).join('')}
                        </select>
                    </div>
                </div>
                
                ${!wh.tempLTE120 || !wh.hasTPRValve || ['Fair', 'Poor'].includes(wh.condition) ? `
                    <div class="work-order-section" style="margin-top: 20px;">
                        <label class="checkbox-group">
                            <input type="checkbox" ${wh.workOrder ? 'checked' : ''} 
                                   onchange="updateWaterHeaterField('workOrder', this.checked)">
                            <strong>Create Work Order</strong>
                        </label>
                        ${wh.workOrder ? `
                            <div style="margin-top: 12px;">
                                <div class="form-group">
                                    <label class="form-label">Action Needed</label>
                                    <select onchange="updateWaterHeaterField('action', this.value)">
                                        ${ACTIONS.map(action => `
                                            <option value="${action}" ${wh.action === action ? 'selected' : ''}>${action}</option>
                                        `).join('')}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">WO# (10 characters)</label>
                                    <input type="text" maxlength="10" value="${wh.woNumber}" 
                                           onchange="updateWaterHeaterField('woNumber', this.value)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Comments</label>
                                    <textarea rows="3" onchange="updateWaterHeaterField('comments', this.value)">${wh.comments}</textarea>
                                </div>
                                <div class="photo-upload">
                                    <button class="btn btn-primary" onclick="document.getElementById('photo-wh').click()">
                                        Add Photos
                                    </button>
                                    <input type="file" id="photo-wh" multiple accept="image/*" 
                                           onchange="handleWaterHeaterPhoto(event)" style="display: none;">
                                    ${wh.photos.length > 0 ? `
                                        <div class="photo-grid">
                                            ${wh.photos.map(photo => `
                                                <div class="photo-item">
                                                    <img src="${photo.data}" alt="Photo">
                                                    <button class="photo-remove" onclick="removeWaterHeaterPhoto('${photo.id}')">×</button>
                                                    <input type="text" class="photo-comment" placeholder="Comment" 
                                                           value="${photo.comment}"
                                                           onchange="updateWaterHeaterPhotoComment('${photo.id}', this.value)">
                                                </div>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
            ` : ''}
        </div>
    `;
}

function renderStep6() {
    const gs = AppState.inspection.generalSafety;
    
    return `
        <div class="card">
            <h2 class="card-header">General & Safety Checklist</h2>
            
            <div class="alert alert-info">
                <div>
                    <strong>NSPIRE Safety Requirements</strong>
                    <p style="margin-top: 4px; font-size: 14px;">
                        All items must be checked and functional for full NSPIRE compliance
                    </p>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Utilities & Systems</h4>
                <div class="form-grid">
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.utilitiesOn ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('utilitiesOn', this.checked)">
                        <span>All utilities on and functioning</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.unitClean ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('unitClean', this.checked)">
                        <span>Unit is clean and habitable</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.dryerVentOutside ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('dryerVentOutside', this.checked)">
                        <span>Dryer vent exhausts outside</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.amenitiesWork ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('amenitiesWork', this.checked)">
                        <span>All amenities working properly</span>
                    </label>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Doors, Locks & Windows</h4>
                <div class="form-grid">
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.doorsSecure ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('doorsSecure', this.checked)">
                        <span>All doors secure and operable</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.locksWork ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('locksWork', this.checked)">
                        <span>All locks functioning</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.windowsSecure ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('windowsSecure', this.checked)">
                        <span>All windows secure with locks</span>
                    </label>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Electrical & Safety</h4>
                <div class="form-grid">
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.electricalSafe ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('electricalSafe', this.checked)">
                        <span>Electrical system safe</span>
                    </label>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Issues Present</h4>
                <div class="form-grid">
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.exteriorIssues ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('exteriorIssues', this.checked)">
                        <span>Exterior issues noted</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.petsPresent ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('petsPresent', this.checked)">
                        <span>Pets present in unit</span>
                    </label>
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.pestsPresent ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('pestsPresent', this.checked)">
                        <span>Pests/infestation present</span>
                    </label>
                </div>
            </div>
            
            ${gs.exteriorIssues || gs.pestsPresent || !gs.utilitiesOn || !gs.electricalSafe ? `
                <div class="work-order-section" style="margin-top: 20px;">
                    <label class="checkbox-group">
                        <input type="checkbox" ${gs.workOrder ? 'checked' : ''} 
                               onchange="updateGeneralSafetyField('workOrder', this.checked)">
                        <strong>Create Work Order</strong>
                    </label>
                    ${gs.workOrder ? `
                        <div style="margin-top: 12px;">
                            <div class="form-group">
                                <label class="form-label">WO# (10 characters)</label>
                                <input type="text" maxlength="10" value="${gs.woNumber}" 
                                       onchange="updateGeneralSafetyField('woNumber', this.value)">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Comments</label>
                                <textarea rows="3" onchange="updateGeneralSafetyField('comments', this.value)">${gs.comments}</textarea>
                            </div>
                            <div class="photo-upload">
                                <button class="btn btn-primary" onclick="document.getElementById('photo-gs').click()">
                                    Add Photos
                                </button>
                                <input type="file" id="photo-gs" multiple accept="image/*" 
                                       onchange="handleGeneralSafetyPhoto(event)" style="display: none;">
                                ${gs.photos.length > 0 ? `
                                    <div class="photo-grid">
                                        ${gs.photos.map(photo => `
                                            <div class="photo-item">
                                                <img src="${photo.data}" alt="Photo">
                                                <button class="photo-remove" onclick="removeGeneralSafetyPhoto('${photo.id}')">×</button>
                                                <input type="text" class="photo-comment" placeholder="Comment" 
                                                       value="${photo.comment}"
                                                       onchange="updateGeneralSafetyPhotoComment('${photo.id}', this.value)">
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `;
}

function renderStep7() {
    const i = AppState.inspection;
    const filename = generateFilename();
    
    // Count work orders
    let workOrderCount = 0;
    i.rooms.forEach(room => {
        Object.keys(room).forEach(key => {
            if (key.endsWith('WO') && room[key]) workOrderCount++;
        });
        room.appliances.forEach(app => {
            if (app.workOrder) workOrderCount++;
        });
    });
    if (i.waterHeater.workOrder) workOrderCount++;
    if (i.generalSafety.workOrder) workOrderCount++;
    
    return `
        <div class="card">
            <h2 class="card-header">Generate Report</h2>
            
            <div class="alert alert-success">
                <div>
                    <strong>Inspection Complete!</strong>
                    <p style="margin-top: 4px;">Review the summary below and generate your report.</p>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Inspection Summary</h4>
                <div class="form-grid">
                    <div>
                        <strong>Property:</strong> ${i.propertyName === 'Other (Custom)' ? i.propertyNameCustom : i.propertyName}
                    </div>
                    <div>
                        <strong>Unit:</strong> ${i.unitNumber}
                    </div>
                    <div>
                        <strong>Tenant:</strong> ${i.tenantFirstName} ${i.tenantLastName}
                    </div>
                    <div>
                        <strong>Inspector:</strong> ${i.inspector === 'Other (Custom)' ? i.inspectorCustom : i.inspector}
                    </div>
                    <div>
                        <strong>Date:</strong> ${i.todaysDate}
                    </div>
                    <div>
                        <strong>Programs:</strong> ${i.programType.join(', ') || 'N/A'}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Rooms Inspected</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;">
                    ${i.rooms.map(room => `
                        <div style="background: #f9fafb; padding: 12px; border-radius: 6px; font-size: 14px;">
                            ✓ ${room.name}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Work Orders Required</h4>
                <div class="${workOrderCount > 0 ? 'alert-warning' : 'alert-success'} alert">
                    <div>
                        ${workOrderCount > 0 ? 
                            `<strong>${workOrderCount} work order(s) flagged</strong>` :
                            '<strong>No work orders required</strong>'
                        }
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="font-size: 16px; font-weight: 600; margin-bottom: 12px;">Report Filename</h4>
                <div style="background: #f9fafb; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 14px;">
                    ${filename}.pdf
                </div>
            </div>
            
            <div class="alert alert-success" style="margin-top: 20px;">
                <div>
                    <label class="checkbox-group">
                        <input type="checkbox" ${i.complianceStatement ? 'checked' : ''} 
                               onchange="updateField('complianceStatement', this.checked)">
                        <div>
                            <strong>NSPIRE Compliance Declaration</strong>
                            <p style="margin-top: 4px; font-size: 14px;">
                                I certify that this inspection was conducted in accordance with HUD's National Standards 
                                for the Physical Inspection of Real Estate (NSPIRE) and all applicable federal regulations 
                                for ${i.programType.join(', ') || 'selected programs'}.
                            </p>
                        </div>
                    </label>
                </div>
            </div>
            
            <div class="form-group" style="margin-top: 20px;">
                <label class="form-label">Additional Report Notes</label>
                <textarea rows="4" placeholder="Any additional notes or observations for the final report..." 
                          onchange="updateField('reportNotes', this.value)">${i.reportNotes}</textarea>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px;">
                <button class="btn btn-primary" onclick="printToPDF()" style="font-size: 16px; padding: 16px;">
                    🖨️ Print to PDF
                </button>
                <button class="btn btn-success" onclick="emailReport()" style="font-size: 16px; padding: 16px;">
                    📧 Email Report
                </button>
            </div>
            
            <div class="alert alert-info" style="margin-top: 20px; font-size: 12px;">
                <div>
                    <strong>Legal Disclaimer:</strong>
                    <p style="margin-top: 4px;">
                        This inspection report is generated as a tool to assist in compliance with federal housing regulations. 
                        Property owners and managers are solely responsible for ensuring full compliance with all applicable 
                        federal, state, and local regulations. This report does not constitute legal advice.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function renderNavigation() {
    const { currentStep } = AppState;
    const canProgress = validateCurrentStep();
    
    // Don't show navigation on room inspection or final report step
    if (currentStep === 4 || currentStep === 7) {
        return '';
    }
    
    return `
        <div class="btn-group">
            <button class="btn btn-secondary" 
                    onclick="previousStep()" 
                    ${currentStep === 1 ? 'disabled' : ''}>
                ← Previous
            </button>
            <button class="btn btn-primary" 
                    onclick="nextStep()" 
                    ${!canProgress ? 'disabled' : ''}>
                Next →
            </button>
        </div>
    `;
}

// ==================== VALIDATION ====================
function validateCurrentStep() {
    const i = AppState.inspection;
    
    switch(AppState.currentStep) {
        case 1:
            return i.noticeServedDate && 
                   (i.propertyName && (i.propertyName !== 'Other (Custom)' || i.propertyNameCustom)) &&
                   (i.propertyNumber && (i.propertyNumber !== 'Other (Custom)' || i.propertyNumberCustom)) &&
                   i.todaysDate &&
                   (i.inspector && (i.inspector !== 'Other (Custom)' || i.inspectorCustom)) &&
                   (i.building && (i.building !== 'Other (Custom)' || i.buildingCustom)) &&
                   i.unitNumber &&
                   i.unitType &&
                   i.tenantFirstName &&
                   i.tenantLastName &&
                   i.programType.length > 0;
        case 2:
            return i.bedrooms > 0 && i.bathrooms > 0;
        case 3:
            return i.heatingType && (i.heatingType !== 'Central Furnace' || i.heatingFuel);
        default:
            return true;
    }
}

// ==================== EVENT HANDLERS ====================
function attachEventListeners() {
    // Event listeners are attached via inline onclick handlers
    // This function is a placeholder for any additional setup
}

// ==================== NAVIGATION FUNCTIONS ====================
function goToStep(step) {
    if (step === 4 && AppState.inspection.rooms.length === 0) {
        initializeRooms();
    }
    AppState.currentStep = step;
    render();
}

function nextStep() {
    if (!validateCurrentStep()) {
        alert('Please complete all required fields before continuing.');
        return;
    }
    
    if (AppState.currentStep === 2) {
        initializeRooms();
    }
    
    if (AppState.currentStep < 7) {
        AppState.currentStep++;
        render();
    }
}

function previousStep() {
    if (AppState.currentStep > 1) {
        AppState.currentStep--;
        render();
    }
}

function nextRoom() {
    if (AppState.currentRoomIndex < AppState.inspection.rooms.length - 1) {
        AppState.currentRoomIndex++;
        render();
    }
}

function previousRoom() {
    if (AppState.currentRoomIndex > 0) {
        AppState.currentRoomIndex--;
        render();
    }
}

// ==================== UPDATE FUNCTIONS ====================
function updateField(field, value) {
    AppState.inspection[field] = value;
    render();
}

function updateProgramTypes(checkbox) {
    const value = checkbox.value;
    if (checkbox.checked) {
        if (!AppState.inspection.programType.includes(value)) {
            AppState.inspection.programType.push(value);
        }
    } else {
        AppState.inspection.programType = AppState.inspection.programType.filter(p => p !== value);
    }
    render();
}

function updateRoomField(roomId, field, value) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        room[field] = value;
        render();
    }
}

function updateApplianceField(roomId, applianceId, field, value) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        const appliance = room.appliances.find(a => a.id === applianceId);
        if (appliance) {
            appliance[field] = value;
            render();
        }
    }
}

function updateWaterHeaterField(field, value) {
    AppState.inspection.waterHeater[field] = value;
    render();
}

function updateGeneralSafetyField(field, value) {
    AppState.inspection.generalSafety[field] = value;
    render();
}

// ==================== APPLIANCE FUNCTIONS ====================
function addAppliance(roomId) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        const defaultType = room.type === 'kitchen' ? 'Refrigerator' : 'Washer';
        room.appliances.push(createAppliance(defaultType));
        render();
    }
}

function removeAppliance(roomId, applianceId) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        room.appliances = room.appliances.filter(a => a.id !== applianceId);
        render();
    }
}

// ==================== PHOTO FUNCTIONS ====================
function handleRoomPhoto(event, roomId, field) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        if (!room[field]) room[field] = [];
        handlePhotoUpload(event, room[field]);
    }
}

function removeRoomPhoto(roomId, field, photoId) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room && room[field]) {
        removePhoto(room[field], photoId);
    }
}

function updateRoomPhotoComment(roomId, field, photoId, comment) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room && room[field]) {
        const photo = room[field].find(p => p.id === photoId);
        if (photo) {
            photo.comment = comment;
        }
    }
}

function handleAppliancePhoto(event, roomId, applianceId) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        const appliance = room.appliances.find(a => a.id === applianceId);
        if (appliance) {
            handlePhotoUpload(event, appliance.photos);
        }
    }
}

function removeAppliancePhoto(roomId, applianceId, photoId) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        const appliance = room.appliances.find(a => a.id === applianceId);
        if (appliance) {
            removePhoto(appliance.photos, photoId);
        }
    }
}

function updateAppliancePhotoComment(roomId, applianceId, photoId, comment) {
    const room = AppState.inspection.rooms.find(r => r.id === roomId);
    if (room) {
        const appliance = room.appliances.find(a => a.id === applianceId);
        if (appliance) {
            const photo = appliance.photos.find(p => p.id === photoId);
            if (photo) {
                photo.comment = comment;
            }
        }
    }
}

function handleWaterHeaterPhoto(event) {
    handlePhotoUpload(event, AppState.inspection.waterHeater.photos);
}

function removeWaterHeaterPhoto(photoId) {
    removePhoto(AppState.inspection.waterHeater.photos, photoId);
}

function updateWaterHeaterPhotoComment(photoId, comment) {
    const photo = AppState.inspection.waterHeater.photos.find(p => p.id === photoId);
    if (photo) {
        photo.comment = comment;
    }
}

function handleGeneralSafetyPhoto(event) {
    handlePhotoUpload(event, AppState.inspection.generalSafety.photos);
}

function removeGeneralSafetyPhoto(photoId) {
    removePhoto(AppState.inspection.generalSafety.photos, photoId);
}

function updateGeneralSafetyPhotoComment(photoId, comment) {
    const photo = AppState.inspection.generalSafety.photos.find(p => p.id === photoId);
    if (photo) {
        photo.comment = comment;
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    render();
});
