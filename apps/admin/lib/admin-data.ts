export type AdminRole = "SUPER_ADMIN" | "EDITOR" | "REVIEWER";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  status: "Active" | "Invited" | "Inactive";
  lastActive: string;
  createdAt: string;
}

export interface AdminAuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  category: "PROJECT" | "NEWS" | "CAREERS" | "USER" | "SYSTEM";
}

export interface AdminProject {
  id: string;
  title: string;
  category: "Commercial" | "Public & cultural" | "Residential";
  image: string;
  description: string;
  status: "Published" | "Draft" | "Archived";
  caseStudy: {
    system: string;
    focus: string;
    challenge: string;
    outcome: string;
  };
  featured: boolean;
  updatedAt: string;
}

export interface AdminNewsArticle {
  id: string;
  slug: string;
  title: string;
  category: "Foresight" | "Industry Insight" | "Company News" | "Sustainability";
  summary: string;
  status: "Published" | "Draft" | "Scheduled";
  publishDate: string;
  readTime: string;
  image: string;
  featured: boolean;
  author: {
    name: string;
    role: string;
  };
  viewsCount?: number;
}

export interface AdminJobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  level: "Graduate" | "Mid-Senior" | "Executive" | "Associate";
  deadline: string;
  status: "Active" | "Draft" | "Closed";
  applicantsCount: number;
  newApplicantsCount: number;
  overview: string;
}

// Initial Admin Users
export const initialAdminUsers: AdminUser[] = [
  {
    id: "usr_1",
    name: "Engr. Funsho Morgan",
    email: "f.morgan@moa.ng",
    role: "SUPER_ADMIN",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "Just now",
    createdAt: "2024-01-10",
  },
  {
    id: "usr_2",
    name: "Dr. Kweku Abe",
    email: "k.abe@moa.ng",
    role: "SUPER_ADMIN",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "2 hours ago",
    createdAt: "2024-01-15",
  },
  {
    id: "usr_3",
    name: "Amina Bello",
    email: "a.bello@moa.ng",
    role: "EDITOR",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    lastActive: "Yesterday",
    createdAt: "2024-03-01",
  },
  {
    id: "usr_4",
    name: "Chidubem Eze",
    email: "c.eze@moa.ng",
    role: "REVIEWER",
    status: "Invited",
    lastActive: "Never",
    createdAt: "2024-10-12",
  },
];

// Initial Projects from site-content.ts
export const initialProjects: AdminProject[] = [
  {
    id: "civic",
    title: "National Assembly Complex Expansion",
    category: "Public & cultural",
    image: "/images/civic-project.jpg",
    description: "Multi-purpose auditorium with post-tensioned floor plates and long-span trusses.",
    status: "Published",
    featured: true,
    updatedAt: "2026-10-14",
    caseStudy: {
      system: "Post-Tensioned Concrete & Space Trusses",
      focus: "Acoustic Attenuation & Structural Optimization",
      challenge: "Achieving a 38-meter column-free auditorium while maintaining architectural acoustics and seismic resilience.",
      outcome: "Completed on schedule with a 14% material reduction through finite-element tension modeling.",
    },
  },
  {
    id: "commercial",
    title: "Heritage Place Tower",
    category: "Commercial",
    image: "/images/commercial-project.jpg",
    description: "Fourteen-floor commercial office development with deep basement retention and LEED certification.",
    status: "Published",
    featured: true,
    updatedAt: "2026-10-10",
    caseStudy: {
      system: "Secant Piled Retention & Flat Slab RC Core",
      focus: "Deep Foundation Stability & High-Water Table Control",
      challenge: "High hydrostatic pressures adjacent to Lagos Lagoon requiring continuous dewatering and secant piles.",
      outcome: "Delivered first LEED certified Grade-A office complex in Nigeria with zero basement seepage.",
    },
  },
  {
    id: "residential",
    title: "The Osborne Marina Residences",
    category: "Residential",
    image: "/images/residential-project.jpg",
    description: "Luxury waterfront residential towers resting on complex friction pile foundations with marine durability.",
    status: "Published",
    featured: false,
    updatedAt: "2026-09-28",
    caseStudy: {
      system: "Continuous Flight Auger (CFA) Marine Piling",
      focus: "Sulfate Resistance & Differential Settlement Control",
      challenge: "Aggressive saline groundwater conditions requiring high-durability slag cement blends.",
      outcome: "Structural lifespan projected for 100+ years with cathodic protection integration.",
    },
  },
  {
    id: "industrial-gateway",
    title: "Lekki Deep Sea Logistics Hub",
    category: "Commercial",
    image: "/images/industrial-project.jpg",
    description: "Heavy container yard pavement and heavy-duty pre-engineered steel superstructures.",
    status: "Draft",
    featured: false,
    updatedAt: "2026-10-16",
    caseStudy: {
      system: "Post-Tensioned Heavy Duty Ground Slabs",
      focus: "High-Axle Dynamic Load Resistance",
      challenge: "Accommodating 90-ton reach stacker axle loads on soft coastal silts.",
      outcome: "Design phase completed and approved by regulatory port authorities.",
    },
  },
];

