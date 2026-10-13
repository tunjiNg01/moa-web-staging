export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  category: "Pre-Construction & Feasibility" | "Design & Engineering" | "Construction & Quality Governance" | "Inspections & Expert Advisory";
  description: string;
  details: string[];
  deliverables: string[];
  process: ServiceProcessStep[];
  relatedProjectId: string;
}

export interface Project {
  id: string;
  title: string;
  category: "Public & cultural" | "Commercial" | "Residential";
  image: string;
  description: string;
}

export interface CaseStudy {
  challenge: string;
  approach: string;
  outcome: string;
  system: string;
  focus: string;
}

export type ProjectWithCaseStudy = Project & CaseStudy;

export const services: Service[] = [
  {
    id: "feasibility-studies",
    title: "Feasibility Studies",
    category: "Pre-Construction & Feasibility",
    description:
      "Comprehensive structural viability, site constraint assessments, and early concept evaluations to establish technical and financial viability before major capital commitment.",
    details: [
      "Site constraint & geotechnical desk study review",
      "Structural framing option appraisal & cost comparison",
      "Planning & building regulations risk analysis",
    ],
    deliverables: [
      "Executive Feasibility Report",
      "Structural Concept Framing Options",
      "Initial Risk & Constructability Matrix",
    ],
    process: [
      {
        title: "Define Objectives & Constraints",
        description: "Engage client and architectural team to clarify functional spatial needs, site boundaries, and operational goals.",
      },
      {
        title: "Option Modeling & Technical Appraisal",
        description: "Evaluate concrete, steel, and hybrid structural schemes for efficiency, cost, and foundation implications.",
      },
      {
        title: "Viability Synthesis & Next Steps",
        description: "Present actionable recommendations balancing structural performance, buildability, and project ROI.",
      },
    ],
    relatedProjectId: "commercial",
  },
  {
    id: "tender-detailed-design",
    title: "Tender & Detailed Design",
    category: "Design & Engineering",
    description:
      "Fully coordinated structural analysis, engineering calculations, detailed construction drawings, specifications, and bill of quantities for competitive procurement and site execution.",
    details: [
      "Comprehensive 3D finite-element structural analysis",
      "Detailed reinforced concrete, structural steel, and masonry design",
      "Tender drawing packages, bar bending schedules, and technical specifications",
    ],
    deliverables: [
      "Approved-for-Construction (AFC) Drawings",
      "Structural Calculation & Code Compliance Package",
      "Tender Technical Specifications & BOQ Integration",
    ],
    process: [
      {
        title: "Scheme Optimization & Analysis",
        description: "Build robust mathematical and finite element models to determine load paths, lateral stability, and deflections.",
      },
      {
        title: "Multidisciplinary Coordination",
        description: "Resolve interfaces with MEP, architectural, and facade consultants to eliminate site clashes.",
      },
      {
        title: "Tender Documentation Issuance",
        description: "Prepare comprehensive specifications and schedules that allow contractors to tender with confidence.",
      },
    ],
    relatedProjectId: "civic",
  },
  {
    id: "project-management",
    title: "Project Management",
    category: "Pre-Construction & Feasibility",
    description:
      "End-to-end technical governance, schedule orchestration, contract administration, and stakeholder alignment ensuring structural works are delivered safely, on schedule, and on budget.",
    details: [
      "Master schedule management and milestone tracking",
      "Procurement strategy and contractor contract administration",
      "Interdisciplinary risk management and value delivery",
    ],
    deliverables: [
      "Project Execution Plan (PEP)",
      "Weekly & Monthly Progress Governance Reports",
      "Earned Value & Program Risk Logs",
    ],
    process: [
      {
        title: "Initiation & Governance Setup",
        description: "Establish communication protocols, procurement gateways, and the baseline master programme.",
      },
      {
        title: "Active Delivery Monitoring",
        description: "Track engineering progress, review contractor submittals, and enforce rigorous quality milestones.",
      },
      {
        title: "Commissioning & Handover",
        description: "Oversee final inspections, technical documentation collation, and statutory authority sign-offs.",
      },
    ],
    relatedProjectId: "commercial",
  },
  {
    id: "value-engineering",
    title: "Value Engineering",
    category: "Design & Engineering",
    description:
      "Independent rationalization of structural schemes to eliminate material waste, simplify construction sequencing, and optimize capital expenditure without compromising safety or architectural vision.",
    details: [
      "Re-engineering of oversized foundations and superstructure framing",
      "Optimization of reinforcement density and concrete strength grades",
      "Standardization of repetitive elements to accelerate construction speed",
    ],
    deliverables: [
      "Value Engineering Audit & Variance Analysis",
      "Optimized Member Sizing & Quantity Comparison Tables",
      "Constructability & Supply Chain Cost-Savings Blueprint",
    ],
    process: [
      {
        title: "Design Audit & Cost Drivers",
        description: "Scrutinize existing structural models and bills of quantities to identify material and constructability bottlenecks.",
      },
      {
        title: "Alternative System Modeling",
        description: "Engineer alternative structural layouts, transfer structures, or foundation solutions with measurable savings.",
      },
      {
        title: "Client & Contractor Alignment",
        description: "Demonstrate verified cost and schedule savings while preserving full structural integrity.",
      },
    ],
    relatedProjectId: "residential",
  },
  {
    id: "independent-design-checking",
    title: "Independent Design Checking",
    category: "Design & Engineering",
    description:
      "Rigorous third-party peer review, structural safety audits, and code compliance verifications of designs prepared by external consultants and contractors.",
    details: [
      "Parallel verification of 3D finite element models and load path distribution",
      "Review against Nigerian (NBC), British (BS), and Eurocode standards",
      "Assessment of thermal, wind, and seismic design criteria",
    ],
    deliverables: [
      "Independent Design Check Certificate (Cat III / Peer Review)",
      "Technical Review Query (TRQ) Log & Mitigation Ledger",
      "Structural Adequacy & Code Compliance Sign-Off",
    ],
    process: [
      {
        title: "Documentation & Criteria Review",
        description: "Examine design basis reports, loading criteria, and calculation packages provided by the original engineer.",
      },
      {
        title: "Independent Analytical Verification",
        description: "Construct independent models to verify member capacities, deflections, and foundation bearing pressures.",
      },
      {
        title: "Certification & Risk Remediation",
        description: "Highlight deficiencies or non-compliances and issue formal certification upon satisfactory resolution.",
      },
    ],
    relatedProjectId: "civic",
  },
  {
    id: "construction-supervision",
    title: "Construction Supervision",
    category: "Construction & Quality Governance",
    description:
      "Resident and periodic on-site structural engineering surveillance, verifying that all construction activities strictly adhere to approved designs, specifications, and safety codes.",
    details: [
      "Reinforcement pre-pour inspections and concrete slump/cube testing oversight",
      "Steelwork fabrication and site bolt torque/weld inspection",
      "Non-conformance identification and corrective action tracking",
    ],
    deliverables: [
      "Site Inspection Reports (SIR) & Pour Clearances",
      "Non-Conformance Reports (NCR) & Resolution Records",
      "As-Built Verification & Practical Completion Certificates",
    ],
    process: [
      {
        title: "Pre-Construction Briefing",
        description: "Review contractor method statements, material test certificates, and establish hold points.",
      },
      {
        title: "Rigorous Site Inspections",
        description: "Inspect shuttering, reinforcement fixing, concrete batching, and steel erection at every crucial milestone.",
      },
      {
        title: "Certification & Quality Records",
        description: "Maintain comprehensive quality dossiers required for institutional handover and statutory approvals.",
      },
    ],
    relatedProjectId: "commercial",
  },
  {
    id: "construction-audit",
    title: "Construction Audit",
    category: "Construction & Quality Governance",
    description:
      "Independent forensic evaluations of ongoing or completed works to verify workmanship standards, material compliance, contractual conformity, and safety integrity.",
    details: [
      "Core sampling, rebound hammer, and ultrasonic pulse velocity review",
      "Audit of contractor quality management systems and test records",
      "Forensic examination of structural deviations and construction defects",
    ],
    deliverables: [
      "Comprehensive Construction Quality Audit Report",
      "Material Non-Compliance Risk Assessment",
      "Remedial & Rectification Engineering Directives",
    ],
    process: [
      {
        title: "Desk Study & Test Data Review",
        description: "Scrutinize pour logs, batching tickets, cube crush results, and mill test certificates.",
      },
      {
        title: "Physical Site Investigation",
        description: "Perform physical geometric surveys and non-destructive testing on installed structural elements.",
      },
      {
        title: "Findings & Rectification Framework",
        description: "Deliver prioritized action plans for addressing non-compliant elements before occupancy.",
      },
    ],
    relatedProjectId: "residential",
  },
  {
    id: "expert-services",
    title: "Expert Services",
    category: "Inspections & Expert Advisory",
    description:
      "Authoritative technical dispute advisory, expert witness testimony, structural forensic investigations, and insurance claim appraisals for developers, legal counsel, and insurers.",
    details: [
      "Structural failure root-cause forensics and damage appraisal",
      "Independent technical opinions for mediation, arbitration, and court proceedings",
      "Insurance claim assessment and reinstatement scope determination",
    ],
    deliverables: [
      "Independent Expert Witness Reports",
      "Forensic Failure Analysis & Evidence Dossiers",
      "Arbitration & Dispute Resolution Technical Submissions",
    ],
    process: [
      {
        title: "Evidence Gathering & Forensic Assessment",
        description: "Collect physical samples, review contractual records, and inspect distressed structural components.",
      },
      {
        title: "Advanced Structural Re-Analysis",
        description: "Simulate failure modes and stress concentrations to establish the definitive cause of structural distress.",
      },
      {
        title: "Authoritative Expert Reporting",
        description: "Deliver objective, court-admissible technical testimony with unimpeachable engineering rigor.",
      },
    ],
    relatedProjectId: "civic",
  },
  {
    id: "condition-surveys-inspections",
    title: "Condition Surveys, Structural Inspections and Monitoring",
    category: "Inspections & Expert Advisory",
    description:
      "Detailed structural health appraisals, dilapidation surveys, crack monitoring, vibration tracking, and life-extension assessments for historic, industrial, and commercial properties.",
    details: [
      "Visual and tactile condition mapping of structural distress",
      "Long-term tilt, settlement, and crack propagation monitoring",
      "Residual capacity calculations and change-of-use structural evaluations",
    ],
    deliverables: [
      "Comprehensive Condition Survey & Defect Schedule",
      "Structural Monitoring Trend Reports & Alert Triggers",
      "Remedial Strengthening & Life Extension Strategy",
    ],
    process: [
      {
        title: "Initial Visual & Non-Destructive Survey",
        description: "Map visible signs of distress including spalling, reinforcement corrosion, and deflection patterns.",
      },
      {
        title: "Instrumentation & Sensor Deployment",
        description: "Install precision tell-tales, inclinometers, and vibration sensors to track dynamic movement over time.",
      },
      {
        title: "Diagnostic Synthesis & Remediation",
        description: "Formulate concrete repair, carbon fiber (CFRP) wrapping, or underpinning solutions.",
      },
    ],
    relatedProjectId: "residential",
  },
  {
    id: "ground-investigation",
    title: "Ground Investigation Specifications and Interpretation",
    category: "Pre-Construction & Feasibility",
    description:
      "Design of targeted borehole investigation programs, laboratory testing oversight, and geotechnical interpretation to determine bearing capacity and foundation design parameters.",
    details: [
      "Borehole layout, rotary drilling, and standard penetration test (SPT) specifications",
      "Laboratory testing suites for soil mechanics, shear strength, and chemical aggressiveness",
      "Geotechnical design parameters for shallow, raft, and piled foundations",
    ],
    deliverables: [
      "Ground Investigation (GI) Specification & Scope of Works",
      "Geotechnical Interpretative Report (GIR)",
      "Foundation Recommendations & Settlement Estimates",
    ],
    process: [
      {
        title: "Geological Desk Study & Program Scoping",
        description: "Analyze regional geology, historical ground records, and planned structural load profiles.",
      },
      {
        title: "Fieldwork Supervision & Sampling",
        description: "Supervise drilling operations, sample recovery, in-situ testing, and groundwater monitoring.",
      },
      {
        title: "Engineering Interpretation & Design Data",
        description: "Derive characteristic geotechnical soil parameters for safe and cost-effective foundation sizing.",
      },
    ],
    relatedProjectId: "commercial",
  },
  {
    id: "erection-temporary-works",
    title: "Erection Engineering and Temporary Works Design",
    category: "Construction & Quality Governance",
    description:
      "Engineered design and certification of temporary support systems, deep basement shoring, heavy falsework, crane loading pads, and complex erection sequences.",
    details: [
      "Sheet piling, contiguous piles, and earth retention design",
      "Heavy duty scaffolding, formwork, and falsework engineering",
      "Structural stability analysis during phased construction and demolition",
    ],
    deliverables: [
      "Temporary Works Design Calculations & Drawings",
      "Permit-to-Load and Permit-to-Dismantle Certificates",
      "Sequence Methodology & Safety Method Statements",
    ],
    process: [
      {
        title: "Contractor Coordination & Load Analysis",
        description: "Establish plant weights, construction loads, wind actions, and lateral earth pressures.",
      },
      {
        title: "Rigorous Structural Design",
        description: "Size steel members, props, tie-backs, and timber pads with ample factors of safety.",
      },
      {
        title: "Site Sign-Off & Inspection",
        description: "Inspect erected temporary works prior to concrete pouring or excavation commencement.",
      },
    ],
    relatedProjectId: "civic",
  },
  {
    id: "design-interface-management",
    title: "Design Interface and Management",
    category: "Design & Engineering",
    description:
      "Structured interdisciplinary coordination, BIM clash resolution, and interface risk tracking uniting structural, architectural, MEP, facade, and geotechnical disciplines.",
    details: [
      "3D BIM coordination and automated clash detection protocols",
      "Management of structural penetrations, MEP risers, and plant loads",
      "Technical Interface Ledger (TIL) tracking across project participants",
    ],
    deliverables: [
      "Design Interface Matrix & Protocols",
      "BIM Federation & Clash Resolution Reports",
      "Resolved Interdisciplinary Structural Coordination Packages",
    ],
    process: [
      {
        title: "Protocol Establishment & Matrix Formulation",
        description: "Define design responsibilities, Level of Development (LOD) standards, and milestone delivery dates.",
      },
      {
        title: "Federation & Clash Workshops",
        description: "Review federated models in regular technical workshops to resolve structural conflicts early.",
      },
      {
        title: "Final Interface Sign-Off",
        description: "Verify that all penetration sleeves, embedment plates, and service loadings are coordinated before site issuance.",
      },
    ],
    relatedProjectId: "commercial",
  },
];

