export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
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
    id: "structural-design",
    title: "Structural design",
    description:
      "Considered structural solutions that bring architectural ambition to life. From early concepts to detailed design, we balance strength, efficiency and buildability.",
    details: [
      "Concept and feasibility studies",
      "Concrete, steel, timber and masonry design",
      "Detailed structural analysis and documentation",
    ],
    process: [
      {
        title: "Understand the ambition",
        description:
          "We learn what the project needs to achieve, the constraints it must work within and the people shaping it.",
      },
      {
        title: "Explore the structure",
        description:
          "We develop and compare structural options with the wider project team, balancing design intent, efficiency and buildability.",
      },
      {
        title: "Develop the design",
        description:
          "We coordinate analysis, drawings and structural details as the preferred approach takes shape.",
      },
      {
        title: "Support delivery",
        description:
          "We stay connected through project coordination, responding to questions as the design moves toward construction.",
      },
    ],
    relatedProjectId: "civic",
  },
  {
    id: "engineering-consultancy",
    title: "Engineering consultancy",
    description:
      "Clear thinking at every stage. We work alongside architects, developers and contractors to resolve complexity and move projects forward with confidence.",
    details: [
      "Independent technical advice",
      "Design coordination and review",
      "Construction-stage engineering support",
    ],
    process: [
      {
        title: "Listen and define",
        description:
          "We establish the project context, key decisions and the advice that will help the team move forward.",
      },
      {
        title: "Review the options",
        description:
          "We bring technical perspective to design choices, interfaces and coordination across disciplines.",
      },
      {
        title: "Give clear direction",
        description:
          "We explain recommendations and trade-offs in a way the wider project team can act on.",
      },
      {
        title: "Stay alongside the team",
        description:
          "We provide follow-through as questions emerge and project decisions develop.",
      },
    ],
    relatedProjectId: "commercial",
  },
  {
    id: "assessment-rehabilitation",
    title: "Assessment & rehabilitation",
    description:
      "A new perspective on existing structures. We assess performance, identify opportunities and develop practical approaches to extending a building’s useful life.",
    details: [
      "Structural condition assessments",
      "Alterations and change-of-use studies",
      "Strengthening and rehabilitation strategies",
    ],
    process: [
      {
        title: "Gather the picture",
        description:
          "We understand the building’s history, intended use and the questions that prompted an assessment.",
      },
      {
        title: "Assess what exists",
        description:
          "We review available information and examine relevant structural elements to understand their condition.",
      },
      {
        title: "Identify opportunities",
        description:
          "We consider practical options for adaptation, repair or strengthening in light of the project brief.",
      },
      {
        title: "Set out next steps",
        description:
          "We document findings and outline a clear path for further investigation or design development.",
      },
    ],
    relatedProjectId: "residential",
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