// Initial News & Foresight
export const initialNewsArticles: AdminNewsArticle[] = [
  {
    id: "corporate-transition-moa-ltd",
    slug: "corporate-transition-moa-ltd",
    title: "Morgan Omonitan & Abe Ltd Formally Transitions to MO&A Ltd",
    category: "Company News",
    summary: "Honoring over 50 years of pioneering engineering excellence, the firm announces its formal corporate evolution to MO&A Ltd.",
    status: "Published",
    publishDate: "Oct 12, 2026",
    readTime: "3 min read",
    image: "/images/engineering-hero.jpg",
    featured: true,
    viewsCount: 1842,
    author: {
      name: "Board of Directors",
      role: "MO&A Ltd",
    },
  },
  {
    id: "deep-foundations-coastal-lagos",
    slug: "deep-foundations-coastal-lagos",
    title: "Engineering Resilient Deep Foundations Along Nigeria's Coastline",
    category: "Foresight",
    summary: "A technical evaluation of high-capacity piling methodologies and ground improvement amidst coastal geotechnical challenges.",
    status: "Published",
    publishDate: "Sep 28, 2026",
    readTime: "6 min read",
    image: "/images/commercial-project.jpg",
    featured: true,
    viewsCount: 3120,
    author: {
      name: "Dr. Kweku Abe",
      role: "Senior Partner, Geotechnics",
    },
  },
  {
    id: "low-carbon-concrete-west-africa",
    slug: "low-carbon-concrete-west-africa",
    title: "Calcined Clay & LC3: The Frontier for Sustainable Concrete in West Africa",
    category: "Sustainability",
    summary: "How supplementary cementitious materials are cutting embodied carbon while improving chloride resistance in marine structures.",
    status: "Scheduled",
    publishDate: "Nov 02, 2026",
    readTime: "5 min read",
    image: "/images/residential-project.jpg",
    featured: false,
    viewsCount: 0,
    author: {
      name: "Engr. Funsho Morgan",
      role: "Principal Partner",
    },
  },
  {
    id: "bim-governance-infrastructure",
    slug: "bim-governance-infrastructure",
    title: "Deploying ISO 19650 BIM Protocols on Fast-Track Institutional Projects",
    category: "Industry Insight",
    summary: "Standardizing digital twin handovers and clash detection across multidisciplinary MEP and civil engineering teams.",
    status: "Draft",
    publishDate: "Draft",
    readTime: "4 min read",
    image: "/images/civic-project.jpg",
    featured: false,
    viewsCount: 0,
    author: {
      name: "Amina Bello",
      role: "Lead Digital Engineering",
    },
  },
];

// Initial Job Board Positions
export const initialJobPositions: AdminJobPosition[] = [
  {
    id: "senior-structural-engineer",
    title: "Senior Structural Project Engineer",
    department: "Structural Engineering",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    level: "Mid-Senior",
    deadline: "Nov 30, 2026",
    status: "Active",
    applicantsCount: 18,
    newApplicantsCount: 4,
    overview: "Lead design delivery for high-rise commercial towers and industrial facilities across West Africa.",
  },
  {
    id: "geotechnical-consultant",
    title: "Principal Geotechnical Consultant",
    department: "Civil & Infrastructure",
    location: "Accra, Ghana (On-site)",
    type: "Full-time",
    level: "Executive",
    deadline: "Dec 15, 2026",
    status: "Active",
    applicantsCount: 9,
    newApplicantsCount: 2,
    overview: "Direct coastal geotechnical assessments, deep basement shoring designs, and ground improvement projects.",
  },
  {
    id: "bim-coordination-lead",
    title: "BIM Coordination & Digital Twin Lead",
    department: "Digital Delivery",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-time",
    level: "Mid-Senior",
    deadline: "Nov 15, 2026",
    status: "Active",
    applicantsCount: 24,
    newApplicantsCount: 7,
    overview: "Oversee multi-discipline clash resolution, LOD 400 federated models, and automated bill generation.",
  },
  {
    id: "graduate-civil-intern",
    title: "Graduate Structural Trainee (2027 Cohort)",
    department: "Graduate Program",
    location: "Lagos / Ibadan",
    type: "Internship",
    level: "Graduate",
    deadline: "Jan 10, 2027",
    status: "Draft",
    applicantsCount: 0,
    newApplicantsCount: 0,
    overview: "Intensive 18-month rotational engineering residency across site inspection, structural calculations, and BOQ auditing.",
  },
];

// Initial Audit Trail
export const initialAuditLogs: AdminAuditLog[] = [
  {
    id: "log_1",
    userId: "usr_1",
    userName: "Engr. Funsho Morgan",
    action: "Updated Project Case Study",
    target: "National Assembly Complex Expansion",
    timestamp: "12 mins ago",
    category: "PROJECT",
  },
  {
    id: "log_2",
    userId: "usr_3",
    userName: "Amina Bello",
    action: "Published Article",
    target: "Engineering Resilient Deep Foundations Along Nigeria's Coastline",
    timestamp: "2 hours ago",
    category: "NEWS",
  },
  {
    id: "log_3",
    userId: "usr_2",
    userName: "Dr. Kweku Abe",
    action: "Reviewed Candidate Application",
    target: "Chukwudi N. for Senior Structural Engineer",
    timestamp: "Yesterday at 4:15 PM",
    category: "CAREERS",
  },
  {
    id: "log_4",
    userId: "usr_1",
    userName: "Engr. Funsho Morgan",
    action: "Invited Admin User",
    target: "c.eze@moa.ng as Reviewer",
    timestamp: "2 days ago",
    category: "USER",
  },
];