export const projects: Project[] = [
  {
    id: "civic",
    title: "Civic & cultural spaces",
    category: "Public & cultural",
    image: "/images/engineering-hero.jpg",
    description:
      "Expressive public architecture calls for thoughtful structural solutions. Long spans, open interiors and sculptural forms illustrate the possibilities of collaborative engineering.",
  },
  {
    id: "commercial",
    title: "Commercial environments",
    category: "Commercial",
    image: "/images/structure-detail.jpg",
    description:
      "Exposed structure can shape the character of a space. This illustrative concept explores the relationship between concrete, steel and light in a contemporary commercial environment.",
  },
  {
    id: "residential",
    title: "Places to call home",
    category: "Residential",
    image: "/images/residential-project.jpg",
    description:
      "Efficient structures underpin comfortable, adaptable homes. This illustrative residential concept brings together repeated structural systems, generous balconies and shared outdoor spaces.",
  },
];

export const caseStudies: Record<string, CaseStudy> = {
  civic: {
    challenge:
      "Creating generous public spaces while accommodating an expressive roof form requires a clear structural strategy. Long spans and cantilevers must be considered alongside movement, stability and the experience of the people below.",
    approach:
      "An illustrative approach combines reinforced concrete supports with a carefully coordinated long-span roof. Early collaboration between architecture and engineering can align the geometry, load paths and construction sequence.",
    outcome:
      "The concept demonstrates how structure can enable open interiors and a distinctive civic identity. These are design intentions, not verified outcomes from a completed commission.",
    system: "Long-span roof and reinforced concrete supports",
    focus: "Public spaces, cantilevers and structural form",
  },
  commercial: {
    challenge:
      "Open, adaptable commercial interiors need efficient load paths without compromising circulation or daylight. When the structure is exposed, connections and proportions become part of the architectural language.",
    approach:
      "This concept considers concrete columns and steel bracing as complementary systems. Coordinating the structural grid with the building layout creates an opportunity for legible support, lateral stability and flexible usable space.",
    outcome:
      "The illustrative design explores a structure that is both functional and visually expressive. Detailed performance and project outcomes would be established through analysis and a real project brief.",
    system: "Concrete frame with steel bracing",
    focus: "Adaptable interiors and exposed structure",
  },
  residential: {
    challenge:
      "Residential structures must balance efficient repetition with comfortable living spaces, balconies and communal areas. Coordination between the structural layout and building services is central to a practical design.",
    approach:
      "An illustrative concrete structural grid supports repeatable floor layouts while accommodating projecting balconies. Early consideration of facade interfaces, deflection and durability can help resolve the detail.",
    outcome:
      "This concept illustrates the potential for an efficient residential structure with welcoming shared spaces. No completed-project results, client details or measured performance are claimed.",
    system: "Concrete frame and projecting balcony slabs",
    focus: "Repeatable layouts and residential amenity",
  },
};

