import React, { useState, useRef } from 'react';
import { Camera, Upload, X, CheckCircle, AlertCircle, Download, Mail, ChevronLeft, ChevronRight, Plus, Trash2, Home, Clipboard, Settings, FileText, Eye } from 'lucide-react';

/**
 * NSPIRE-COMPLIANT RENTAL UNIT INSPECTION SYSTEM
 * 
 * COMPLIANCE STANDARDS:
 * - HUD NSPIRE Standards (National Standards for the Physical Inspection of Real Estate)
 * - HOME Investment Partnerships Program
 * - Low-Income Housing Tax Credit (LIHTC) Requirements
 * - USDA Rural Development Multifamily Housing
 * - 24 CFR Part 5 - Fair Housing and Equal Opportunity
 * - 24 CFR Part 8 - Accessibility (Section 504)
 * - 24 CFR Part 100 - Fair Housing
 * - State and Local Landlord-Tenant Laws
 * 
 * LEGAL NOTICE:
 * This inspection tool is designed to assist in compliance with federal regulations.
 * Property owners and managers are responsible for ensuring full compliance with
 * all applicable federal, state, and local regulations. This tool does not constitute
 * legal advice and should be used in conjunction with qualified legal counsel.
 */

const RentalInspectionApp = () => {
  // ==================== STATE MANAGEMENT ====================
  
  const [currentStep, setCurrentStep] = useState(1);
  const [inspectionData, setInspectionData] = useState({
    // Step 1: Property & Tenant Information
    propertyName: '',
    propertyAddress: '',
    unitNumber: '',
    tenantFirstName: '',
    tenantLastName: '',
    tenantInitial: '',
    inspectorName: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    inspectionType: 'Annual', // Annual, Move-in, Move-out, Special
    programType: [], // HUD, HOME, LIHTC, USDA, Other
    
    // Step 2: Room Configuration
    bedrooms: 2,
    bathrooms: 1,
    hasKitchen: true,
    hasLivingRoom: true,
    hasDiningRoom: false,
    hasLaundryRoom: false,
    hallways: 0,
    stairways: 0,
    hasDeckPatio: false,
    hasYard: false,
    
    // Step 3: Global Features
    heatingType: '', // centralFurnace, baseboard, radiator, miniSplit
    heatingFuel: '', // electric, gas, oil
    coolingType: '', // centralAir, throughWall, miniSplit, none
    hasWaterHeater: false,
    waterHeaterLocation: '',
    waterHeaterInstallDate: 'Unknown',
    waterHeaterCustomDate: '',
    hasWasher: false,
    hasDryer: false,
    laundryLocation: '',
    
    // Step 4: Room Inspections (dynamic based on configuration)
    rooms: [],
    
    // Step 5: Report Data
    complianceStatement: true,
    inspectorSignature: '',
    tenantSignature: '',
    reportNotes: ''
  });

  const [rooms, setRooms] = useState([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const fileInputRef = useRef(null);

  // ==================== NSPIRE COMPLIANCE DATA ====================
  
  const NSPIRE_REQUIREMENTS = {
    smokeAlarms: {
      bedrooms: 'Required in each bedroom',
      hallways: 'Required in hallways serving bedrooms',
      floors: 'Required on each floor level',
      type: 'Photoelectric or ionization, approved by testing laboratory'
    },
    co2Alarms: {
      required: 'Required within 15 feet of bedrooms if fuel-burning appliances present',
      type: 'Electrochemical sensor recommended'
    },
    gfiProtection: {
      kitchen: 'Required for all outlets within 6 feet of sink',
      bathroom: 'Required for all bathroom outlets',
      outdoor: 'Required for all outdoor outlets',
      garage: 'Required for all garage outlets'
    },
    railings: {
      stairs: 'Required for 4 or more risers (NSPIRE: 3 or more)',
      height: 'Between 34-38 inches from nosing',
      graspability: 'Must be graspable, 1.25 to 2 inches diameter'
    },
    windowLocks: {
      ground: 'Required for all ground floor windows',
      accessible: 'Required for accessible windows above ground floor',
      type: 'Functioning locks required'
    },
    doors: {
      entry: {
        width: 'Minimum 32 inches clear opening (36 inch door)',
        height: 'Minimum 80 inches',
        locks: 'Deadbolt required on all entry doors'
      },
      interior: {
        width: 'Minimum 28 inches recommended',
        height: 'Minimum 80 inches'
      }
    },
    waterHeater: {
      tpr: 'Temperature Pressure Relief valve required',
      pan: 'Drain pan required if in living space',
      temperature: 'Maximum 120°F at fixtures',
      venting: 'Proper venting required for gas/oil'
    },
    outlets: {
      spacing: 'No point more than 6 feet from outlet',
      gfi: 'GFI required near water sources',
      cover: 'All outlets must have covers'
    }
  };

  const ROOM_TYPES = {
    bedroom: 'Bedroom',
    bathroom: 'Bathroom',
    kitchen: 'Kitchen',
    livingRoom: 'Living Room',
    diningRoom: 'Dining Room',
    laundryRoom: 'Laundry Room',
    hallway: 'Hallway',
    stairway: 'Stairway',
    deckPatio: 'Deck/Patio',
    yard: 'Yard'
  };

  const FLOORING_TYPES = ['Carpet', 'Vinyl', 'Hardwood', 'Linoleum', 'Vinyl Plank', 'Cement', 'Tile'];
  const CONDITIONS = ['New', 'Good', 'Fair', 'Poor'];
  const INSTALL_DATE_OPTIONS = ['Pre-Rehab', 'Original', 'Unknown', 'Custom'];
  const ACTION_TYPES = ['None', 'Repair', 'Replace', 'Diagnose'];
  
  const APPLIANCE_TYPES = [
    'Refrigerator',
    'Stove/Range',
    'Range Hood',
    'Dishwasher',
    'Garbage Disposal',
    'Microwave',
    'Washer',
    'Dryer',
    'Water Heater',
    'HVAC Unit',
    'Other'
  ];

  // ==================== ROOM INITIALIZATION ====================
  
  const initializeRooms = () => {
    const newRooms = [];
    
    // Bedrooms
    for (let i = 1; i <= inspectionData.bedrooms; i++) {
      newRooms.push(createRoom('bedroom', `Bedroom ${i}`));
    }
    
    // Bathrooms
    for (let i = 1; i <= inspectionData.bathrooms; i++) {
      newRooms.push(createRoom('bathroom', `Bathroom ${i}`));
    }
    
    // Other rooms
    if (inspectionData.hasKitchen) newRooms.push(createRoom('kitchen', 'Kitchen'));
    if (inspectionData.hasLivingRoom) newRooms.push(createRoom('livingRoom', 'Living Room'));
    if (inspectionData.hasDiningRoom) newRooms.push(createRoom('diningRoom', 'Dining Room'));
    if (inspectionData.hasLaundryRoom) newRooms.push(createRoom('laundryRoom', 'Laundry Room'));
    
    // Hallways
    for (let i = 1; i <= inspectionData.hallways; i++) {
      newRooms.push(createRoom('hallway', `Hallway ${i}`));
    }
    
    // Stairways
    for (let i = 1; i <= inspectionData.stairways; i++) {
      newRooms.push(createRoom('stairway', `Stairway ${i}`));
    }
    
    // Outdoor areas
    if (inspectionData.hasDeckPatio) newRooms.push(createRoom('deckPatio', 'Deck/Patio'));
    if (inspectionData.hasYard) newRooms.push(createRoom('yard', 'Yard'));
    
    setRooms(newRooms);
  };

  const createRoom = (type, name) => ({
    id: `${type}-${Date.now()}-${Math.random()}`,
    type,
    name,
    
    // NSPIRE Basic Requirements
    housekeepingAcceptable: true,
    housekeepingNotes: '',
    
    // Safety Devices (NSPIRE Required)
    hasSmokeAlarm: false,
    smokeAlarmType: '', // smoke, co2, combo
    smokeAlarmStatus: 'Working', // Working, NeedsBattery, Replace
    smokeAlarmNotes: '',
    smokeAlarmPhotos: [],
    smokeAlarmWorkOrder: false,
    
    hasCO2Alarm: false,
    co2AlarmStatus: 'Working',
    co2AlarmNotes: '',
    co2AlarmPhotos: [],
    co2AlarmWorkOrder: false,
    
    // Flooring (NSPIRE Required)
    flooringType: '',
    flooringInstallDate: 'Unknown',
    flooringCustomDate: '',
    flooringCondition: 'Good',
    flooringNeedsAction: 'None',
    flooringNotes: '',
    flooringPhotos: [],
    flooringWorkOrder: false,
    
    // Walls (NSPIRE Required)
    wallsCondition: 'Good',
    wallsNeedsAction: 'None',
    wallsNotes: '',
    wallsPhotos: [],
    wallsWorkOrder: false,
    
    // Ceiling (NSPIRE Required)
    ceilingCondition: 'Good',
    ceilingNeedsAction: 'None',
    ceilingNotes: '',
    ceilingPhotos: [],
    ceilingWorkOrder: false,
    
    // Paint (NSPIRE Required - Defective Paint Check)
    paintCondition: 'Good',
    paintNeedsAction: 'None',
    paintDefectivePaint: false, // Lead-based paint concern
    paintNotes: '',
    paintPhotos: [],
    paintWorkOrder: false,
    
    // Bull Nose (NSPIRE Structural)
    hasBullNose: false,
    bullNoseCondition: 'Good',
    bullNoseLocation: '',
    bullNoseNotes: '',
    bullNosePhotos: [],
    bullNoseWorkOrder: false,
    
    // Electrical Outlets (NSPIRE Required)
    outletCount: 0,
    outletsLoose: false,
    outletsLooseNotes: '',
    outletsLoosePhotos: [],
    outletsLooseWorkOrder: false,
    outletsNonFunctional: false,
    outletsNonFunctionalNotes: '',
    outletsNonFunctionalPhotos: [],
    outletsNonFunctionalWorkOrder: false,
    
    // GFI Protection (Kitchen/Bathroom NSPIRE Required)
    hasGFI: false,
    gfiStatus: 'Working', // Working, NotWorking, NotTested
    gfiNotes: '',
    gfiPhotos: [],
    gfiWorkOrder: false,
    
    // Entry Door (NSPIRE Required)
    hasEntryDoor: true,
    doorWidth: '30',
    doorHeight: '80',
    doorCustomWidth: '',
    doorCustomHeight: '',
    doorCondition: 'Good',
    doorLockWorking: true,
    doorDeadbolt: true, // Required for entry doors
    doorNeedsAction: 'None',
    doorNotes: '',
    doorPhotos: [],
    doorWorkOrder: false,
    
    // Windows (NSPIRE Required)
    windowCount: 0,
    windowsOperable: true,
    windowsLocks: true,
    windowsCondition: 'Good',
    windowsNeedsAction: 'None',
    windowsNotes: '',
    windowsPhotos: [],
    windowsWorkOrder: false,
    
    // Storage
    hasClosets: false,
    closetCount: 0,
    closetDoorsCondition: 'Good',
    closetDoorsNotes: '',
    closetDoorsPhotos: [],
    closetDoorsWorkOrder: false,
    
    hasCupboards: false,
    cupboardCount: 0,
    cupboardCondition: 'Good',
    cupboardNotes: '',
    cupboardPhotos: [],
    cupboardWorkOrder: false,
    
    hasDrawers: false,
    drawerCount: 0,
    drawerCondition: 'Good',
    drawerNotes: '',
    drawerPhotos: [],
    drawerWorkOrder: false,
    
    // Plumbing (Kitchen/Bathroom)
    hasSink: false,
    sinkCondition: 'Good',
    sinkDrainsSlowly: false,
    sinkLeaks: false,
    sinkNotes: '',
    sinkPhotos: [],
    sinkWorkOrder: false,
    
    faucetCondition: 'Good',
    faucetLeaks: false,
    faucetLowPressure: false,
    faucetNotes: '',
    faucetPhotos: [],
    faucetWorkOrder: false,
    
    // Bathroom Specific (NSPIRE Required)
    hasToilet: false,
    toiletSecure: true,
    toiletLeaks: false,
    toiletFlushes: true,
    toiletNotes: '',
    toiletPhotos: [],
    toiletWorkOrder: false,
    
    hasShowerTub: false,
    showerTubType: '', // Shower, Tub, Combo
    showerTubCondition: 'Good',
    showerTubDrains: true,
    showerTubLeaks: false,
    showerTubNotes: '',
    showerTubPhotos: [],
    showerTubWorkOrder: false,
    
    hasVentilation: false,
    ventilationType: '', // Window, Fan
    ventilationWorks: true,
    ventilationNotes: '',
    ventilationPhotos: [],
    ventilationWorkOrder: false,
    
    // Heating (Per Room if applicable)
    hasHeater: false,
    heaterType: '', // baseboard, radiator, miniSplit, vent
    heaterCount: 0,
    heaterCondition: 'Good',
    heaterWorks: true,
    heaterNotes: '',
    heaterPhotos: [],
    heaterWorkOrder: false,
    
    hasThermostat: false,
    thermostatType: '', // manual, programmable, smart
    thermostatWorks: true,
    thermostatNotes: '',
    thermostatPhotos: [],
    thermostatWorkOrder: false,
    
    // Stairway Specific (NSPIRE Required)
    hasRailing: false,
    railingRequired: false, // true if 3+ rises
    riseCount: 0,
    railingBothSides: false,
    railingHeight: '', // 34-38 inches
    railingSecure: true,
    railingCondition: 'Good',
    railingNotes: '',
    railingPhotos: [],
    railingWorkOrder: false,
    
    // Appliances (Dynamic)
    appliances: [],
    
    // General
    generalComments: '',
    generalPhotos: []
  });

  // ==================== APPLIANCE STRUCTURE ====================
  
  const createAppliance = (type, brand = '') => ({
    id: `appliance-${Date.now()}-${Math.random()}`,
    type,
    brand,
    model: '',
    serial: '',
    installDate: 'Unknown',
    customInstallDate: '',
    condition: 'Good',
    needsAction: 'None',
    notes: '',
    photos: [],
    workOrder: false,
    
    // Refrigerator Specific (NSPIRE)
    ...(type === 'Refrigerator' && {
      properTemperature: 'Yes',
      excessiveNoise: 'No',
      brokenShelvesCount: 0,
      brokenSealsCount: 0,
      brokenDrawersCount: 0,
      brokenFlipDoorsCount: 0
    }),
    
    // Stove/Range Specific (NSPIRE)
    ...(type === 'Stove/Range' && {
      ovenWorks: true,
      ovenTemperatureAccurate: true,
      knobsWork: true,
      allBurnersWork: true,
      burnerTemperaturesCorrect: true,
      gasLeaks: false
    }),
    
    // Range Hood Specific (NSPIRE)
    ...(type === 'Range Hood' && {
      lightWorks: true,
      fanWorks: true,
      filterCondition: 'Good',
      exhaustsOutside: true
    }),
    
    // Dishwasher Specific
    ...(type === 'Dishwasher' && {
      drainsCompletely: true,
      leaks: false,
      cleansDishes: true
    }),
    
    // Water Heater Specific (NSPIRE)
    ...(type === 'Water Heater' && {
      hasTPRValve: true,
      tprValveWorks: true,
      hasDrainPan: false,
      properVenting: true,
      waterTemperature: '120', // Max 120°F per NSPIRE
      leaks: false
    }),
    
    // Washer/Dryer Specific
    ...(type === 'Washer' && {
      fillsCompletely: true,
      drainsCompletely: true,
      spinsCorrectly: true,
      leaks: false
    }),
    
    ...(type === 'Dryer' && {
      heatsCorrectly: true,
      ventedProperly: true,
      lintTrapClean: true,
      tumbles: true
    })
  });

  // ==================== STEP NAVIGATION ====================
  
  const goToNextStep = () => {
    if (currentStep === 2) {
      initializeRooms();
    }
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step === 4 && rooms.length === 0) {
      initializeRooms();
    }
    setCurrentStep(step);
  };

  // ==================== DATA HANDLERS ====================
  
  const updateInspectionData = (field, value) => {
    setInspectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateRoom = (roomId, field, value) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, [field]: value } : room
    ));
  };

  const updateAppliance = (roomId, applianceId, field, value) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          appliances: room.appliances.map(app =>
            app.id === applianceId ? { ...app, [field]: value } : app
          )
        };
      }
      return room;
    }));
  };

  const addAppliance = (roomId, type) => {
    const newAppliance = createAppliance(type);
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          appliances: [...room.appliances, newAppliance]
        };
      }
      return room;
    }));
  };

  const removeAppliance = (roomId, applianceId) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          appliances: room.appliances.filter(app => app.id !== applianceId)
        };
      }
      return room;
    }));
  };

  // ==================== PHOTO HANDLERS ====================
  
  const handlePhotoUpload = (e, roomId, field, applianceId = null) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photo = {
          id: `photo-${Date.now()}-${Math.random()}`,
          data: reader.result,
          filename: file.name,
          timestamp: new Date().toISOString(),
          comment: ''
        };
        
        if (applianceId) {
          setRooms(prev => prev.map(room => {
            if (room.id === roomId) {
              return {
                ...room,
                appliances: room.appliances.map(app => {
                  if (app.id === applianceId) {
                    return {
                      ...app,
                      photos: [...(app.photos || []), photo]
                    };
                  }
                  return app;
                })
              };
            }
            return room;
          }));
        } else {
          setRooms(prev => prev.map(room => {
            if (room.id === roomId) {
              return {
                ...room,
                [field]: [...(room[field] || []), photo]
              };
            }
            return room;
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (roomId, field, photoId, applianceId = null) => {
    if (applianceId) {
      setRooms(prev => prev.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            appliances: room.appliances.map(app => {
              if (app.id === applianceId) {
                return {
                  ...app,
                  photos: (app.photos || []).filter(p => p.id !== photoId)
                };
              }
              return app;
            })
          };
        }
        return room;
      }));
    } else {
      setRooms(prev => prev.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            [field]: (room[field] || []).filter(p => p.id !== photoId)
          };
        }
        return room;
      }));
    }
  };

  const updatePhotoComment = (roomId, field, photoId, comment, applianceId = null) => {
    if (applianceId) {
      setRooms(prev => prev.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            appliances: room.appliances.map(app => {
              if (app.id === applianceId) {
                return {
                  ...app,
                  photos: (app.photos || []).map(p => 
                    p.id === photoId ? { ...p, comment } : p
                  )
                };
              }
              return app;
            })
          };
        }
        return room;
      }));
    } else {
      setRooms(prev => prev.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            [field]: (room[field] || []).map(p => 
              p.id === photoId ? { ...p, comment } : p
            )
          };
        }
        return room;
      }));
    }
  };

  // ==================== REPORT GENERATION ====================
  
  const generateFilename = () => {
    const date = new Date(inspectionData.inspectionDate);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${inspectionData.propertyName} ${inspectionData.unitNumber} ${inspectionData.tenantInitial}${inspectionData.tenantLastName} ${month} ${day} ${year}`;
  };

  const generateReport = () => {
    // This function would generate the PDF report
    // For now, we'll just show the report in a print-friendly format
    window.print();
  };

  const emailReport = () => {
    const subject = encodeURIComponent(generateFilename());
    const body = encodeURIComponent(`Please find attached the inspection report for ${inspectionData.propertyName}, Unit ${inspectionData.unitNumber}.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // ==================== RENDER FUNCTIONS ====================
  
  const renderProgressBar = () => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Home className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            NSPIRE-Compliant Unit Inspection
          </span>
        </div>
        <span className="text-sm text-gray-600">Step {currentStep} of 5</span>
      </div>
      
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map(step => (
          <button
            key={step}
            onClick={() => goToStep(step)}
            className={`flex-1 h-2 rounded-full transition-all ${
              step < currentStep ? 'bg-green-500' :
              step === currentStep ? 'bg-blue-500' :
              'bg-gray-200'
            }`}
          />
        ))}
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>Property Info</span>
        <span>Room Config</span>
        <span>Global Features</span>
        <span>Room Inspections</span>
        <span>Generate Report</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Clipboard className="w-6 h-6 mr-2" />
        Property & Tenant Information
      </h2>
      
      <div className="space-y-4">
        {/* Federal Program Compliance */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Federal Program Type (Select all that apply)</h3>
          <div className="grid grid-cols-2 gap-2">
            {['HUD', 'HOME', 'LIHTC', 'USDA Rural Development', 'Section 8', 'Other'].map(program => (
              <label key={program} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={inspectionData.programType.includes(program)}
                  onChange={(e) => {
                    const newPrograms = e.target.checked
                      ? [...inspectionData.programType, program]
                      : inspectionData.programType.filter(p => p !== program);
                    updateInspectionData('programType', newPrograms);
                  }}
                  className="rounded"
                />
                <span className="text-sm">{program}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Property Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.propertyName}
            onChange={(e) => updateInspectionData('propertyName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Park Village 1 & 2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.propertyAddress}
            onChange={(e) => updateInspectionData('propertyAddress', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Full street address"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.unitNumber}
            onChange={(e) => updateInspectionData('unitNumber', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 001, A-1"
            required
          />
        </div>
        
        {/* Tenant Information */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={inspectionData.tenantFirstName}
              onChange={(e) => {
                updateInspectionData('tenantFirstName', e.target.value);
                if (e.target.value) {
                  updateInspectionData('tenantInitial', e.target.value.charAt(0).toUpperCase());
                }
              }}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial
            </label>
            <input
              type="text"
              value={inspectionData.tenantInitial}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              maxLength="1"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenant Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.tenantLastName}
            onChange={(e) => updateInspectionData('tenantLastName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Inspector Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Inspector Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={inspectionData.inspectorName}
            onChange={(e) => updateInspectionData('inspectorName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inspection Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={inspectionData.inspectionDate}
              onChange={(e) => updateInspectionData('inspectionDate', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inspection Type <span className="text-red-500">*</span>
            </label>
            <select
              value={inspectionData.inspectionType}
              onChange={(e) => updateInspectionData('inspectionType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Annual">Annual Inspection</option>
              <option value="Move-in">Move-in Inspection</option>
              <option value="Move-out">Move-out Inspection</option>
              <option value="Special">Special Inspection</option>
              <option value="Complaint">Complaint Inspection</option>
            </select>
          </div>
        </div>
        
        {/* NSPIRE Compliance Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6">
          <div className="flex">
            <AlertCircle className="w-5 h-5 text-yellow-500 mr-2" />
            <div>
              <h3 className="font-semibold text-yellow-900">NSPIRE Inspection Standards</h3>
              <p className="text-sm text-yellow-800 mt-1">
                This inspection follows HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE).
                All federal compliance requirements for {inspectionData.programType.join(', ') || 'selected programs'} will be checked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Settings className="w-6 h-6 mr-2" />
        Room Configuration
      </h2>
      
      <div className="space-y-6">
        {/* Primary Rooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Bedrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={inspectionData.bedrooms}
              onChange={(e) => updateInspectionData('bedrooms', parseInt(e.target.value) || 0)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              NSPIRE requires smoke alarms in each bedroom
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Bathrooms <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={inspectionData.bathrooms}
              onChange={(e) => updateInspectionData('bathrooms', parseInt(e.target.value) || 1)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              NSPIRE requires GFI protection in all bathrooms
            </p>
          </div>
        </div>
        
        {/* Common Rooms */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3">Common Rooms</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'hasKitchen', label: 'Kitchen', note: 'GFI protection required' },
              { key: 'hasLivingRoom', label: 'Living Room' },
              { key: 'hasDiningRoom', label: 'Dining Room' },
              { key: 'hasLaundryRoom', label: 'Laundry Room', note: 'In-unit laundry' }
            ].map(room => (
              <label key={room.key} className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  checked={inspectionData[room.key]}
                  onChange={(e) => updateInspectionData(room.key, e.target.checked)}
                  className="mt-1 rounded"
                />
                <div>
                  <span className="text-sm font-medium">{room.label}</span>
                  {room.note && (
                    <p className="text-xs text-gray-500">{room.note}</p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
        
        {/* Transitional Spaces */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3">Transitional Spaces</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Hallways
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={inspectionData.hallways}
                onChange={(e) => updateInspectionData('hallways', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Smoke alarms required in hallways serving bedrooms
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Stairways
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={inspectionData.stairways}
                onChange={(e) => updateInspectionData('stairways', parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Railings required for 3 or more risers (NSPIRE)
              </p>
            </div>
          </div>
        </div>
        
        {/* Outdoor Areas */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3">Outdoor Areas</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inspectionData.hasDeckPatio}
                onChange={(e) => updateInspectionData('hasDeckPatio', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Deck/Patio</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inspectionData.hasYard}
                onChange={(e) => updateInspectionData('hasYard', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Yard</span>
            </label>
          </div>
        </div>
        
        {/* Summary */}
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">Configuration Summary</h3>
          <p className="text-sm text-blue-800">
            Total rooms to inspect: {
              inspectionData.bedrooms + 
              inspectionData.bathrooms + 
              (inspectionData.hasKitchen ? 1 : 0) +
              (inspectionData.hasLivingRoom ? 1 : 0) +
              (inspectionData.hasDiningRoom ? 1 : 0) +
              (inspectionData.hasLaundryRoom ? 1 : 0) +
              inspectionData.hallways +
              inspectionData.stairways +
              (inspectionData.hasDeckPatio ? 1 : 0) +
              (inspectionData.hasYard ? 1 : 0)
            }
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Global Features & Systems</h2>
      
      <div className="space-y-6">
        {/* Heating System */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
            Heating System (NSPIRE Required)
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heating Type <span className="text-red-500">*</span>
              </label>
              <select
                value={inspectionData.heatingType}
                onChange={(e) => updateInspectionData('heatingType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                <option value="centralFurnace">Central Furnace</option>
                <option value="baseboard">Baseboard Heaters</option>
                <option value="radiator">Radiator Heaters</option>
                <option value="miniSplit">Mini Split Heat Pump</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {inspectionData.heatingType === 'centralFurnace' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={inspectionData.heatingFuel}
                  onChange={(e) => updateInspectionData('heatingFuel', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="electric">Electric</option>
                  <option value="gas">Natural Gas</option>
                  <option value="propane">Propane</option>
                  <option value="oil">Oil</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  CO2 alarm required for fuel-burning furnaces
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Cooling System */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3">Cooling System</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cooling Type
            </label>
            <select
              value={inspectionData.coolingType}
              onChange={(e) => updateInspectionData('coolingType', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select...</option>
              <option value="centralAir">Central Air Conditioning</option>
              <option value="throughWall">Through-Wall Units</option>
              <option value="miniSplit">Mini Split System</option>
              <option value="none">No Air Conditioning</option>
            </select>
          </div>
        </div>
        
        {/* Water Heater */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
            Water Heater (NSPIRE Required Checks)
          </h3>
          
          <label className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={inspectionData.hasWaterHeater}
              onChange={(e) => updateInspectionData('hasWaterHeater', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Unit has water heater</span>
          </label>
          
          {inspectionData.hasWaterHeater && (
            <div className="space-y-3 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={inspectionData.waterHeaterLocation}
                  onChange={(e) => updateInspectionData('waterHeaterLocation', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Closet, Basement, Laundry Room"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Install Date
                </label>
                <select
                  value={inspectionData.waterHeaterInstallDate}
                  onChange={(e) => updateInspectionData('waterHeaterInstallDate', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  {INSTALL_DATE_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {inspectionData.waterHeaterInstallDate === 'Custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Install Date
                  </label>
                  <input
                    type="month"
                    value={inspectionData.waterHeaterCustomDate}
                    onChange={(e) => updateInspectionData('waterHeaterCustomDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800">
                <p className="font-semibold">NSPIRE Requirements:</p>
                <ul className="list-disc ml-4 mt-1">
                  <li>TPR valve required and functional</li>
                  <li>Drain pan if in living space</li>
                  <li>Maximum 120°F at fixtures</li>
                  <li>Proper venting for gas/oil units</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Laundry Appliances */}
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold text-gray-700 mb-3">Laundry Appliances</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inspectionData.hasWasher}
                onChange={(e) => updateInspectionData('hasWasher', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Washing Machine</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inspectionData.hasDryer}
                onChange={(e) => updateInspectionData('hasDryer', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium">Dryer</span>
            </label>
            
            {(inspectionData.hasWasher || inspectionData.hasDryer) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Laundry Location
                </label>
                <input
                  type="text"
                  value={inspectionData.laundryLocation}
                  onChange={(e) => updateInspectionData('laundryLocation', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Laundry Room, Kitchen, Hallway Closet"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderRoomInspectionField = (room, field, label, type = 'text', options = null, required = false) => {
    const value = room[field];
    
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {type === 'select' && options ? (
          <select
            value={value}
            onChange={(e) => updateRoom(room.id, field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => updateRoom(room.id, field, e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">{label}</span>
          </label>
        ) : type === 'number' ? (
          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) => updateRoom(room.id, field, parseInt(e.target.value) || 0)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        ) : type === 'textarea' ? (
          <textarea
            value={value}
            onChange={(e) => updateRoom(room.id, field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => updateRoom(room.id, field, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    );
  };

  const renderPhotoSection = (room, field, label, applianceId = null) => {
    const photos = applianceId 
      ? room.appliances.find(a => a.id === applianceId)?.photos || []
      : room[field] || [];
    
    return (
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        
        <button
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = 'image/*';
            input.onchange = (e) => handlePhotoUpload(e, room.id, field, applianceId);
            input.click();
          }}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Camera className="w-4 h-4" />
          <span className="text-sm">Add Photos</span>
        </button>
        
        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {photos.map(photo => (
              <div key={photo.id} className="relative border rounded p-1">
                <img src={photo.data} alt="Inspection" className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => removePhoto(room.id, field, photo.id, applianceId)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
                <input
                  type="text"
                  placeholder="Photo comment..."
                  value={photo.comment}
                  onChange={(e) => updatePhotoComment(room.id, field, photo.id, e.target.value, applianceId)}
                  className="w-full mt-1 p-1 text-xs border rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderWorkOrderSection = (room, field, needsCondition = true) => {
    const condition = room[`${field}Condition`];
    const needsAction = room[`${field}NeedsAction`];
    const showWorkOrder = needsCondition ? (condition === 'Fair' || condition === 'Poor') : true;
    
    if (!showWorkOrder && needsCondition) return null;
    
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-2">
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={room[`${field}WorkOrder`]}
            onChange={(e) => updateRoom(room.id, `${field}WorkOrder`, e.target.checked)}
            className="rounded"
          />
          <span className="text-sm font-semibold text-yellow-900">Create Work Order</span>
        </label>
        
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Action Needed</label>
            <select
              value={needsAction}
              onChange={(e) => updateRoom(room.id, `${field}NeedsAction`, e.target.value)}
              className="w-full p-1 text-sm border border-gray-300 rounded"
            >
              {ACTION_TYPES.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={room[`${field}Notes`]}
              onChange={(e) => updateRoom(room.id, `${field}Notes`, e.target.value)}
              className="w-full p-2 text-sm border border-gray-300 rounded"
              rows="2"
              placeholder="Describe the issue and required action..."
            />
          </div>
          
          {renderPhotoSection(room, `${field}Photos`, 'Evidence Photos')}
        </div>
      </div>
    );
  };

  const renderRoomInspection = (room) => {
    const currentRoom = rooms[currentRoomIndex];
    if (!currentRoom) return null;
    
    return (
      <div className="space-y-6">
        {/* Room Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
          <h3 className="text-xl font-bold">{currentRoom.name}</h3>
          <p className="text-sm opacity-90">Room {currentRoomIndex + 1} of {rooms.length}</p>
        </div>
        
        {/* Housekeeping */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Housekeeping (NSPIRE Required)
          </h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={currentRoom.housekeepingAcceptable}
              onChange={(e) => updateRoom(currentRoom.id, 'housekeepingAcceptable', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Housekeeping Acceptable</span>
          </label>
          {!currentRoom.housekeepingAcceptable && (
            <textarea
              value={currentRoom.housekeepingNotes}
              onChange={(e) => updateRoom(currentRoom.id, 'housekeepingNotes', e.target.value)}
              className="w-full mt-2 p-2 border rounded"
              rows="2"
              placeholder="Describe housekeeping concerns..."
            />
          )}
        </div>
        
        {/* Safety Devices (Bedrooms, Hallways) */}
        {(['bedroom', 'hallway'].includes(currentRoom.type)) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Safety Devices (NSPIRE REQUIRED)
            </h4>
            
            {/* Smoke Alarm */}
            <div className="bg-white p-3 rounded mb-3">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={currentRoom.hasSmokeAlarm}
                  onChange={(e) => updateRoom(currentRoom.id, 'hasSmokeAlarm', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-semibold">Smoke Alarm Present (REQUIRED)</span>
              </label>
              
              {currentRoom.hasSmokeAlarm && (
                <div className="ml-6 space-y-2">
                  <select
                    value={currentRoom.smokeAlarmType}
                    onChange={(e) => updateRoom(currentRoom.id, 'smokeAlarmType', e.target.value)}
                    className="w-full p-2 text-sm border rounded"
                  >
                    <option value="">Select Type...</option>
                    <option value="smoke">Smoke Only</option>
                    <option value="co2">CO2 Only</option>
                    <option value="combo">Combination Smoke/CO2</option>
                  </select>
                  
                  <select
                    value={currentRoom.smokeAlarmStatus}
                    onChange={(e) => updateRoom(currentRoom.id, 'smokeAlarmStatus', e.target.value)}
                    className="w-full p-2 text-sm border rounded"
                  >
                    <option value="Working">Working</option>
                    <option value="NeedsBattery">Needs Battery</option>
                    <option value="Replace">Needs Replacement</option>
                  </select>
                  
                  {currentRoom.smokeAlarmStatus !== 'Working' && renderWorkOrderSection(currentRoom, 'smokeAlarm', false)}
                </div>
              )}
              
              {!currentRoom.hasSmokeAlarm && (
                <div className="ml-6 bg-red-100 border border-red-300 p-2 rounded text-sm text-red-800">
                  ⚠️ NSPIRE VIOLATION: Smoke alarm required in {currentRoom.type}s
                </div>
              )}
            </div>
            
            {/* CO2 Alarm (if fuel-burning appliances) */}
            {inspectionData.heatingFuel && inspectionData.heatingFuel !== 'electric' && (
              <div className="bg-white p-3 rounded">
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.hasCO2Alarm}
                    onChange={(e) => updateRoom(currentRoom.id, 'hasCO2Alarm', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-semibold">CO2 Alarm Present (REQUIRED with fuel-burning)</span>
                </label>
                
                {currentRoom.hasCO2Alarm && (
                  <div className="ml-6 space-y-2">
                    <select
                      value={currentRoom.co2AlarmStatus}
                      onChange={(e) => updateRoom(currentRoom.id, 'co2AlarmStatus', e.target.value)}
                      className="w-full p-2 text-sm border rounded"
                    >
                      <option value="Working">Working</option>
                      <option value="NeedsBattery">Needs Battery</option>
                      <option value="Replace">Needs Replacement</option>
                    </select>
                    
                    {currentRoom.co2AlarmStatus !== 'Working' && renderWorkOrderSection(currentRoom, 'co2Alarm', false)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Flooring */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Flooring (NSPIRE Required)</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={currentRoom.flooringType}
                onChange={(e) => updateRoom(currentRoom.id, 'flooringType', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select...</option>
                {FLOORING_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
              <select
                value={currentRoom.flooringCondition}
                onChange={(e) => updateRoom(currentRoom.id, 'flooringCondition', e.target.value)}
                className="w-full p-2 border rounded"
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Install Date</label>
              <select
                value={currentRoom.flooringInstallDate}
                onChange={(e) => updateRoom(currentRoom.id, 'flooringInstallDate', e.target.value)}
                className="w-full p-2 border rounded"
              >
                {INSTALL_DATE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            
            {currentRoom.flooringInstallDate === 'Custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Date</label>
                <input
                  type="month"
                  value={currentRoom.flooringCustomDate}
                  onChange={(e) => updateRoom(currentRoom.id, 'flooringCustomDate', e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>
          
          {renderWorkOrderSection(currentRoom, 'flooring')}
        </div>
        
        {/* Walls, Ceiling, Paint */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['walls', 'ceiling', 'paint'].map(surface => (
            <div key={surface} className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 capitalize">{surface}</h4>
              <select
                value={currentRoom[`${surface}Condition`]}
                onChange={(e) => updateRoom(currentRoom.id, `${surface}Condition`, e.target.value)}
                className="w-full p-2 border rounded"
              >
                {CONDITIONS.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
              
              {surface === 'paint' && (
                <label className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.paintDefectivePaint}
                    onChange={(e) => updateRoom(currentRoom.id, 'paintDefectivePaint', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs text-red-600">Defective Paint (Lead concern)</span>
                </label>
              )}
              
              {renderWorkOrderSection(currentRoom, surface)}
            </div>
          ))}
        </div>
        
        {/* Bull Nose */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Bull Nose Trim</h4>
          <label className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              checked={currentRoom.hasBullNose}
              onChange={(e) => updateRoom(currentRoom.id, 'hasBullNose', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Room has bull nose trim</span>
          </label>
          
          {currentRoom.hasBullNose && (
            <div className="ml-6 space-y-2">
              <select
                value={currentRoom.bullNoseCondition}
                onChange={(e) => updateRoom(currentRoom.id, 'bullNoseCondition', e.target.value)}
                className="w-full p-2 border rounded"
              >
                {[...CONDITIONS, 'Missing'].map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
              
              {(currentRoom.bullNoseCondition === 'Fair' || currentRoom.bullNoseCondition === 'Poor') && (
                <>
                  <input
                    type="text"
                    placeholder="Location (e.g., NE corner, entrance)"
                    value={currentRoom.bullNoseLocation}
                    onChange={(e) => updateRoom(currentRoom.id, 'bullNoseLocation', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  {renderWorkOrderSection(currentRoom, 'bullNose')}
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Electrical Outlets */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
            Electrical Outlets (NSPIRE Required)
          </h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Outlets
              </label>
              <input
                type="number"
                min="0"
                value={currentRoom.outletCount}
                onChange={(e) => updateRoom(currentRoom.id, 'outletCount', parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded"
              />
              <p className="text-xs text-gray-500 mt-1">
                NSPIRE: No point should be more than 6 feet from outlet
              </p>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={currentRoom.outletsLoose}
                  onChange={(e) => updateRoom(currentRoom.id, 'outletsLoose', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Any outlets loose?</span>
              </label>
              
              {currentRoom.outletsLoose && (
                <div className="ml-6">
                  <textarea
                    placeholder="List which outlets are loose..."
                    value={currentRoom.outletsLooseNotes}
                    onChange={(e) => updateRoom(currentRoom.id, 'outletsLooseNotes', e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    rows="2"
                  />
                  {renderPhotoSection(currentRoom, 'outletsLoosePhotos', 'Photos of Loose Outlets')}
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.outletsLooseWorkOrder}
                      onChange={(e) => updateRoom(currentRoom.id, 'outletsLooseWorkOrder', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-semibold">Create Work Order</span>
                  </label>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 p-3 rounded">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={currentRoom.outletsNonFunctional}
                  onChange={(e) => updateRoom(currentRoom.id, 'outletsNonFunctional', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Any outlets non-functional?</span>
              </label>
              
              {currentRoom.outletsNonFunctional && (
                <div className="ml-6">
                  <textarea
                    placeholder="List which outlets don't work..."
                    value={currentRoom.outletsNonFunctionalNotes}
                    onChange={(e) => updateRoom(currentRoom.id, 'outletsNonFunctionalNotes', e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    rows="2"
                  />
                  {renderPhotoSection(currentRoom, 'outletsNonFunctionalPhotos', 'Photos of Non-Functional Outlets')}
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.outletsNonFunctionalWorkOrder}
                      onChange={(e) => updateRoom(currentRoom.id, 'outletsNonFunctionalWorkOrder', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-semibold">Create Work Order</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* GFI Protection (Kitchen/Bathroom) */}
        {(['kitchen', 'bathroom'].includes(currentRoom.type)) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              GFI Protection (NSPIRE REQUIRED)
            </h4>
            
            <label className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                checked={currentRoom.hasGFI}
                onChange={(e) => updateRoom(currentRoom.id, 'hasGFI', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-semibold">GFI outlets present near water sources</span>
            </label>
            
            {!currentRoom.hasGFI && (
              <div className="bg-red-100 border border-red-300 p-2 rounded text-sm text-red-800">
                ⚠️ NSPIRE VIOLATION: GFI protection required within 6 feet of {currentRoom.type === 'kitchen' ? 'sink' : 'bathroom fixtures'}
              </div>
            )}
            
            {currentRoom.hasGFI && (
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GFI Function Test</label>
                  <select
                    value={currentRoom.gfiStatus}
                    onChange={(e) => updateRoom(currentRoom.id, 'gfiStatus', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="Working">Working</option>
                    <option value="NotWorking">Not Working</option>
                    <option value="NotTested">Not Tested</option>
                  </select>
                </div>
                
                {currentRoom.gfiStatus === 'NotWorking' && renderWorkOrderSection(currentRoom, 'gfi', false)}
              </div>
            )}
          </div>
        )}
        
        {/* Entry Door */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Entry Door</h4>
          
          <label className="flex items-center space-x-2 mb-3">
            <input
              type="checkbox"
              checked={currentRoom.hasEntryDoor}
              onChange={(e) => updateRoom(currentRoom.id, 'hasEntryDoor', e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Room has entry door</span>
          </label>
          
          {currentRoom.hasEntryDoor && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <select
                    value={currentRoom.doorWidth}
                    onChange={(e) => updateRoom(currentRoom.id, 'doorWidth', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="28">28 inches</option>
                    <option value="30">30 inches</option>
                    <option value="32">32 inches (ADA)</option>
                    <option value="36">36 inches</option>
                    <option value="custom">Custom</option>
                  </select>
                  {currentRoom.type === 'bedroom' && parseInt(currentRoom.doorWidth) < 32 && (
                    <p className="text-xs text-yellow-600 mt-1">Note: ADA requires 32" minimum</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <select
                    value={currentRoom.doorHeight}
                    onChange={(e) => updateRoom(currentRoom.id, 'doorHeight', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="80">80 inches</option>
                    <option value="84">84 inches</option>
                    <option value="90">90 inches</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              
              {(currentRoom.doorWidth === 'custom' || currentRoom.doorHeight === 'custom') && (
                <div className="grid grid-cols-2 gap-3">
                  {currentRoom.doorWidth === 'custom' && (
                    <input
                      type="text"
                      placeholder="Custom width (inches)"
                      value={currentRoom.doorCustomWidth}
                      onChange={(e) => updateRoom(currentRoom.id, 'doorCustomWidth', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  )}
                  {currentRoom.doorHeight === 'custom' && (
                    <input
                      type="text"
                      placeholder="Custom height (inches)"
                      value={currentRoom.doorCustomHeight}
                      onChange={(e) => updateRoom(currentRoom.id, 'doorCustomHeight', e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  )}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={currentRoom.doorCondition}
                  onChange={(e) => updateRoom(currentRoom.id, 'doorCondition', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {CONDITIONS.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.doorLockWorking}
                    onChange={(e) => updateRoom(currentRoom.id, 'doorLockWorking', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Lock working</span>
                </label>
                
                {currentRoom.type === 'bedroom' && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.doorDeadbolt}
                      onChange={(e) => updateRoom(currentRoom.id, 'doorDeadbolt', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Deadbolt present (Required for entry doors)</span>
                  </label>
                )}
              </div>
              
              {renderWorkOrderSection(currentRoom, 'door')}
            </div>
          )}
        </div>
        
        {/* Windows */}
        {!['stairway', 'hallway'].includes(currentRoom.type) && (
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Windows (NSPIRE Required)</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Windows</label>
                <input
                  type="number"
                  min="0"
                  value={currentRoom.windowCount}
                  onChange={(e) => updateRoom(currentRoom.id, 'windowCount', parseInt(e.target.value) || 0)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              {currentRoom.windowCount > 0 && (
                <>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentRoom.windowsOperable}
                        onChange={(e) => updateRoom(currentRoom.id, 'windowsOperable', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">All windows operable</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentRoom.windowsLocks}
                        onChange={(e) => updateRoom(currentRoom.id, 'windowsLocks', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm">All locks functioning (Required for accessible windows)</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overall Condition</label>
                    <select
                      value={currentRoom.windowsCondition}
                      onChange={(e) => updateRoom(currentRoom.id, 'windowsCondition', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {CONDITIONS.map(cond => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                  </div>
                  
                  {(!currentRoom.windowsOperable || !currentRoom.windowsLocks) && (
                    <div className="bg-yellow-50 border border-yellow-300 p-2 rounded text-sm text-yellow-800">
                      ⚠️ NSPIRE: All windows must be operable with functioning locks
                    </div>
                  )}
                  
                  {renderWorkOrderSection(currentRoom, 'windows')}
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Storage */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">Storage</h4>
          
          <div className="space-y-4">
            {/* Closets */}
            <div>
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={currentRoom.hasClosets}
                  onChange={(e) => updateRoom(currentRoom.id, 'hasClosets', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm font-medium">Has Closets</span>
              </label>
              
              {currentRoom.hasClosets && (
                <div className="ml-6 space-y-2">
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of closets"
                    value={currentRoom.closetCount}
                    onChange={(e) => updateRoom(currentRoom.id, 'closetCount', parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded"
                  />
                  
                  <select
                    value={currentRoom.closetDoorsCondition}
                    onChange={(e) => updateRoom(currentRoom.id, 'closetDoorsCondition', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Closet Doors Condition...</option>
                    {CONDITIONS.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                  
                  {(currentRoom.closetDoorsCondition === 'Fair' || currentRoom.closetDoorsCondition === 'Poor') && 
                    renderWorkOrderSection(currentRoom, 'closetDoors')}
                </div>
              )}
            </div>
            
            {/* Cupboards */}
            {['kitchen', 'bathroom', 'laundryRoom'].includes(currentRoom.type) && (
              <div>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.hasCupboards}
                    onChange={(e) => updateRoom(currentRoom.id, 'hasCupboards', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Has Cupboards</span>
                </label>
                
                {currentRoom.hasCupboards && (
                  <div className="ml-6 space-y-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Number of cupboards"
                      value={currentRoom.cupboardCount}
                      onChange={(e) => updateRoom(currentRoom.id, 'cupboardCount', parseInt(e.target.value) || 0)}
                      className="w-full p-2 border rounded"
                    />
                    
                    <select
                      value={currentRoom.cupboardCondition}
                      onChange={(e) => updateRoom(currentRoom.id, 'cupboardCondition', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Cupboard Condition...</option>
                      {CONDITIONS.map(cond => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                    
                    {(currentRoom.cupboardCondition === 'Fair' || currentRoom.cupboardCondition === 'Poor') && 
                      renderWorkOrderSection(currentRoom, 'cupboard')}
                  </div>
                )}
              </div>
            )}
            
            {/* Drawers */}
            {['kitchen', 'bathroom'].includes(currentRoom.type) && (
              <div>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.hasDrawers}
                    onChange={(e) => updateRoom(currentRoom.id, 'hasDrawers', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Has Drawers</span>
                </label>
                
                {currentRoom.hasDrawers && (
                  <div className="ml-6 space-y-2">
                    <input
                      type="number"
                      min="1"
                      placeholder="Number of drawers"
                      value={currentRoom.drawerCount}
                      onChange={(e) => updateRoom(currentRoom.id, 'drawerCount', parseInt(e.target.value) || 0)}
                      className="w-full p-2 border rounded"
                    />
                    
                    <select
                      value={currentRoom.drawerCondition}
                      onChange={(e) => updateRoom(currentRoom.id, 'drawerCondition', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Drawer Condition...</option>
                      {CONDITIONS.map(cond => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                    
                    {(currentRoom.drawerCondition === 'Fair' || currentRoom.drawerCondition === 'Poor') && 
                      renderWorkOrderSection(currentRoom, 'drawer')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Plumbing (Kitchen/Bathroom) */}
        {(['kitchen', 'bathroom'].includes(currentRoom.type)) && (
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Plumbing</h4>
            
            <div className="space-y-4">
              {/* Sink */}
              <div className="bg-gray-50 p-3 rounded">
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.hasSink}
                    onChange={(e) => updateRoom(currentRoom.id, 'hasSink', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Sink Present</span>
                </label>
                
                {currentRoom.hasSink && (
                  <div className="ml-6 space-y-2">
                    <select
                      value={currentRoom.sinkCondition}
                      onChange={(e) => updateRoom(currentRoom.id, 'sinkCondition', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Sink Condition...</option>
                      {CONDITIONS.map(cond => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentRoom.sinkDrainsSlowly}
                        onChange={(e) => updateRoom(currentRoom.id, 'sinkDrainsSlowly', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-xs">Drains slowly</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentRoom.sinkLeaks}
                        onChange={(e) => updateRoom(currentRoom.id, 'sinkLeaks', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-xs">Leaks present</span>
                    </label>
                    
                    {(currentRoom.sinkDrainsSlowly || currentRoom.sinkLeaks || currentRoom.sinkCondition === 'Fair' || currentRoom.sinkCondition === 'Poor') && 
                      renderWorkOrderSection(currentRoom, 'sink')}
                  </div>
                )}
              </div>
              
              {/* Faucet */}
              {currentRoom.hasSink && (
                <div className="bg-gray-50 p-3 rounded">
                  <h5 className="text-sm font-medium mb-2">Faucet</h5>
                  
                  <div className="space-y-2">
                    <select
                      value={currentRoom.faucetCondition}
                      onChange={(e) => updateRoom(currentRoom.id, 'faucetCondition', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Faucet Condition...</option>
                      {CONDITIONS.map(cond => (
                        <option key={cond} value={cond}>{cond}</option>
                      ))}
                    </select>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentRoom.faucetLeaks}
                        onChange={(e) => updateRoom(currentRoom.id, 'faucetLeaks', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-xs">Faucet leaks</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentRoom.faucetLowPressure}
                        onChange={(e) => updateRoom(currentRoom.id, 'faucetLowPressure', e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-xs">Low water pressure</span>
                    </label>
                    
                    {(currentRoom.faucetLeaks || currentRoom.faucetLowPressure || currentRoom.faucetCondition === 'Fair' || currentRoom.faucetCondition === 'Poor') && 
                      renderWorkOrderSection(currentRoom, 'faucet')}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Bathroom Fixtures */}
        {currentRoom.type === 'bathroom' && (
          <>
            {/* Toilet */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Toilet (NSPIRE Required)</h4>
              
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={currentRoom.hasToilet}
                  onChange={(e) => updateRoom(currentRoom.id, 'hasToilet', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Toilet Present</span>
              </label>
              
              {currentRoom.hasToilet && (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.toiletSecure}
                      onChange={(e) => updateRoom(currentRoom.id, 'toiletSecure', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs">Securely fastened to floor</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.toiletFlushes}
                      onChange={(e) => updateRoom(currentRoom.id, 'toiletFlushes', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs">Flushes properly</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.toiletLeaks}
                      onChange={(e) => updateRoom(currentRoom.id, 'toiletLeaks', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs">Leaks present</span>
                  </label>
                  
                  {(!currentRoom.toiletSecure || !currentRoom.toiletFlushes || currentRoom.toiletLeaks) && 
                    renderWorkOrderSection(currentRoom, 'toilet', false)}
                </div>
              )}
            </div>
            
            {/* Shower/Tub */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Shower/Tub</h4>
              
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={currentRoom.hasShowerTub}
                  onChange={(e) => updateRoom(currentRoom.id, 'hasShowerTub', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Shower/Tub Present</span>
              </label>
              
              {currentRoom.hasShowerTub && (
                <div className="space-y-2">
                  <select
                    value={currentRoom.showerTubType}
                    onChange={(e) => updateRoom(currentRoom.id, 'showerTubType', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Type...</option>
                    <option value="Shower">Shower Only</option>
                    <option value="Tub">Tub Only</option>
                    <option value="Combo">Shower/Tub Combo</option>
                  </select>
                  
                  <select
                    value={currentRoom.showerTubCondition}
                    onChange={(e) => updateRoom(currentRoom.id, 'showerTubCondition', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Condition...</option>
                    {CONDITIONS.map(cond => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.showerTubDrains}
                      onChange={(e) => updateRoom(currentRoom.id, 'showerTubDrains', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs">Drains properly</span>
                  </label>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.showerTubLeaks}
                      onChange={(e) => updateRoom(currentRoom.id, 'showerTubLeaks', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs">Leaks present</span>
                  </label>
                  
                  {(!currentRoom.showerTubDrains || currentRoom.showerTubLeaks || currentRoom.showerTubCondition === 'Fair' || currentRoom.showerTubCondition === 'Poor') && 
                    renderWorkOrderSection(currentRoom, 'showerTub')}
                </div>
              )}
            </div>
            
            {/* Ventilation */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Ventilation (NSPIRE Required)</h4>
              
              <label className="flex items-center space-x-2 mb-3">
                <input
                  type="checkbox"
                  checked={currentRoom.hasVentilation}
                  onChange={(e) => updateRoom(currentRoom.id, 'hasVentilation', e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Ventilation Present</span>
              </label>
              
              {!currentRoom.hasVentilation && (
                <div className="bg-red-100 border border-red-300 p-2 rounded text-sm text-red-800">
                  ⚠️ NSPIRE: Bathroom ventilation required (window or exhaust fan)
                </div>
              )}
              
              {currentRoom.hasVentilation && (
                <div className="space-y-2">
                  <select
                    value={currentRoom.ventilationType}
                    onChange={(e) => updateRoom(currentRoom.id, 'ventilationType', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Type...</option>
                    <option value="Window">Window</option>
                    <option value="Fan">Exhaust Fan</option>
                    <option value="Both">Window + Fan</option>
                  </select>
                  
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.ventilationWorks}
                      onChange={(e) => updateRoom(currentRoom.id, 'ventilationWorks', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-xs">Ventilation functioning</span>
                  </label>
                  
                  {!currentRoom.ventilationWorks && renderWorkOrderSection(currentRoom, 'ventilation', false)}
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Heating (Per Room) */}
        {['bedroom', 'bathroom', 'livingRoom', 'diningRoom'].includes(currentRoom.type) && (
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Heating</h4>
            
            <label className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                checked={currentRoom.hasHeater}
                onChange={(e) => updateRoom(currentRoom.id, 'hasHeater', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Room has heating source</span>
            </label>
            
            {currentRoom.hasHeater && (
              <div className="space-y-2">
                <select
                  value={currentRoom.heaterType}
                  onChange={(e) => updateRoom(currentRoom.id, 'heaterType', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Type...</option>
                  <option value="baseboard">Baseboard</option>
                  <option value="radiator">Radiator</option>
                  <option value="miniSplit">Mini Split</option>
                  <option value="vent">Heating Vent (Central)</option>
                </select>
                
                {['baseboard', 'radiator', 'miniSplit'].includes(currentRoom.heaterType) && (
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of units"
                    value={currentRoom.heaterCount}
                    onChange={(e) => updateRoom(currentRoom.id, 'heaterCount', parseInt(e.target.value) || 0)}
                    className="w-full p-2 border rounded"
                  />
                )}
                
                <select
                  value={currentRoom.heaterCondition}
                  onChange={(e) => updateRoom(currentRoom.id, 'heaterCondition', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Condition...</option>
                  {CONDITIONS.map(cond => (
                    <option key={cond} value={cond}>{cond}</option>
                  ))}
                </select>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.heaterWorks}
                    onChange={(e) => updateRoom(currentRoom.id, 'heaterWorks', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs">Heating functioning</span>
                </label>
                
                {(!currentRoom.heaterWorks || currentRoom.heaterCondition === 'Fair' || currentRoom.heaterCondition === 'Poor') && 
                  renderWorkOrderSection(currentRoom, 'heater')}
              </div>
            )}
          </div>
        )}
        
        {/* Thermostat */}
        {currentRoom.hasHeater && (
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Thermostat</h4>
            
            <label className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                checked={currentRoom.hasThermostat}
                onChange={(e) => updateRoom(currentRoom.id, 'hasThermostat', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Thermostat in room</span>
            </label>
            
            {currentRoom.hasThermostat && (
              <div className="space-y-2">
                <select
                  value={currentRoom.thermostatType}
                  onChange={(e) => updateRoom(currentRoom.id, 'thermostatType', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Type...</option>
                  <option value="manual">Manual</option>
                  <option value="programmable">Programmable</option>
                  <option value="smart">Smart Thermostat</option>
                </select>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentRoom.thermostatWorks}
                    onChange={(e) => updateRoom(currentRoom.id, 'thermostatWorks', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-xs">Thermostat functioning</span>
                </label>
                
                {!currentRoom.thermostatWorks && renderWorkOrderSection(currentRoom, 'thermostat', false)}
              </div>
            )}
          </div>
        )}
        
        {/* Stairway Railings */}
        {currentRoom.type === 'stairway' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-3 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Railing (NSPIRE Required for 3+ Rises)
            </h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Rises (steps)
                </label>
                <input
                  type="number"
                  min="1"
                  value={currentRoom.riseCount}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 0;
                    updateRoom(currentRoom.id, 'riseCount', count);
                    updateRoom(currentRoom.id, 'railingRequired', count >= 3);
                  }}
                  className="w-full p-2 border rounded"
                />
                <p className="text-xs text-gray-500 mt-1">
                  NSPIRE requires railings for 3 or more rises
                </p>
              </div>
              
              {currentRoom.riseCount >= 3 && (
                <>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={currentRoom.hasRailing}
                      onChange={(e) => updateRoom(currentRoom.id, 'hasRailing', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-semibold">Railing Present (REQUIRED)</span>
                  </label>
                  
                  {!currentRoom.hasRailing && (
                    <div className="bg-red-100 border border-red-300 p-2 rounded text-sm text-red-800">
                      ⚠️ NSPIRE VIOLATION: Railing required for stairs with {currentRoom.riseCount} rises
                    </div>
                  )}
                  
                  {currentRoom.hasRailing && (
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={currentRoom.railingBothSides}
                          onChange={(e) => updateRoom(currentRoom.id, 'railingBothSides', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-xs">Railings on both sides</span>
                      </label>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Railing Height (inches)
                        </label>
                        <input
                          type="text"
                          placeholder="34-38 inches from nosing"
                          value={currentRoom.railingHeight}
                          onChange={(e) => updateRoom(currentRoom.id, 'railingHeight', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          NSPIRE: 34-38 inches from stair nosing
                        </p>
                      </div>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={currentRoom.railingSecure}
                          onChange={(e) => updateRoom(currentRoom.id, 'railingSecure', e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-xs">Securely fastened</span>
                      </label>
                      
                      <select
                        value={currentRoom.railingCondition}
                        onChange={(e) => updateRoom(currentRoom.id, 'railingCondition', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Railing Condition...</option>
                        {CONDITIONS.map(cond => (
                          <option key={cond} value={cond}>{cond}</option>
                        ))}
                      </select>
                      
                      {(!currentRoom.railingSecure || currentRoom.railingCondition === 'Fair' || currentRoom.railingCondition === 'Poor') && 
                        renderWorkOrderSection(currentRoom, 'railing')}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Appliances */}
        {['kitchen', 'livingRoom', 'diningRoom', 'laundryRoom'].includes(currentRoom.type) && (
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center justify-between">
              <span>Appliances</span>
              <button
                onClick={() => {
                  const defaultType = currentRoom.type === 'kitchen' ? 'Refrigerator' : 'Other';
                  addAppliance(currentRoom.id, defaultType);
                }}
                className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Appliance</span>
              </button>
            </h4>
            
            {currentRoom.appliances.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                No appliances added yet. Click "Add Appliance" to begin.
              </p>
            )}
            
            <div className="space-y-4">
              {currentRoom.appliances.map((appliance, idx) => (
                <div key={appliance.id} className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-gray-700">Appliance {idx + 1}</h5>
                    <button
                      onClick={() => removeAppliance(currentRoom.id, appliance.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                        <select
                          value={appliance.type}
                          onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'type', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        >
                          {APPLIANCE_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Brand</label>
                        <input
                          type="text"
                          placeholder="e.g., GE, Whirlpool"
                          value={appliance.brand}
                          onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'brand', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Model Number</label>
                        <input
                          type="text"
                          placeholder="Model #"
                          value={appliance.model}
                          onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'model', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Serial Number</label>
                        <input
                          type="text"
                          placeholder="Serial #"
                          value={appliance.serial}
                          onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'serial', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Install Date</label>
                        <select
                          value={appliance.installDate}
                          onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'installDate', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        >
                          {INSTALL_DATE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                      
                      {appliance.installDate === 'Custom' && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Custom Date</label>
                          <input
                            type="month"
                            value={appliance.customInstallDate}
                            onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'customInstallDate', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                          />
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Condition</label>
                        <select
                          value={appliance.condition}
                          onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'condition', e.target.value)}
                          className="w-full p-2 border rounded text-sm"
                        >
                          {CONDITIONS.map(cond => (
                            <option key={cond} value={cond}>{cond}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Refrigerator Specific */}
                    {appliance.type === 'Refrigerator' && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h6 className="text-xs font-semibold text-blue-900 mb-2">Refrigerator Details</h6>
                        
                        <div className="space-y-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Temperature</label>
                            <select
                              value={appliance.properTemperature}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'properTemperature', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            >
                              <option value="Yes">Keeping Proper Temperature</option>
                              <option value="TooWarm">Too Warm</option>
                              <option value="TooCold">Too Cold</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Noise Level</label>
                            <select
                              value={appliance.excessiveNoise}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'excessiveNoise', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            >
                              <option value="No">Normal</option>
                              <option value="Slight">Slightly Noisy</option>
                              <option value="Loud">Excessively Loud</option>
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Broken Shelves</label>
                              <input
                                type="number"
                                min="0"
                                value={appliance.brokenShelvesCount}
                                onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'brokenShelvesCount', parseInt(e.target.value) || 0)}
                                className="w-full p-1 border rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Broken Seals</label>
                              <input
                                type="number"
                                min="0"
                                value={appliance.brokenSealsCount}
                                onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'brokenSealsCount', parseInt(e.target.value) || 0)}
                                className="w-full p-1 border rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Broken Drawers</label>
                              <input
                                type="number"
                                min="0"
                                value={appliance.brokenDrawersCount}
                                onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'brokenDrawersCount', parseInt(e.target.value) || 0)}
                                className="w-full p-1 border rounded text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">Broken Flip Doors</label>
                              <input
                                type="number"
                                min="0"
                                value={appliance.brokenFlipDoorsCount}
                                onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'brokenFlipDoorsCount', parseInt(e.target.value) || 0)}
                                className="w-full p-1 border rounded text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Stove/Range Specific */}
                    {appliance.type === 'Stove/Range' && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h6 className="text-xs font-semibold text-blue-900 mb-2">Stove/Range Details</h6>
                        
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.ovenWorks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'ovenWorks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Oven works</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.ovenTemperatureAccurate}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'ovenTemperatureAccurate', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Oven temperature accurate</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.knobsWork}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'knobsWork', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">All knobs function</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.allBurnersWork}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'allBurnersWork', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">All burners work</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.burnerTemperaturesCorrect}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'burnerTemperaturesCorrect', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Burner temperatures correct</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.gasLeaks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'gasLeaks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs text-red-600">Gas leaks detected (if gas stove)</span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {/* Range Hood Specific */}
                    {appliance.type === 'Range Hood' && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h6 className="text-xs font-semibold text-blue-900 mb-2">Range Hood Details</h6>
                        
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.lightWorks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'lightWorks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Light works</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.fanWorks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'fanWorks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Fan works</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.exhaustsOutside}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'exhaustsOutside', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Exhausts outside (not recirculating)</span>
                          </label>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Filter Condition</label>
                            <select
                              value={appliance.filterCondition}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'filterCondition', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            >
                              {CONDITIONS.map(cond => (
                                <option key={cond} value={cond}>{cond}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Water Heater Specific */}
                    {appliance.type === 'Water Heater' && (
                      <div className="bg-red-50 p-3 rounded">
                        <h6 className="text-xs font-semibold text-red-900 mb-2">Water Heater (NSPIRE Required Checks)</h6>
                        
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.hasTPRValve}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'hasTPRValve', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">TPR valve present (REQUIRED)</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.tprValveWorks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'tprValveWorks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">TPR valve functioning</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.hasDrainPan}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'hasDrainPan', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Drain pan present (if in living space)</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.properVenting}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'properVenting', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Proper venting (gas/oil)</span>
                          </label>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Water Temperature at Fixture (°F)</label>
                            <input
                              type="number"
                              max="120"
                              placeholder="Max 120°F"
                              value={appliance.waterTemperature}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'waterTemperature', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <p className="text-xs text-red-600 mt-1">NSPIRE: Maximum 120°F</p>
                          </div>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.leaks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'leaks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs text-red-600">Leaks present</span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {/* Washer/Dryer Specific */}
                    {appliance.type === 'Washer' && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h6 className="text-xs font-semibold text-blue-900 mb-2">Washer Details</h6>
                        
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.fillsCompletely}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'fillsCompletely', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Fills completely</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.drainsCompletely}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'drainsCompletely', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Drains completely</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.spinsCorrectly}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'spinsCorrectly', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Spins correctly</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.leaks}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'leaks', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs text-red-600">Leaks present</span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {appliance.type === 'Dryer' && (
                      <div className="bg-blue-50 p-3 rounded">
                        <h6 className="text-xs font-semibold text-blue-900 mb-2">Dryer Details</h6>
                        
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.heatsCorrectly}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'heatsCorrectly', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Heats correctly</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.ventedProperly}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'ventedProperly', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Vented properly (fire hazard if not)</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.lintTrapClean}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'lintTrapClean', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Lint trap clean</span>
                          </label>
                          
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={appliance.tumbles}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'tumbles', e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-xs">Tumbles correctly</span>
                          </label>
                        </div>
                      </div>
                    )}
                    
                    {/* Work Order Section for Appliance */}
                    {(appliance.condition === 'Fair' || appliance.condition === 'Poor') && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                        <label className="flex items-center space-x-2 mb-2">
                          <input
                            type="checkbox"
                            checked={appliance.workOrder}
                            onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'workOrder', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm font-semibold text-yellow-900">Create Work Order</span>
                        </label>
                        
                        <div className="space-y-2">
                          <select
                            value={appliance.needsAction}
                            onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'needsAction', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                          >
                            {ACTION_TYPES.map(action => (
                              <option key={action} value={action}>{action}</option>
                            ))}
                          </select>
                          
                          <textarea
                            placeholder="Notes about the issue..."
                            value={appliance.notes}
                            onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'notes', e.target.value)}
                            className="w-full p-2 text-sm border rounded"
                            rows="2"
                          />
                          
                          {renderPhotoSection(currentRoom, 'appliancePhotos', 'Evidence Photos', appliance.id)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* General Comments & Photos */}
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3">General Comments & Photos</h4>
          
          <textarea
            value={currentRoom.generalComments}
            onChange={(e) => updateRoom(currentRoom.id, 'generalComments', e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Any additional observations or notes for this room..."
          />
          
          {renderPhotoSection(currentRoom, 'generalPhotos', 'General Room Photos')}
        </div>
        
        {/* Room Navigation */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentRoomIndex(Math.max(0, currentRoomIndex - 1))}
            disabled={currentRoomIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300 hover:bg-gray-600"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Room</span>
          </button>
          
          <span className="text-sm text-gray-600">
            Room {currentRoomIndex + 1} of {rooms.length}
          </span>
          
          {currentRoomIndex < rooms.length - 1 ? (
            <button
              onClick={() => setCurrentRoomIndex(currentRoomIndex + 1)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <span>Next Room</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={goToNextStep}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <span>Complete Inspection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderStep4 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Room-by-Room Inspection</h2>
      
      {rooms.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No rooms configured yet.</p>
          <button
            onClick={initializeRooms}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Initialize Rooms
          </button>
        </div>
      ) : (
        renderRoomInspection(rooms[currentRoomIndex])
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Report</h2>
      
      <div className="space-y-6">
        {/* Inspection Summary */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Inspection Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-700"><span className="font-medium">Property:</span> {inspectionData.propertyName}</p>
              <p className="text-gray-700"><span className="font-medium">Unit:</span> {inspectionData.unitNumber}</p>
              <p className="text-gray-700"><span className="font-medium">Tenant:</span> {inspectionData.tenantFirstName} {inspectionData.tenantLastName}</p>
            </div>
            <div>
              <p className="text-gray-700"><span className="font-medium">Inspector:</span> {inspectionData.inspectorName}</p>
              <p className="text-gray-700"><span className="font-medium">Date:</span> {inspectionData.inspectionDate}</p>
              <p className="text-gray-700"><span className="font-medium">Type:</span> {inspectionData.inspectionType}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-gray-700"><span className="font-medium">Programs:</span> {inspectionData.programType.join(', ')}</p>
          </div>
        </div>
        
        {/* Rooms Inspected */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Rooms Inspected</h3>
          <div className="grid grid-cols-3 gap-2">
            {rooms.map(room => (
              <div key={room.id} className="bg-gray-100 p-2 rounded text-sm">
                <CheckCircle className="w-4 h-4 inline mr-1 text-green-500" />
                {room.name}
              </div>
            ))}
          </div>
        </div>
        
        {/* Work Orders Summary */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Work Orders Required</h3>
          <div className="bg-yellow-50 p-3 rounded">
            {(() => {
              let workOrderCount = 0;
              rooms.forEach(room => {
                Object.keys(room).forEach(key => {
                  if (key.endsWith('WorkOrder') && room[key]) {
                    workOrderCount++;
                  }
                });
                room.appliances?.forEach(app => {
                  if (app.workOrder) workOrderCount++;
                });
              });
              
              return workOrderCount > 0 ? (
                <p className="text-yellow-900 font-medium">{workOrderCount} work order(s) flagged</p>
              ) : (
                <p className="text-green-700 font-medium">No work orders required</p>
              );
            })()}
          </div>
        </div>
        
        {/* NSPIRE Compliance Statement */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={inspectionData.complianceStatement}
              onChange={(e) => updateInspectionData('complianceStatement', e.target.checked)}
              className="mt-1 rounded"
            />
            <div>
              <span className="font-semibold text-green-900">NSPIRE Compliance Declaration</span>
              <p className="text-sm text-green-800 mt-1">
                I certify that this inspection was conducted in accordance with HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE) and all applicable federal regulations for {inspectionData.programType.join(', ')} programs.
              </p>
            </div>
          </label>
        </div>
        
        {/* Report Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Report Notes</label>
          <textarea
            value={inspectionData.reportNotes}
            onChange={(e) => updateInspectionData('reportNotes', e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Any additional notes or observations for the final report..."
          />
        </div>
        
        {/* Generated Filename Preview */}
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Report Filename:</span> {generateFilename()}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={generateReport}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            <Eye className="w-5 h-5" />
            <span>Preview & Print to PDF</span>
          </button>
          
          <button
            onClick={emailReport}
            className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            <Mail className="w-5 h-5" />
            <span>Email Report</span>
          </button>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="bg-gray-100 p-4 rounded text-xs text-gray-600">
          <p className="font-semibold mb-2">Legal Disclaimer:</p>
          <p>
            This inspection report is generated as a tool to assist in compliance with federal housing regulations. 
            Property owners and managers are solely responsible for ensuring full compliance with all applicable 
            federal, state, and local regulations including but not limited to: HUD regulations, HOME program requirements, 
            LIHTC compliance, USDA Rural Development standards, Fair Housing Act, Section 504 accessibility requirements, 
            and all applicable landlord-tenant laws. This report does not constitute legal advice. Consult with 
            qualified legal counsel and compliance professionals for interpretation and application of regulations.
          </p>
        </div>
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold mb-2">NSPIRE-Compliant Rental Unit Inspection</h1>
          <p className="text-blue-100">
            HUD | HOME | LIHTC | USDA Rural Development | Federal Compliance
          </p>
        </div>
        
        {renderProgressBar()}
        
        <div className="mb-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>
        
        {/* Navigation Buttons */}
        {currentStep !== 4 && currentStep !== 5 && (
          <div className="flex justify-between">
            <button
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={goToNextStep}
              disabled={currentStep === 5}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalInspectionApp;
