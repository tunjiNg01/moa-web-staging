export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  country: "Nigeria" | "Ghana" | "Regional";
  type: "Full-Time" | "Contract" | "Graduate Programme";
  experienceLevel: "Senior / Principal" | "Mid-Senior" | "Lead" | "Graduate / Entry" | "All Levels";
  featured?: boolean;
  postedDate: string;
  summary: string;
  overview: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export const openPositions: JobPosition[] = [
  {
    id: "snr-structural-engineer-lagos",
    title: "Senior Structural Design Engineer (Tall Buildings & Commercial)",
    department: "Structural Engineering",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    type: "Full-Time",
    experienceLevel: "Senior / Principal",
    featured: true,
    postedDate: "October 2026",
    summary:
      "Lead advanced structural analysis, finite-element modeling, and construction drawing governance for high-rise commercial towers and complex civic institutions.",
    overview:
      "As a Senior Structural Design Engineer at MO&A, you will direct technical delivery across some of West Africa's most prominent real estate and infrastructure commissions. Working directly with project directors and international architectural partners, you will turn complex architectural schemes into constructible, wind- and seismic-resilient structural frameworks.",
    responsibilities: [
      "Lead 3D finite-element modeling and linear/nonlinear dynamic wind/seismic analysis using ETABS, SAFE, and Prokon.",
      "Direct technical preparation of calculation books, foundation schemes, and reinforcement schedules in accordance with BS 8110, Eurocode 2, and relevant regional codes.",
      "Liaise with lead architects, MEP consultants, geotechnical experts, and statutory approval authorities.",
      "Conduct rigorous peer reviews of structural design submissions and resolve technical site coordination queries during execution.",
      "Mentor graduate engineers and lead internal technical design seminars on concrete optimization and low-carbon materials.",
    ],
    requirements: [
      "Bachelor's or Master's degree in Civil / Structural Engineering from an accredited institution.",
      "COREN registered or Chartered Structural Engineer (IStructE / NSE) with minimum 7+ years of verifiable design consultancy experience.",
      "Proficiency in ETABS, SAFE, Revit Structure, Prokon, and AutoCAD.",
      "Demonstrated track record of delivering at least 2 multi-storey commercial or civic structures above 10 storeys.",
      "Authoritative written and verbal technical communication skills.",
    ],
    benefits: [
      "Competitive executive compensation with performance bonus.",
      "Direct involvement in regional landmark projects shaping West African skylines.",
      "Comprehensive medical healthcare and continuous professional development (CPD) sponsorship.",
      "Flexible hybrid working environment and progressive leadership track.",
    ],
  },
  {
    id: "civil-infrastructure-engineer-lagos",
    title: "Civil Infrastructure & Highways Project Engineer",
    department: "Civil Infrastructure",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    type: "Full-Time",
    experienceLevel: "Mid-Senior",
    postedDate: "October 2026",
    summary:
      "Direct civil infrastructure engineering encompassing arterial road networks, urban stormwater drainage, flood attenuation, and coastal containment schemes.",
    overview:
      "MO&A seeks a dedicated Civil Infrastructure Project Engineer to manage the detailed design, hydraulic modeling, and construction monitoring for large-scale industrial estates, masterplanned residential communities, and municipal transit corridors.",
    responsibilities: [
      "Develop comprehensive stormwater master plans, retention ponds, and gravity sewer networks utilizing Civil 3D and StormCAD.",
      "Perform geometric design for flexible and rigid pavement cross-sections in accordance with Federal Ministry of Works standards and AASHTO guidelines.",
      "Coordinate geotechnical site investigations, cut-and-fill earthwork calculations, and soil stabilization recommendations.",
      "Prepare bills of engineering measurement and evaluation (BEME) and technical tender specifications.",
      "Provide periodic on-site quality assurance audits to verify compliance with drainage profiles and compaction standards.",
    ],
    requirements: [
      "B.Sc. in Civil Engineering (Registered or registrable with COREN/NSE).",
      "5+ years of practical experience in municipal civil engineering, highways, or drainage masterplanning.",
      "Strong proficiency in AutoCAD Civil 3D, HEC-RAS, and hydraulic modeling software.",
      "Sound knowledge of soil mechanics, hydrological analysis, and tropical stormwater dynamics.",
    ],
    benefits: [
      "Competitive compensation package with field allowances.",
      "Exposure to transformational public and private infrastructure schemes.",
      "Health insurance coverage and collaborative team mentorship.",
    ],
  },
  {
    id: "resident-project-manager-accra",
    title: "Resident Project Manager (Construction Governance & Advisory)",
    department: "Project Management",
    location: "Accra, Ghana",
    country: "Ghana",
    type: "Full-Time",
    experienceLevel: "Lead",
    featured: true,
    postedDate: "October 2026",
    summary:
      "Lead cross-border construction project management, cost governance, and contractor supervision for major institutional and diplomatic developments in Accra.",
    overview:
      "In step with MO&A's strategic expansion in Accra, Ghana, we are appointing an experienced Resident Project Manager. You will be the client's primary technical champion on site, safeguarding structural build quality, schedule fidelity, and cost risk control across high-value capital assets.",
    responsibilities: [
      "Establish and govern integrated project master schedules, critical path milestones, and contractor KPIs using Primavera P6 / MS Project.",
      "Chair weekly progress and coordination meetings with developers, general contractors, and specialist subcontractors.",
      "Conduct continuous quality control inspections on reinforcement installation, concrete batching, slump tests, and core curing regimes.",
      "Administer FIDIC / standard form construction contracts, certify interim payment applications, and evaluate claims for variation or extension of time.",
      "Serve as liaison between MO&A's executive engineering leadership and Ghana statutory development authorities.",
    ],
    requirements: [
      "Degree in Civil Engineering, Construction Management, or Quantity Surveying.",
      "GhIE (Ghana Institution of Engineering) registered or PMP / CIOB certified.",
      "8+ years of construction project leadership with demonstrable delivery of institutional or commercial projects in Ghana or West Africa.",
      "Strong contractual acumen with FIDIC Red and Yellow Books.",
      "Residency or authorization to work in Ghana.",
    ],
    benefits: [
      "Attractive regional expatriate/local executive remuneration.",
      "Key leadership role anchoring MO&A's regional growth across Ghana.",
      "Comprehensive medical cover and executive vehicle provision.",
    ],
  },
  {
    id: "structural-forensic-audit-specialist",
    title: "Structural Health Monitoring & Diagnostic Audit Specialist",
    department: "Diagnostic & Audit",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    type: "Full-Time",
    experienceLevel: "Mid-Senior",
    postedDate: "September 2026",
    summary:
      "Execute non-destructive testing (NDT), structural integrity assessments, crack pattern mapping, and seismic/subsidence retrofitting solutions for aging or distress assets.",
    overview:
      "With over five decades of engineering authority, MO&A is frequently appointed as an independent expert to assess distress structures, post-fire structural viability, and asset longevity. This specialist will deploy advanced NDT instrumentation and structural retrofitting designs.",
    responsibilities: [
      "Conduct non-destructive testing on concrete and steel (ultrasonic pulse velocity, rebound hammer, rebar scanning, carbonation depth, and core sampling).",
      "Develop finite element back-analysis to assess residual load capacities of deflected or distressed framing members.",
      "Authoritative preparation of forensic engineering audit reports, risk ratings, and remedial strengthening strategies (carbon fiber wrap, steel jacketing, micro-piling).",
      "Supervise execution of remedial retrofits and install digital crack/settlement monitoring sensors.",
    ],
    requirements: [
      "B.Sc. or M.Sc. in Structural Engineering or Materials Engineering.",
      "Minimum 4+ years dedicated experience in building forensics, condition audits, or structural repair design.",
      "Familiarity with non-destructive testing equipment, calibration, and interpretation standards (ASTM, BS EN).",
      "Exceptional technical writing ability for institutional audit reports and legal dispute proceedings.",
    ],
    benefits: [
      "Industry-leading remuneration and specialist practice allowances.",
      "Access to state-of-the-art diagnostic testing instrumentation.",
      "Professional memberships and forensic engineering certification sponsorship.",
    ],
  },
  {
    id: "graduate-structural-trainee-lagos",
    title: "Graduate Structural Engineer (2026 Young Pioneers Programme)",
    department: "Structural Engineering",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    type: "Graduate Programme",
    experienceLevel: "Graduate / Entry",
    postedDate: "October 2026",
    summary:
      "An accelerated 2-year structured rotational training programme for high-achieving civil/structural graduates to build foundational expertise under veteran chartered engineers.",
    overview:
      "MO&A's Young Pioneers Programme immerses promising graduates across conceptual design, computer modeling, site supervision, and client engagement. You will be paired with a dedicated Chartered Engineer mentor to guide your progression toward professional registration.",
    responsibilities: [
      "Assist senior engineers with preliminary structural calculations, beam/column sizing, and foundation layout drafting.",
      "Generate detailed structural BIM models and reinforcement schedules in Autodesk Revit.",
      "Participate in weekly site inspections, slump testing, and construction progress audits.",
      "Support the preparation of technical project presentations and research into low-carbon pozzolanic cements.",
    ],
    requirements: [
      "First Class or Second Class Upper (2:1) degree in Civil or Structural Engineering.",
      "Completion of mandatory National Youth Service Corps (NYSC) or exemption certificate.",
      "Foundational familiarity with AutoCAD, Revit, or structural analysis software packages.",
      "Passionate drive for technical precision, curiosity, and high ethical standards.",
    ],
    benefits: [
      "Structured 2-year mentorship leading toward COREN / NSE registration.",
      "Competitive graduate salary with full medical benefits.",
      "Direct hands-on experience on live multi-million dollar engineering projects.",
    ],
  },
  {
    id: "open-application-general",
    title: "Open Application / General Expression of Interest",
    department: "General Engineering & Operations",
    location: "Lagos, NG / Accra, GH / Hybrid",
    country: "Regional",
    type: "Full-Time",
    experienceLevel: "All Levels",
    postedDate: "Continuous Intake",
    summary:
      "We always welcome expressions of interest from exceptional structural engineers, BIM modelers, project managers, and civil consultants.",
    overview:
      "If you share our obsession with thoughtful engineering, structural integrity, and sustainable infrastructure development, we want to hear from you even if your ideal role is not explicitly listed above. We review incoming open talent profiles on a continuous weekly cycle.",
    responsibilities: [
      "Contribute your specialist capabilities across MO&A's engineering, consultancy, and regional development initiatives.",
      "Collaborate with multidisciplinary engineering teams in Nigeria, Ghana, and broader West African markets.",
      "Bring innovation, rigor, and technical passion to our 50-year engineering legacy.",
    ],
    requirements: [
      "Relevant qualification in Civil Engineering, Structural Engineering, Architecture, BIM/VDC, Quantity Surveying, or Project Management.",
      "Demonstrable dedication to engineering excellence, safety, and client collaboration.",
      "Clear articulation of how your skills and experience align with MO&A's practice.",
    ],
    benefits: [
      "Placement within our active talent bench for upcoming landmark commissions.",
      "Direct evaluation by MO&A Practice Leaders and Managing Partners.",
      "Opportunity to shape landmark infrastructure across West Africa.",
    ],
  },
];

export const careerValues = [
  {
    title: "50+ Years of Legacy",
    description:
      "Founded in 1972, MO&A has delivered foundational civic, commercial, and industrial landmarks across West Africa.",
  },
  {
    title: "Rigorous Technical Mentorship",
    description:
      "Work directly alongside COREN, GhIE, and IStructE chartered engineers who are dedicated to your continuous professional growth.",
  },
  {
    title: "Pioneering Projects",
    description:
      "Shape complex cantilevered corporate headquarters, deep-foundation coastal systems, and sustainable tropical infrastructure.",
  },
  {
    title: "Cross-Border Horizons",
    description:
      "Collaborate across our expanding hubs in Lagos, Nigeria and Accra, Ghana, de-risking capital investments across the region.",
  },
];