export function getService(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getCaseStudy(id: string): ProjectWithCaseStudy | undefined {
  const project = projects.find((item) => item.id === id);
  const study = caseStudies[id];
  if (!project || !study) return undefined;
  return { ...project, ...study };
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getAllServices(): Service[] {
  return services;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: "Foresight" | "Industry Insight" | "Company News" | "Sustainability";
  summary: string;
  content: string[];
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
  };
}

export const newsArticles: NewsArticle[] = [
  {
    id: "urban-infrastructure-west-africa",
    slug: "urban-infrastructure-west-africa",
    title: "The Future of High-Density Urban Infrastructure in West Africa",
    category: "Foresight",
    summary:
      "Rapid urbanization across Lagos, Accra, and regional hubs demands forward-thinking structural engineering that anticipates climate resilience, flexible density, and long-term asset value.",
    content: [
      "Metropolitan centers in West Africa are experiencing some of the world's most dynamic demographic and economic expansions. For structural engineers and development consultants, this shift requires a departure from conventional building paradigms toward integrated, climate-resilient frameworks.",
      "High-density urban corridors present distinct geotechnical and meteorological challenges—from high groundwater tables and coastal salinity to intense seasonal precipitation. Designing foundations and lateral force-resisting systems that offer durability under these conditions is fundamental to protecting capital investment.",
      "At MO&A, our strategic foresight focuses on adaptive structural grids that allow commercial developments to evolve over time, integrating energy-efficient cantilevers, solar shading facades, and precast modular components to compress construction schedules while elevating safety and performance standards.",
    ],
    date: "October 2026",
    readTime: "5 min read",
    image: "/images/news-urban-foresight.jpg",
    featured: true,
    author: {
      name: "Engr. Femi Abe",
      role: "Director of Structural Advisory",
    },
  },
  {
    id: "sustainable-concrete-tropical-climates",
    slug: "sustainable-concrete-tropical-climates",
    title: "Decarbonizing Structural Concrete: Practical Material Strategies in Tropical Environments",
    category: "Sustainability",
    summary:
      "Balancing structural durability and embodied carbon reduction requires specialized mix designs, pozzolanic cement replacements, and stringent quality governance.",
    content: [
      "Concrete remains the primary structural material underpinning Africa’s built environment. However, as global decarbonization mandates and regional sustainability commitments accelerate, engineering firms must pioneer practical, locally viable low-carbon alternatives.",
      "In hot and humid climates, supplementary cementitious materials (SCMs)—including ground granulated blast-furnace slag (GGBS) and calcined clays—not only decrease embodied carbon by up to 35%, but also mitigate thermal cracking during mass concrete pours and enhance resistance against sulfate and chloride attacks.",
      "Through rigorous structural optimization and material testing, MO&A guides developers and public authorities in achieving leaner, high-performing structural sections without compromising strength, safety, or longevity.",
    ],
    date: "September 2026",
    readTime: "4 min read",
    image: "/images/news-sustainable-materials.jpg",
    featured: true,
    author: {
      name: "Dr. O. Omonitan",
      role: "Lead Materials & Systems Specialist",
    },
  },
  {
    id: "regional-expansion-accra-ghana",
    slug: "regional-expansion-accra-ghana",
    title: "MO&A Expands West African Operations with Direct Footprint in Accra, Ghana",
    category: "Company News",
    summary:
      "Building on over 40 years of pioneering engineering in Nigeria, MO&A formalizes its cross-border consulting presence to support landmark infrastructure across Ghana.",
    content: [
      "Morgan Omonitan & Abe Ltd (MO&A) is pleased to announce the formal expansion of its consultancy operations to Accra, Ghana, reinforcing our long-standing commitment to delivering premier engineering and development advisory throughout West Africa.",
      "Having partnered on major cross-border commercial, industrial, and infrastructure assignments over past decades, the Accra presence provides local and multinational stakeholders with direct access to our multidisciplinary technical teams.",
      "As West Africa accelerates regional trade and urban development under the AfCFTA framework, MO&A remains positioned at the forefront of providing independent, world-class structural engineering and project management consultancy.",
    ],
    date: "August 2026",
    readTime: "3 min read",
    image: "/images/structure-detail.jpg",
    featured: true,
    author: {
      name: "Executive Directorate",
      role: "MO&A Management",
    },
  },
  {
    id: "structural-health-retrofitting-civic-assets",
    slug: "structural-health-retrofitting-civic-assets",
    title: "Extending the Lifespan of Legacy Civic Infrastructure Through Adaptive Retrofitting",
    category: "Industry Insight",
    summary:
      "Why rehabilitation and advanced non-destructive assessment offer cost-effective, sustainable alternatives to complete demolition for public and commercial buildings.",
    content: [
      "Across mature business districts, many commercial and civic structures built in the 1970s and 1980s are approaching pivotal milestone reviews. Demolishing and rebuilding is frequently cost-prohibitive, carbon-intensive, and disruptive to metropolitan commerce.",
      "Advanced structural health monitoring, combined with carbon-fiber-reinforced polymer (CFRP) wrapping and targeted foundation underpinning, enables engineers to upgrade load capacity to modern codes while preserving architectural heritage.",
      "MO&A's diagnostic engineering team continues to deploy comprehensive feasibility audits that empower asset custodians to extend building service life by decades while significantly enhancing seismic and wind performance.",
    ],
    date: "July 2026",
    readTime: "4 min read",
    image: "/images/engineering-hero.jpg",
    featured: false,
    author: {
      name: "Engr. K. Morgan",
      role: "Principal Forensic & Retrofit Engineer",
    },
  },
];

export function getAllNews(): NewsArticle[] {
  return newsArticles;
}

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles.filter((article) => article.featured);
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  featured?: boolean;
}

