// Get React hooks from global React object
const { useState, useRef } = React;

// Get Lucide icons from global lucide object
const { Camera, Upload, X, CheckCircle, AlertCircle, Download, Mail, ChevronLeft, ChevronRight, Plus, Trash2, Home, Clipboard, Settings, FileText, Eye, ArrowLeft } = lucide;

// React hooks from global React
// Lucide icons from global lucide object

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
  // Embedded Logo for Report Header
  const LOGO_BASE64 = "data:image/webp;base64,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";
  
  // ==================== STATE MANAGEMENT ====================
  
  const [currentStep, setCurrentStep] = useState(1);
  const [inspectionData, setInspectionData] = useState({
    // Step 1: Property & Tenant Information
    propertyName: 'P56100',
    propertyNameCustom: '',
    propertyAddress: '502 South 5th Street',
    propertyAddressCustom: '',
    unitNumber: '',
    tenantFirstName: '',
    tenantLastName: '',
    tenantInitial: '',
    inspectorName: 'Ellie McNelley',
    inspectorNameCustom: '',
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
      temperature: 'Maximum 120Â°F at fixtures',
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
      waterTemperature: '120', // Max 120Â°F per NSPIRE
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
    const propertyName = inspectionData.propertyName === 'Custom' ? 
      inspectionData.propertyNameCustom : inspectionData.propertyName;
    const propertyAddress = inspectionData.propertyAddress === 'Custom' ? 
      inspectionData.propertyAddressCustom : inspectionData.propertyAddress;
    const inspectorName = inspectionData.inspectorName === 'Custom' ? 
      inspectionData.inspectorNameCustom : inspectionData.inspectorName;
    
    // Create printable report with embedded logo
    const reportWindow = window.open('', '_blank');
    reportWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${generateFilename()}</title>
        <style>
          @page {
            margin: 0.5in;
            size: letter;
          }
          
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            .page-break {
              page-break-before: always;
            }
            .no-print {
              display: none !important;
            }
          }
          
          body {
            font-family: Arial, sans-serif;
            line-height: 1.4;
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 20px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 20px;
          }
          
          .header img {
            max-width: 100%;
            height: auto;
            margin-bottom: 15px;
          }
          
          .header h1 {
            color: #1e40af;
            margin: 10px 0;
            font-size: 24px;
          }
          
          .header .subtitle {
            color: #666;
            font-size: 14px;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 11px;
          }
          
          table, th, td {
            border: 1px solid #ddd;
          }
          
          th {
            background-color: #1e40af;
            color: white;
            padding: 8px;
            text-align: left;
            font-weight: bold;
          }
          
          td {
            padding: 6px 8px;
            vertical-align: top;
          }
          
          .section-title {
            background-color: #3b82f6;
            color: white;
            padding: 10px;
            margin-top: 25px;
            margin-bottom: 15px;
            font-size: 16px;
            font-weight: bold;
          }
          
          .subsection-title {
            background-color: #93c5fd;
            color: #1e40af;
            padding: 8px;
            margin-top: 15px;
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: bold;
          }
          
          .photo-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin: 15px 0;
            page-break-inside: avoid;
          }
          
          .photo-item {
            text-align: center;
            page-break-inside: avoid;
          }
          
          .photo-item img {
            max-width: 100%;
            height: 150px;
            width: auto;
            object-fit: contain;
            border: 1px solid #ddd;
            background: #f9fafb;
          }
          
          .photo-caption {
            font-size: 9px;
            color: #666;
            margin-top: 5px;
            word-wrap: break-word;
          }
          
          .alert {
            padding: 10px;
            margin: 10px 0;
            border-left: 4px solid;
          }
          
          .alert-warning {
            background-color: #fef3c7;
            border-color: #f59e0b;
            color: #92400e;
          }
          
          .alert-danger {
            background-color: #fee2e2;
            border-color: #ef4444;
            color: #991b1b;
          }
          
          .alert-success {
            background-color: #d1fae5;
            border-color: #10b981;
            color: #065f46;
          }
          
          .work-order-badge {
            background-color: #fbbf24;
            color: #78350f;
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
            display: inline-block;
          }
          
          .signature-box {
            border: 1px solid #ddd;
            padding: 30px 10px 10px 10px;
            margin: 20px 0;
            min-height: 60px;
          }
          
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #ddd;
            font-size: 9px;
            color: #666;
            text-align: center;
          }
          
          .print-button {
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 20px;
            background: #1e40af;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
            font-size: 14px;
            font-weight: bold;
          }
          
          .print-button:hover {
            background: #1e3a8a;
          }
        </style>
      </head>
      <body>
        <button onclick="window.print()" class="no-print print-button">
          🖨️ Print to PDF
        </button>
        
        <div class="header">
          <img src="${LOGO_BASE64}" alt="Header Logo">
          <h1>NSPIRE-COMPLIANT RENTAL UNIT INSPECTION REPORT</h1>
          <div class="subtitle">HUD | HOME | LIHTC | USDA Rural Development | Federal Compliance</div>
        </div>
        
        <div class="section-title">PROPERTY & TENANT INFORMATION</div>
        <table>
          <tr><th>Property Name</th><td>${propertyName}</td><th>Unit Number</th><td>${inspectionData.unitNumber}</td></tr>
          <tr><th>Property Address</th><td colspan="3">${propertyAddress}</td></tr>
          <tr><th>Tenant Name</th><td>${inspectionData.tenantFirstName} ${inspectionData.tenantLastName}</td><th>Tenant Initial</th><td>${inspectionData.tenantInitial}</td></tr>
          <tr><th>Inspector Name</th><td>${inspectorName}</td><th>Inspection Date</th><td>${inspectionData.inspectionDate}</td></tr>
          <tr><th>Inspection Type</th><td>${inspectionData.inspectionType}</td><th>Program Types</th><td>${inspectionData.programType.join(', ')}</td></tr>
        </table>
        
        <div class="section-title">UNIT CONFIGURATION</div>
        <table>
          <tr><th>Bedrooms</th><td>${inspectionData.bedrooms}</td><th>Bathrooms</th><td>${inspectionData.bathrooms}</td></tr>
          <tr><th>Kitchen</th><td>${inspectionData.hasKitchen ? 'Yes' : 'No'}</td><th>Living Room</th><td>${inspectionData.hasLivingRoom ? 'Yes' : 'No'}</td></tr>
          <tr><th>Dining Room</th><td>${inspectionData.hasDiningRoom ? 'Yes' : 'No'}</td><th>Laundry Room</th><td>${inspectionData.hasLaundryRoom ? 'Yes' : 'No'}</td></tr>
          <tr><th>Hallways</th><td>${inspectionData.hallways}</td><th>Stairways</th><td>${inspectionData.stairways}</td></tr>
          <tr><th>Deck/Patio</th><td>${inspectionData.hasDeckPatio ? 'Yes' : 'No'}</td><th>Yard</th><td>${inspectionData.hasYard ? 'Yes' : 'No'}</td></tr>
        </table>
        
        <div class="section-title">GLOBAL SYSTEMS</div>
        <table>
          <tr><th>Heating Type</th><td>${inspectionData.heatingType || 'N/A'}</td><th>Heating Fuel</th><td>${inspectionData.heatingFuel || 'N/A'}</td></tr>
          <tr><th>Cooling Type</th><td colspan="3">${inspectionData.coolingType || 'N/A'}</td></tr>
          <tr><th>Water Heater</th><td>${inspectionData.hasWaterHeater ? 'Yes' : 'No'}</td><th>Location</th><td colspan="2">${inspectionData.waterHeaterLocation || 'N/A'}</td></tr>
          ${inspectionData.hasWaterHeater ? `<tr><th>WH Install Date</th><td colspan="3">${inspectionData.waterHeaterInstallDate}${inspectionData.waterHeaterInstallDate === 'Custom' ? ' (' + inspectionData.waterHeaterCustomDate + ')' : ''}</td></tr>` : ''}
          <tr><th>Washer</th><td>${inspectionData.hasWasher ? 'Yes' : 'No'}</td><th>Dryer</th><td>${inspectionData.hasDryer ? 'Yes' : 'No'}</td></tr>
          ${(inspectionData.hasWasher || inspectionData.hasDryer) && inspectionData.laundryLocation ? `<tr><th>Laundry Location</th><td colspan="3">${inspectionData.laundryLocation}</td></tr>` : ''}
        </table>
        
        ${rooms.map((room, idx) => `
          <div class="page-break"></div>
          <div class="section-title">ROOM ${idx + 1}: ${room.name.toUpperCase()}</div>
          
          <div class="subsection-title">Housekeeping (NSPIRE Required)</div>
          <table>
            <tr><th>Acceptable</th><td colspan="3">${room.housekeepingAcceptable ? 'Yes' : '<span style="color: red; font-weight: bold;">NO</span>'}</td></tr>
            ${room.housekeepingNotes ? `<tr><th>Notes</th><td colspan="3">${room.housekeepingNotes}</td></tr>` : ''}
          </table>
          
          ${(['bedroom', 'hallway'].includes(room.type)) ? `
            <div class="subsection-title">Safety Devices (NSPIRE REQUIRED)</div>
            <table>
              <tr><th colspan="4" style="background-color: #fecaca;">Smoke Alarm</th></tr>
              <tr><th>Smoke Alarm Present</th><td colspan="3">${room.hasSmokeAlarm ? 'Yes' : '<span style="color: red; font-weight: bold;">NO - NSPIRE VIOLATION</span>'}</td></tr>
              ${room.hasSmokeAlarm ? `
                <tr><th>Type</th><td>${room.smokeAlarmType || 'N/A'}</td><th>Status</th><td>${room.smokeAlarmStatus}</td></tr>
                ${room.smokeAlarmNotes ? `<tr><th>Notes</th><td colspan="3">${room.smokeAlarmNotes}</td></tr>` : ''}
                ${room.smokeAlarmWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">WORK ORDER REQUIRED</span></td></tr>' : ''}
              ` : ''}
              ${inspectionData.heatingFuel && inspectionData.heatingFuel !== 'electric' ? `
                <tr><th colspan="4" style="background-color: #fecaca;">CO2 Alarm (Required with Fuel-Burning Heat)</th></tr>
                <tr><th>CO2 Alarm Present</th><td colspan="3">${room.hasCO2Alarm ? 'Yes' : '<span style="color: red; font-weight: bold;">NO - NSPIRE VIOLATION</span>'}</td></tr>
                ${room.hasCO2Alarm ? `
                  <tr><th>Status</th><td colspan="3">${room.co2AlarmStatus}</td></tr>
                  ${room.co2AlarmNotes ? `<tr><th>Notes</th><td colspan="3">${room.co2AlarmNotes}</td></tr>` : ''}
                  ${room.co2AlarmWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">WORK ORDER REQUIRED</span></td></tr>' : ''}
                ` : ''}
              ` : ''}
            </table>
            ${room.smokeAlarmPhotos && room.smokeAlarmPhotos.length > 0 ? `
              <p style="font-weight: bold; margin: 10px 0 5px 0;">Smoke Alarm Photos:</p>
              <div class="photo-grid">
                ${room.smokeAlarmPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Smoke Alarm">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
              ${summarizeComments(room.smokeAlarmPhotos) ? `<p style="font-size: 10px; color: #666;"><strong>Summary:</strong> ${summarizeComments(room.smokeAlarmPhotos)}</p>` : ''}
            ` : ''}
            ${room.co2AlarmPhotos && room.co2AlarmPhotos.length > 0 ? `
              <p style="font-weight: bold; margin: 10px 0 5px 0;">CO2 Alarm Photos:</p>
              <div class="photo-grid">
                ${room.co2AlarmPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="CO2 Alarm">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
              ${summarizeComments(room.co2AlarmPhotos) ? `<p style="font-size: 10px; color: #666;"><strong>Summary:</strong> ${summarizeComments(room.co2AlarmPhotos)}</p>` : ''}
            ` : ''}
          ` : ''}
          
          <div class="subsection-title">Flooring (NSPIRE Required)</div>
          <table>
            <tr><th>Type</th><td>${room.flooringType || 'N/A'}</td><th>Condition</th><td>${room.flooringCondition}</td></tr>
            <tr><th>Install Date</th><td>${room.flooringInstallDate}${room.flooringInstallDate === 'Custom' ? ' (' + room.flooringCustomDate + ')' : ''}</td><th>Action Needed</th><td>${room.flooringNeedsAction}</td></tr>
            ${room.flooringNotes ? `<tr><th>Notes</th><td colspan="3">${room.flooringNotes}</td></tr>` : ''}
            ${room.flooringWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">WORK ORDER REQUIRED</span></td></tr>' : ''}
          </table>
          ${room.flooringPhotos && room.flooringPhotos.length > 0 ? `
            <p style="font-weight: bold; margin: 10px 0 5px 0;">Flooring Photos:</p>
            <div class="photo-grid">
              ${room.flooringPhotos.map(photo => `
                <div class="photo-item">
                  <img src="${photo.data}" alt="Flooring">
                  <div class="photo-caption">${photo.comment || photo.filename}</div>
                </div>
              `).join('')}
            </div>
            ${summarizeComments(room.flooringPhotos) ? `<p style="font-size: 10px; color: #666;"><strong>Summary:</strong> ${summarizeComments(room.flooringPhotos)}</p>` : ''}
          ` : ''}
          
          <div class="subsection-title">Walls, Ceiling & Paint</div>
          <table>
            <tr><th>Walls Condition</th><td>${room.wallsCondition}</td><th>Action</th><td>${room.wallsNeedsAction}</td></tr>
            ${room.wallsNotes ? `<tr><th>Walls Notes</th><td colspan="3">${room.wallsNotes}</td></tr>` : ''}
            ${room.wallsWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">WALLS - WORK ORDER</span></td></tr>' : ''}
            <tr><th>Ceiling Condition</th><td>${room.ceilingCondition}</td><th>Action</th><td>${room.ceilingNeedsAction}</td></tr>
            ${room.ceilingNotes ? `<tr><th>Ceiling Notes</th><td colspan="3">${room.ceilingNotes}</td></tr>` : ''}
            ${room.ceilingWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">CEILING - WORK ORDER</span></td></tr>' : ''}
            <tr><th>Paint Condition</th><td>${room.paintCondition}</td><th>Defective Paint</th><td>${room.paintDefectivePaint ? '<span style="color: red; font-weight: bold;">YES - Lead Concern</span>' : 'No'}</td></tr>
            ${room.paintNotes ? `<tr><th>Paint Notes</th><td colspan="3">${room.paintNotes}</td></tr>` : ''}
            ${room.paintWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">PAINT - WORK ORDER</span></td></tr>' : ''}
          </table>
          ${room.wallsPhotos && room.wallsPhotos.length > 0 ? `
            <p style="font-weight: bold; margin: 10px 0 5px 0;">Walls Photos:</p>
            <div class="photo-grid">
              ${room.wallsPhotos.map(photo => `
                <div class="photo-item">
                  <img src="${photo.data}" alt="Walls">
                  <div class="photo-caption">${photo.comment || photo.filename}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${room.ceilingPhotos && room.ceilingPhotos.length > 0 ? `
            <p style="font-weight: bold; margin: 10px 0 5px 0;">Ceiling Photos:</p>
            <div class="photo-grid">
              ${room.ceilingPhotos.map(photo => `
                <div class="photo-item">
                  <img src="${photo.data}" alt="Ceiling">
                  <div class="photo-caption">${photo.comment || photo.filename}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${room.paintPhotos && room.paintPhotos.length > 0 ? `
            <p style="font-weight: bold; margin: 10px 0 5px 0;">Paint Photos:</p>
            <div class="photo-grid">
              ${room.paintPhotos.map(photo => `
                <div class="photo-item">
                  <img src="${photo.data}" alt="Paint">
                  <div class="photo-caption">${photo.comment || photo.filename}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          ${room.hasBullNose ? `
            <div class="subsection-title">Bull Nose Trim</div>
            <table>
              <tr><th>Condition</th><td>${room.bullNoseCondition}</td><th>Location</th><td>${room.bullNoseLocation || 'N/A'}</td></tr>
              ${room.bullNoseNotes ? `<tr><th>Notes</th><td colspan="3">${room.bullNoseNotes}</td></tr>` : ''}
              ${room.bullNoseWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">WORK ORDER REQUIRED</span></td></tr>' : ''}
            </table>
            ${room.bullNosePhotos && room.bullNosePhotos.length > 0 ? `
              <div class="photo-grid">
                ${room.bullNosePhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Bull Nose">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          <div class="subsection-title">Electrical Outlets (NSPIRE Required)</div>
          <table>
            <tr><th>Outlet Count</th><td colspan="3">${room.outletCount}</td></tr>
            <tr><th>Loose Outlets</th><td>${room.outletsLoose ? 'Yes' : 'No'}</td><th>Non-Functional</th><td>${room.outletsNonFunctional ? 'Yes' : 'No'}</td></tr>
            ${room.outletsLoose && room.outletsLooseNotes ? `<tr><th>Loose Details</th><td colspan="3">${room.outletsLooseNotes}</td></tr>` : ''}
            ${room.outletsNonFunctional && room.outletsNonFunctionalNotes ? `<tr><th>Non-Functional Details</th><td colspan="3">${room.outletsNonFunctionalNotes}</td></tr>` : ''}
            ${room.outletsLooseWorkOrder || room.outletsNonFunctionalWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">OUTLETS - WORK ORDER</span></td></tr>' : ''}
          </table>
          
          ${(['kitchen', 'bathroom'].includes(room.type)) ? `
            <div class="subsection-title">GFI Protection (NSPIRE REQUIRED)</div>
            <table>
              <tr><th>GFI Present</th><td colspan="3">${room.hasGFI ? 'Yes' : '<span style="color: red; font-weight: bold;">NO - NSPIRE VIOLATION</span>'}</td></tr>
              ${room.hasGFI ? `
                <tr><th>Status</th><td colspan="3">${room.gfiStatus}</td></tr>
                ${room.gfiNotes ? `<tr><th>Notes</th><td colspan="3">${room.gfiNotes}</td></tr>` : ''}
                ${room.gfiWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">GFI - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
            </table>
            ${room.gfiPhotos && room.gfiPhotos.length > 0 ? `
              <div class="photo-grid">
                ${room.gfiPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="GFI">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          ${room.hasEntryDoor ? `
            <div class="subsection-title">Entry Door</div>
            <table>
              <tr><th>Width</th><td>${room.doorWidth}"${room.doorWidth === 'custom' ? ' (' + room.doorCustomWidth + ')' : ''}</td><th>Height</th><td>${room.doorHeight}"${room.doorHeight === 'custom' ? ' (' + room.doorCustomHeight + ')' : ''}</td></tr>
              <tr><th>Condition</th><td>${room.doorCondition}</td><th>Action</th><td>${room.doorNeedsAction}</td></tr>
              <tr><th>Lock Working</th><td>${room.doorLockWorking ? 'Yes' : 'No'}</td><th>Deadbolt</th><td>${room.doorDeadbolt ? 'Yes' : 'No'}</td></tr>
              ${room.doorNotes ? `<tr><th>Notes</th><td colspan="3">${room.doorNotes}</td></tr>` : ''}
              ${room.doorWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">DOOR - WORK ORDER</span></td></tr>' : ''}
            </table>
            ${room.doorPhotos && room.doorPhotos.length > 0 ? `
              <div class="photo-grid">
                ${room.doorPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Door">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          ${room.windowCount > 0 ? `
            <div class="subsection-title">Windows</div>
            <table>
              <tr><th>Count</th><td>${room.windowCount}</td><th>Condition</th><td>${room.windowsCondition}</td></tr>
              <tr><th>Operable</th><td>${room.windowsOperable ? 'Yes' : 'No'}</td><th>Locks Working</th><td>${room.windowsLocks ? 'Yes' : 'No'}</td></tr>
              ${room.windowsNotes ? `<tr><th>Notes</th><td colspan="3">${room.windowsNotes}</td></tr>` : ''}
              ${room.windowsWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">WINDOWS - WORK ORDER</span></td></tr>' : ''}
            </table>
            ${room.windowsPhotos && room.windowsPhotos.length > 0 ? `
              <div class="photo-grid">
                ${room.windowsPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Windows">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          ${(room.hasClosets || room.hasCupboards || room.hasDrawers) ? `
            <div class="subsection-title">Storage</div>
            <table>
              ${room.hasClosets ? `
                <tr><th>Closets</th><td>${room.closetCount}</td><th>Condition</th><td>${room.closetDoorsCondition}</td></tr>
                ${room.closetDoorsNotes ? `<tr><th>Closet Notes</th><td colspan="3">${room.closetDoorsNotes}</td></tr>` : ''}
                ${room.closetDoorsWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">CLOSETS - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
              ${room.hasCupboards ? `
                <tr><th>Cupboards</th><td>${room.cupboardCount}</td><th>Condition</th><td>${room.cupboardCondition}</td></tr>
                ${room.cupboardNotes ? `<tr><th>Cupboard Notes</th><td colspan="3">${room.cupboardNotes}</td></tr>` : ''}
                ${room.cupboardWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">CUPBOARDS - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
              ${room.hasDrawers ? `
                <tr><th>Drawers</th><td>${room.drawerCount}</td><th>Condition</th><td>${room.drawerCondition}</td></tr>
                ${room.drawerNotes ? `<tr><th>Drawer Notes</th><td colspan="3">${room.drawerNotes}</td></tr>` : ''}
                ${room.drawerWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">DRAWERS - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
            </table>
          ` : ''}
          
          ${(['kitchen', 'bathroom'].includes(room.type) && room.hasSink) ? `
            <div class="subsection-title">Plumbing</div>
            <table>
              <tr><th colspan="4" style="background-color: #e0f2fe;">Sink</th></tr>
              <tr><th>Sink Condition</th><td>${room.sinkCondition}</td><th>Drains Slowly</th><td>${room.sinkDrainsSlowly ? 'Yes' : 'No'}</td></tr>
              <tr><th>Sink Leaks</th><td>${room.sinkLeaks ? 'Yes' : 'No'}</td><th>Action</th><td>${room.sinkWorkOrder ? 'WORK ORDER' : 'None'}</td></tr>
              ${room.sinkNotes ? `<tr><th>Sink Notes</th><td colspan="3">${room.sinkNotes}</td></tr>` : ''}
              <tr><th colspan="4" style="background-color: #e0f2fe;">Faucet</th></tr>
              <tr><th>Faucet Condition</th><td>${room.faucetCondition}</td><th>Leaks</th><td>${room.faucetLeaks ? 'Yes' : 'No'}</td></tr>
              <tr><th>Low Pressure</th><td>${room.faucetLowPressure ? 'Yes' : 'No'}</td><th>Action</th><td>${room.faucetWorkOrder ? 'WORK ORDER' : 'None'}</td></tr>
              ${room.faucetNotes ? `<tr><th>Faucet Notes</th><td colspan="3">${room.faucetNotes}</td></tr>` : ''}
            </table>
            ${room.sinkPhotos && room.sinkPhotos.length > 0 ? `
              <p style="font-weight: bold; margin: 10px 0 5px 0;">Sink Photos:</p>
              <div class="photo-grid">
                ${room.sinkPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Sink">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
            ${room.faucetPhotos && room.faucetPhotos.length > 0 ? `
              <p style="font-weight: bold; margin: 10px 0 5px 0;">Faucet Photos:</p>
              <div class="photo-grid">
                ${room.faucetPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Faucet">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          ${room.type === 'bathroom' ? `
            ${room.hasToilet || room.hasShowerTub || room.hasVentilation ? `
              <div class="subsection-title">Bathroom Fixtures</div>
              <table>
                ${room.hasToilet ? `
                  <tr><th colspan="4" style="background-color: #e0f2fe;">Toilet</th></tr>
                  <tr><th>Secure</th><td>${room.toiletSecure ? 'Yes' : 'No'}</td><th>Flushes</th><td>${room.toiletFlushes ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Leaks</th><td>${room.toiletLeaks ? 'Yes' : 'No'}</td><th>Action</th><td>${room.toiletWorkOrder ? 'WORK ORDER' : 'None'}</td></tr>
                  ${room.toiletNotes ? `<tr><th>Notes</th><td colspan="3">${room.toiletNotes}</td></tr>` : ''}
                ` : ''}
                ${room.hasShowerTub ? `
                  <tr><th colspan="4" style="background-color: #e0f2fe;">Shower/Tub</th></tr>
                  <tr><th>Type</th><td>${room.showerTubType || 'N/A'}</td><th>Condition</th><td>${room.showerTubCondition}</td></tr>
                  <tr><th>Drains</th><td>${room.showerTubDrains ? 'Yes' : 'No'}</td><th>Leaks</th><td>${room.showerTubLeaks ? 'Yes' : 'No'}</td></tr>
                  ${room.showerTubNotes ? `<tr><th>Notes</th><td colspan="3">${room.showerTubNotes}</td></tr>` : ''}
                  ${room.showerTubWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">SHOWER/TUB - WORK ORDER</span></td></tr>' : ''}
                ` : ''}
                ${room.hasVentilation ? `
                  <tr><th colspan="4" style="background-color: #e0f2fe;">Ventilation (NSPIRE Required)</th></tr>
                  <tr><th>Type</th><td>${room.ventilationType || 'N/A'}</td><th>Working</th><td>${room.ventilationWorks ? 'Yes' : 'No'}</td></tr>
                  ${room.ventilationNotes ? `<tr><th>Notes</th><td colspan="3">${room.ventilationNotes}</td></tr>` : ''}
                  ${room.ventilationWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">VENTILATION - WORK ORDER</span></td></tr>' : ''}
                ` : '<tr><td colspan="4" style="background-color: #fee2e2; color: #991b1b; text-align: center; font-weight: bold;">NO VENTILATION - NSPIRE VIOLATION</td></tr>'}
              </table>
              ${room.toiletPhotos && room.toiletPhotos.length > 0 ? `
                <p style="font-weight: bold; margin: 10px 0 5px 0;">Toilet Photos:</p>
                <div class="photo-grid">
                  ${room.toiletPhotos.map(photo => `
                    <div class="photo-item">
                      <img src="${photo.data}" alt="Toilet">
                      <div class="photo-caption">${photo.comment || photo.filename}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${room.showerTubPhotos && room.showerTubPhotos.length > 0 ? `
                <p style="font-weight: bold; margin: 10px 0 5px 0;">Shower/Tub Photos:</p>
                <div class="photo-grid">
                  ${room.showerTubPhotos.map(photo => `
                    <div class="photo-item">
                      <img src="${photo.data}" alt="Shower/Tub">
                      <div class="photo-caption">${photo.comment || photo.filename}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            ` : ''}
          ` : ''}
          
          ${room.hasHeater || room.hasThermostat ? `
            <div class="subsection-title">Heating</div>
            <table>
              ${room.hasHeater ? `
                <tr><th>Heater Type</th><td>${room.heaterType || 'N/A'}</td><th>Count</th><td>${room.heaterCount}</td></tr>
                <tr><th>Condition</th><td>${room.heaterCondition}</td><th>Working</th><td>${room.heaterWorks ? 'Yes' : 'No'}</td></tr>
                ${room.heaterNotes ? `<tr><th>Notes</th><td colspan="3">${room.heaterNotes}</td></tr>` : ''}
                ${room.heaterWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">HEATER - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
              ${room.hasThermostat ? `
                <tr><th>Thermostat Type</th><td>${room.thermostatType || 'N/A'}</td><th>Working</th><td>${room.thermostatWorks ? 'Yes' : 'No'}</td></tr>
                ${room.thermostatNotes ? `<tr><th>Notes</th><td colspan="3">${room.thermostatNotes}</td></tr>` : ''}
                ${room.thermostatWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">THERMOSTAT - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
            </table>
            ${room.heaterPhotos && room.heaterPhotos.length > 0 ? `
              <div class="photo-grid">
                ${room.heaterPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Heater">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          ${room.type === 'stairway' && room.riseCount >= 3 ? `
            <div class="subsection-title">Stairway Railing (NSPIRE REQUIRED for 3+ Rises)</div>
            <table>
              <tr><th>Rise Count</th><td colspan="3">${room.riseCount}</td></tr>
              <tr><th>Railing Present</th><td colspan="3">${room.hasRailing ? 'Yes' : '<span style="color: red; font-weight: bold;">NO - NSPIRE VIOLATION</span>'}</td></tr>
              ${room.hasRailing ? `
                <tr><th>Both Sides</th><td>${room.railingBothSides ? 'Yes' : 'No'}</td><th>Height</th><td>${room.railingHeight || 'N/A'}"</td></tr>
                <tr><th>Secure</th><td>${room.railingSecure ? 'Yes' : 'No'}</td><th>Condition</th><td>${room.railingCondition}</td></tr>
                ${room.railingNotes ? `<tr><th>Notes</th><td colspan="3">${room.railingNotes}</td></tr>` : ''}
                ${room.railingWorkOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">RAILING - WORK ORDER</span></td></tr>' : ''}
              ` : ''}
            </table>
            ${room.railingPhotos && room.railingPhotos.length > 0 ? `
              <div class="photo-grid">
                ${room.railingPhotos.map(photo => `
                  <div class="photo-item">
                    <img src="${photo.data}" alt="Railing">
                    <div class="photo-caption">${photo.comment || photo.filename}</div>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          ` : ''}
          
          ${room.appliances && room.appliances.length > 0 ? `
            <div class="subsection-title">Appliances</div>
            ${room.appliances.map((app, appIdx) => `
              <table style="margin-bottom: 15px;">
                <tr><th colspan="4" style="background-color: #93c5fd; color: #1e40af;">${app.type} ${appIdx + 1}</th></tr>
                <tr><th>Brand</th><td>${app.brand || 'N/A'}</td><th>Model</th><td>${app.model || 'N/A'}</td></tr>
                <tr><th>Serial</th><td>${app.serial || 'N/A'}</td><th>Condition</th><td>${app.condition}</td></tr>
                <tr><th>Install Date</th><td>${app.installDate}${app.installDate === 'Custom' ? ' (' + app.customInstallDate + ')' : ''}</td><th>Action</th><td>${app.needsAction}</td></tr>
                ${app.notes ? `<tr><th>Notes</th><td colspan="3">${app.notes}</td></tr>` : ''}
                ${app.workOrder ? '<tr><td colspan="4" style="background-color: #fef3c7; text-align: center;"><span class="work-order-badge">APPLIANCE - WORK ORDER</span></td></tr>' : ''}
                
                ${app.type === 'Refrigerator' ? `
                  <tr><th colspan="4" style="background-color: #dbeafe;">Refrigerator-Specific Details</th></tr>
                  <tr><th>Temperature</th><td>${app.properTemperature}</td><th>Noise Level</th><td>${app.excessiveNoise}</td></tr>
                  <tr><th>Broken Shelves</th><td>${app.brokenShelvesCount}</td><th>Broken Seals</th><td>${app.brokenSealsCount}</td></tr>
                  <tr><th>Broken Drawers</th><td>${app.brokenDrawersCount}</td><th>Broken Flip Doors</th><td>${app.brokenFlipDoorsCount}</td></tr>
                ` : ''}
                
                ${app.type === 'Stove/Range' ? `
                  <tr><th colspan="4" style="background-color: #dbeafe;">Stove/Range-Specific Details</th></tr>
                  <tr><th>Oven Works</th><td>${app.ovenWorks ? 'Yes' : 'No'}</td><th>Temp Accurate</th><td>${app.ovenTemperatureAccurate ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Knobs Work</th><td>${app.knobsWork ? 'Yes' : 'No'}</td><th>Burners Work</th><td>${app.allBurnersWork ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Burner Temps OK</th><td>${app.burnerTemperaturesCorrect ? 'Yes' : 'No'}</td><th>Gas Leaks</th><td>${app.gasLeaks ? '<span style="color: red; font-weight: bold;">YES</span>' : 'No'}</td></tr>
                ` : ''}
                
                ${app.type === 'Range Hood' ? `
                  <tr><th colspan="4" style="background-color: #dbeafe;">Range Hood-Specific Details</th></tr>
                  <tr><th>Light Works</th><td>${app.lightWorks ? 'Yes' : 'No'}</td><th>Fan Works</th><td>${app.fanWorks ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Filter Condition</th><td>${app.filterCondition}</td><th>Exhausts Outside</th><td>${app.exhaustsOutside ? 'Yes' : 'No'}</td></tr>
                ` : ''}
                
                ${app.type === 'Dishwasher' ? `
                  <tr><th colspan="4" style="background-color: #dbeafe;">Dishwasher-Specific Details</th></tr>
                  <tr><th>Drains Completely</th><td>${app.drainsCompletely ? 'Yes' : 'No'}</td><th>Leaks</th><td>${app.leaks ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Cleans Dishes</th><td colspan="3">${app.cleansDishes ? 'Yes' : 'No'}</td></tr>
                ` : ''}
                
                ${app.type === 'Water Heater' ? `
                  <tr><th colspan="4" style="background-color: #fecaca; color: #991b1b;">Water Heater - NSPIRE Required Checks</th></tr>
                  <tr><th>TPR Valve Present</th><td>${app.hasTPRValve ? 'Yes' : '<span style="color: red; font-weight: bold;">NO - VIOLATION</span>'}</td><th>TPR Works</th><td>${app.tprValveWorks ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Drain Pan</th><td>${app.hasDrainPan ? 'Yes' : 'No'}</td><th>Proper Venting</th><td>${app.properVenting ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Water Temp</th><td>${app.waterTemperature}°F</td><th>Leaks</th><td>${app.leaks ? '<span style="color: red; font-weight: bold;">YES</span>' : 'No'}</td></tr>
                ` : ''}
                
                ${app.type === 'Washer' ? `
                  <tr><th colspan="4" style="background-color: #dbeafe;">Washer-Specific Details</th></tr>
                  <tr><th>Fills Completely</th><td>${app.fillsCompletely ? 'Yes' : 'No'}</td><th>Drains Completely</th><td>${app.drainsCompletely ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Spins Correctly</th><td>${app.spinsCorrectly ? 'Yes' : 'No'}</td><th>Leaks</th><td>${app.leaks ? 'Yes' : 'No'}</td></tr>
                ` : ''}
                
                ${app.type === 'Dryer' ? `
                  <tr><th colspan="4" style="background-color: #dbeafe;">Dryer-Specific Details</th></tr>
                  <tr><th>Heats Correctly</th><td>${app.heatsCorrectly ? 'Yes' : 'No'}</td><th>Vented Properly</th><td>${app.ventedProperly ? 'Yes' : 'No'}</td></tr>
                  <tr><th>Lint Trap Clean</th><td>${app.lintTrapClean ? 'Yes' : 'No'}</td><th>Tumbles</th><td>${app.tumbles ? 'Yes' : 'No'}</td></tr>
                ` : ''}
              </table>
              ${app.photos && app.photos.length > 0 ? `
                <p style="font-weight: bold; margin: 10px 0 5px 0;">${app.type} Photos:</p>
                <div class="photo-grid">
                  ${app.photos.map(photo => `
                    <div class="photo-item">
                      <img src="${photo.data}" alt="${app.type}">
                      <div class="photo-caption">${photo.comment || photo.filename}</div>
                    </div>
                  `).join('')}
                </div>
                ${summarizeComments(app.photos) ? `<p style="font-size: 10px; color: #666;"><strong>Summary:</strong> ${summarizeComments(app.photos)}</p>` : ''}
              ` : ''}
            `).join('')}
          ` : ''}
          
          ${room.generalComments ? `
            <div class="subsection-title">General Comments</div>
            <p>${room.generalComments}</p>
          ` : ''}
          
          ${room.generalPhotos && room.generalPhotos.length > 0 ? `
            <div class="subsection-title">General Room Photos</div>
            <div class="photo-grid">
              ${room.generalPhotos.map(photo => `
                <div class="photo-item">
                  <img src="${photo.data}" alt="Room Photo">
                  <div class="photo-caption">${photo.comment || photo.filename}</div>
                </div>
              `).join('')}
            </div>
            ${summarizeComments(room.generalPhotos) ? `<p style="font-size: 10px; color: #666;"><strong>Summary:</strong> ${summarizeComments(room.generalPhotos)}</p>` : ''}
          ` : ''}
        `).join('')}
        
        <div class="page-break"></div>
        <div class="section-title">WORK ORDER SUMMARY</div>
        ${(() => {
          const workOrders = [];
          rooms.forEach(room => {
            Object.keys(room).forEach(key => {
              if (key.endsWith('WorkOrder') && room[key]) {
                const fieldName = key.replace('WorkOrder', '');
                const notes = room[`${fieldName}Notes`] || '';
                const action = room[`${fieldName}NeedsAction`] || 'Review';
                workOrders.push({
                  room: room.name,
                  item: fieldName.replace(/([A-Z])/g, ' $1').trim(),
                  action: action,
                  notes: notes
                });
              }
            });
            room.appliances?.forEach(app => {
              if (app.workOrder) {
                workOrders.push({
                  room: room.name,
                  item: `${app.type} - ${app.brand || 'Unknown Brand'}`,
                  action: app.needsAction,
                  notes: app.notes
                });
              }
            });
          });
          
          if (workOrders.length === 0) {
            return '<p class="alert alert-success"><strong>✓ No work orders required.</strong> Unit passed all NSPIRE inspections.</p>';
          }
          
          return `
            <p class="alert alert-warning"><strong>⚠ Total Work Orders Required: ${workOrders.length}</strong></p>
            <table>
              <tr>
                <th style="width: 20%;">Room</th>
                <th style="width: 25%;">Item</th>
                <th style="width: 15%;">Action</th>
                <th style="width: 40%;">Notes</th>
              </tr>
              ${workOrders.map(wo => `
                <tr>
                  <td>${wo.room}</td>
                  <td>${wo.item}</td>
                  <td>${wo.action}</td>
                  <td>${wo.notes}</td>
                </tr>
              `).join('')}
            </table>
          `;
        })()}
        
        <div class="section-title">NSPIRE COMPLIANCE STATEMENT</div>
        <div class="alert alert-success">
          <p style="margin: 0;"><strong>✓ NSPIRE Compliance Declaration:</strong></p>
          <p style="margin: 10px 0 0 0;">I certify that this inspection was conducted in accordance with HUD's National Standards for the Physical Inspection of Real Estate (NSPIRE) and all applicable federal regulations for ${inspectionData.programType.join(', ')} programs.</p>
        </div>
        
        ${inspectionData.reportNotes ? `
          <div class="subsection-title">Additional Report Notes</div>
          <p>${inspectionData.reportNotes}</p>
        ` : ''}
        
        <div class="section-title">SIGNATURES</div>
        <table>
          <tr>
            <th style="width: 50%;">Inspector Signature</th>
            <th style="width: 50%;">Tenant Signature</th>
          </tr>
          <tr>
            <td>
              <div class="signature-box">
                ${inspectionData.inspectorSignature || ''}
              </div>
              <div style="text-align: center; margin-top: 5px;">
                <strong>${inspectorName}</strong><br>
                Date: ${inspectionData.inspectionDate}
              </div>
            </td>
            <td>
              <div class="signature-box">
                ${inspectionData.tenantSignature || ''}
              </div>
              <div style="text-align: center; margin-top: 5px;">
                <strong>${inspectionData.tenantFirstName} ${inspectionData.tenantLastName}</strong><br>
                Date: ${inspectionData.inspectionDate}
              </div>
            </td>
          </tr>
        </table>
        
        <div class="footer">
          <p><strong>Legal Disclaimer:</strong></p>
          <p>This inspection report is generated as a tool to assist in compliance with federal housing regulations. Property owners and managers are solely responsible for ensuring full compliance with all applicable federal, state, and local regulations including but not limited to: HUD regulations, HOME program requirements, LIHTC compliance, USDA Rural Development standards, Fair Housing Act, Section 504 accessibility requirements, and all applicable landlord-tenant laws. This report does not constitute legal advice. Consult with qualified legal counsel and compliance professionals for interpretation and application of regulations.</p>
          <p style="margin-top: 10px;"><strong>Report Generated:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Inspection System:</strong> NSPIRE-Compliant Rental Unit Inspection v2.0 | Multifamily NW & Quantum Residential</p>
        </div>
      </body>
      </html>
    `);
    reportWindow.document.close();
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
          <select
            value={inspectionData.propertyName}
            onChange={(e) => updateInspectionData('propertyName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="P56100">P56100</option>
            <option value="Custom">Custom</option>
          </select>
          {inspectionData.propertyName === 'Custom' && (
            <input
              type="text"
              value={inspectionData.propertyNameCustom}
              onChange={(e) => updateInspectionData('propertyNameCustom', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Enter custom property name"
              required
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Address <span className="text-red-500">*</span>
          </label>
          <select
            value={inspectionData.propertyAddress}
            onChange={(e) => updateInspectionData('propertyAddress', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="502 South 5th Street">502 South 5th Street</option>
            <option value="554 South 5th Street">554 South 5th Street</option>
            <option value="Custom">Custom</option>
          </select>
          {inspectionData.propertyAddress === 'Custom' && (
            <input
              type="text"
              value={inspectionData.propertyAddressCustom}
              onChange={(e) => updateInspectionData('propertyAddressCustom', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Enter custom address"
              required
            />
          )}
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
          <select
            value={inspectionData.inspectorName}
            onChange={(e) => updateInspectionData('inspectorName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Ellie McNelley">Ellie McNelley</option>
            <option value="Julian Rubio">Julian Rubio</option>
            <option value="Custom">Custom</option>
          </select>
          {inspectionData.inspectorName === 'Custom' && (
            <input
              type="text"
              value={inspectionData.inspectorNameCustom}
              onChange={(e) => updateInspectionData('inspectorNameCustom', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Enter custom inspector name"
              required
            />
          )}
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
                  <li>Maximum 120Â°F at fixtures</li>
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
                  âš ï¸ NSPIRE VIOLATION: Smoke alarm required in {currentRoom.type}s
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
                âš ï¸ NSPIRE VIOLATION: GFI protection required within 6 feet of {currentRoom.type === 'kitchen' ? 'sink' : 'bathroom fixtures'}
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
                      âš ï¸ NSPIRE: All windows must be operable with functioning locks
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
                  âš ï¸ NSPIRE: Bathroom ventilation required (window or exhaust fan)
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
                      âš ï¸ NSPIRE VIOLATION: Railing required for stairs with {currentRoom.riseCount} rises
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">Water Temperature at Fixture (Â°F)</label>
                            <input
                              type="number"
                              max="120"
                              placeholder="Max 120Â°F"
                              value={appliance.waterTemperature}
                              onChange={(e) => updateAppliance(currentRoom.id, appliance.id, 'waterTemperature', e.target.value)}
                              className="w-full p-2 border rounded text-sm"
                            />
                            <p className="text-xs text-red-600 mt-1">NSPIRE: Maximum 120Â°F</p>
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
        
        {/* Back Button */}
        <div className="mt-4">
          <button
            onClick={goToPreviousStep}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Room Inspections</span>
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

// RentalInspectionApp is now global