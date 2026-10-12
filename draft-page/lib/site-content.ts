import hero from '@/assets/engineering-hero.jpg';
import detail from '@/assets/structure-detail.jpg';
import residential from '@/assets/residential-project.jpg';
export { hero, detail, residential };
export const services = [
 { id: 'structural-design', title: 'Structural design', description: 'Considered structural solutions that bring architectural ambition to life. From early concepts to detailed design, we balance strength, efficiency and buildability.', details: ['Concept and feasibility studies', 'Concrete, steel, timber and masonry design', 'Detailed structural analysis and documentation'], process: [{ title: 'Understand the ambition', description: 'We learn what the project needs to achieve, the constraints it must work within and the people shaping it.' }, { title: 'Explore the structure', description: 'We develop and compare structural options with the wider project team, balancing design intent, efficiency and buildability.' }, { title: 'Develop the design', description: 'We coordinate analysis, drawings and structural details as the preferred approach takes shape.' }, { title: 'Support delivery', description: 'We stay connected through project coordination, responding to questions as the design moves toward construction.' }], relatedProjectId: 'civic' },
 { id: 'engineering-consultancy', title: 'Engineering consultancy', description: 'Clear thinking at every stage. We work alongside architects, developers and contractors to resolve complexity and move projects forward with confidence.', details: ['Independent technical advice', 'Design coordination and review', 'Construction-stage engineering support'], process: [{ title: 'Listen and define', description: 'We establish the project context, key decisions and the advice that will help the team move forward.' }, { title: 'Review the options', description: 'We bring technical perspective to design choices, interfaces and coordination across disciplines.' }, { title: 'Give clear direction', description: 'We explain recommendations and trade-offs in a way the wider project team can act on.' }, { title: 'Stay alongside the team', description: 'We provide follow-through as questions emerge and project decisions develop.' }], relatedProjectId: 'commercial' },
 { id: 'assessment-rehabilitation', title: 'Assessment & rehabilitation', description: 'A new perspective on existing structures. We assess performance, identify opportunities and develop practical approaches to extending a building’s useful life.', details: ['Structural condition assessments', 'Alterations and change-of-use studies', 'Strengthening and rehabilitation strategies'], process: [{ title: 'Gather the picture', description: 'We understand the building’s history, intended use and the questions that prompted an assessment.' }, { title: 'Assess what exists', description: 'We review available information and examine relevant structural elements to understand their condition.' }, { title: 'Identify opportunities', description: 'We consider practical options for adaptation, repair or strengthening in light of the project brief.' }, { title: 'Set out next steps', description: 'We document findings and outline a clear path for further investigation or design development.' }], relatedProjectId: 'residential' },
] as const;
export function getService(id: string) {
 return services.find(service => service.id === id);
}
export const projects = [
 { id: 'civic', title: 'Civic & cultural spaces', category: 'Public & cultural', image: hero, description: 'Expressive public architecture calls for thoughtful structural solutions. Long spans, open interiors and sculptural forms illustrate the possibilities of collaborative engineering.' },
 { id: 'commercial', title: 'Commercial environments', category: 'Commercial', image: detail, description: 'Exposed structure can shape the character of a space. This illustrative concept explores the relationship between concrete, steel and light in a contemporary commercial environment.' },
 { id: 'residential', title: 'Places to call home', category: 'Residential', image: residential, description: 'Efficient structures underpin comfortable, adaptable homes. This illustrative residential concept brings together repeated structural systems, generous balconies and shared outdoor spaces.' },
];
export const caseStudies = {
 civic: {
  challenge: 'Creating generous public spaces while accommodating an expressive roof form requires a clear structural strategy. Long spans and cantilevers must be considered alongside movement, stability and the experience of the people below.',
  approach: 'An illustrative approach combines reinforced concrete supports with a carefully coordinated long-span roof. Early collaboration between architecture and engineering can align the geometry, load paths and construction sequence.',
  outcome: 'The concept demonstrates how structure can enable open interiors and a distinctive civic identity. These are design intentions, not verified outcomes from a completed commission.',
  system: 'Long-span roof and reinforced concrete supports',
  focus: 'Public spaces, cantilevers and structural form',
 },
 commercial: {
  challenge: 'Open, adaptable commercial interiors need efficient load paths without compromising circulation or daylight. When the structure is exposed, connections and proportions become part of the architectural language.',
  approach: 'This concept considers concrete columns and steel bracing as complementary systems. Coordinating the structural grid with the building layout creates an opportunity for legible support, lateral stability and flexible usable space.',
  outcome: 'The illustrative design explores a structure that is both functional and visually expressive. Detailed performance and project outcomes would be established through analysis and a real project brief.',
  system: 'Concrete frame with steel bracing',
  focus: 'Adaptable interiors and exposed structure',
 },
 residential: {
  challenge: 'Residential structures must balance efficient repetition with comfortable living spaces, balconies and communal areas. Coordination between the structural layout and building services is central to a practical design.',
  approach: 'An illustrative concrete structural grid supports repeatable floor layouts while accommodating projecting balconies. Early consideration of facade interfaces, deflection and durability can help resolve the detail.',
  outcome: 'This concept illustrates the potential for an efficient residential structure with welcoming shared spaces. No completed-project results, client details or measured performance are claimed.',
  system: 'Concrete frame and projecting balcony slabs',
  focus: 'Repeatable layouts and residential amenity',
 },
};
export function getCaseStudy(id: string) {
 const project = projects.find(item => item.id === id);
 if (!project || !(id in caseStudies)) return undefined;
 return { ...project, ...caseStudies[id as keyof typeof caseStudies] };
}
export function pageHead(title: string, description: string) { return { meta: [{ title: `${title} — MO&A` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — MO&A` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }; }