export const teamMembers: TeamMember[] = [
  {
    id: "babatunde-omonitan",
    name: "Engr. Dr. Babatunde Omonitan",
    role: "CEO & Managing Director",
    credentials: "FNSE, FAEng, COREN Reg.",
    bio: "Over 35 years of executive engineering leadership, directing major civil infrastructure, high-rise frameworks, and bilateral development partnerships across West Africa. He earned a Bachelor of Science in Civil Engineering and has guided MO&A from foundational commissions to cross-border institutional excellence.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    email: "b.omonitan@moa-engineering.com",
    linkedin: "https://linkedin.com",
    featured: true,
  },
  {
    id: "folasade-abe",
    name: "Engr. Folasade Abe",
    role: "Executive Director, Structural Engineering",
    credentials: "FNSE, FIStructE, COREN Reg.",
    bio: "Leads complex structural design, seismic analysis, and long-span civic envelopes, ensuring buildability and architectural harmony on flagship commercial commissions. She pairs sharp technical insight with collaborative delivery models across large multidisciplinary consultant teams.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    email: "f.abe@moa-engineering.com",
    linkedin: "https://linkedin.com",
    featured: true,
  },
  {
    id: "kwame-mensah",
    name: "Engr. Kwame Mensah",
    role: "Regional Director – West Africa (Ghana)",
    credentials: "PE, MGhIE, PMP",
    bio: "Directs MO&A’s expansion in Accra and regional cross-border initiatives, steering large-scale infrastructure project management and multidisciplinary coordination. Known for cultivating strong stakeholder alignment and de-risking capital investments across expanding metropolitan corridors.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    email: "k.mensah@moa-engineering.com",
    linkedin: "https://linkedin.com",
    featured: true,
  },
  {
    id: "amara-okonjo",
    name: "Dr. Amara Okonjo",
    role: "Head of Technical Advisory & Materials",
    credentials: "CEng, MICE, PhD Struct. Eng.",
    bio: "Pioneers research into low-carbon pozzolanic concrete mix designs, non-destructive diagnostic evaluations, and structural durability in tropical marine zones. She consults on complex structural health monitoring and legacy asset lifespan extension for civic custodians.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    email: "a.okonjo@moa-engineering.com",
    linkedin: "https://linkedin.com",
    featured: true,
  },
];

export function getAllTeamMembers(): TeamMember[] {
  return teamMembers;
}

