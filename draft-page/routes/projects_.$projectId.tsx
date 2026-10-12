import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteShell, ContactBand, PageHeading } from '@/components/site-shell';
import { getCaseStudy, pageHead, projects } from '@/lib/site-content';

export const Route = createFileRoute('/projects_/$projectId')({
 head: ({params}) => {
  const project = getCaseStudy(params.projectId);
  return pageHead(project ? `${project.title} | Case study` : 'Project not found', project?.description ?? 'This MO&A project could not be found. Explore our project collection.');
 },
 component: ProjectCaseStudy,
});

function ProjectCaseStudy() {
 const {projectId} = Route.useParams();
 const project = getCaseStudy(projectId);
 if (!project) return <SiteShell><PageHeading label="Projects" title="Project not found." description="This project is not available. Explore our collection to find another case study."/><div className="container section"><Button variant="editorial" asChild><Link to="/projects"><ArrowLeft/> Back to projects</Link></Button></div></SiteShell>;
 const next = projects[(projects.findIndex(item=>item.id===projectId)+1)%projects.length];
 return <SiteShell>
  <section className="case-heading container"><Button variant="editorial" asChild><Link to="/projects"><ArrowLeft/> All projects</Link></Button><div className="kicker">{project.category} · Case study</div><h1>{project.title}</h1><p>{project.description}</p></section>
  <img className="case-cover" src={project.image} alt={project.title} width={1920} height={1024} fetchPriority="high"/>
  <section className="section container case-body"><aside><div className="kicker">Project details</div><dl className="project-facts"><div><dt>Sector</dt><dd>{project.category}</dd></div><div><dt>Structural concept</dt><dd>{project.system}</dd></div><div><dt>Design focus</dt><dd>{project.focus}</dd></div><div><dt>Project status</dt><dd>Illustrative concept</dd></div></dl><p className="project-note">Concept imagery and draft case-study content. Not a completed MO&A commission.</p></aside><div className="prose">{[['The challenge',project.challenge],['Our approach',project.approach],['The design opportunity',project.outcome]].map(([title,copy])=><article className="case-chapter" key={title}><h2>{title}</h2><p>{copy}</p></article>)}</div></section>
  <section className="section projects-section"><div className="container"><div className="section-heading"><div><div className="kicker">In focus</div><h2>Structure. Space. Detail.</h2></div></div><figure className="case-figure"><img src={project.image} alt={`Architectural view of ${project.title.toLowerCase()}`} width={1920} height={1024} loading="lazy"/><figcaption>Architectural concept — {project.title}. Illustrative imagery.</figcaption></figure></div></section>
  {next&&<section className="container case-next"><div><div className="kicker">Next case study</div><h2>{next.title}</h2></div><Button variant="hero" asChild><Link to="/projects/$projectId" params={{projectId:next.id}}>View case study <ArrowUpRight/></Link></Button></section>}
  <ContactBand/>
 </SiteShell>;
}