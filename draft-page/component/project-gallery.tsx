import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/site-content';

export function ProjectGallery({filterable=false}:{filterable?:boolean}) {
 const [filter,setFilter]=useState('All');
 return <>
  {filterable&&<div className="filter-bar" aria-label="Project categories">{['All','Public & cultural','Commercial','Residential'].map(category=><Button key={category} variant="outline" aria-pressed={filter===category} onClick={()=>setFilter(category)}>{category}</Button>)}</div>}
  <div className="project-grid">{projects.filter(p=>filter==='All'||p.category===filter).map(project=><Link key={project.id} to="/projects/$projectId" params={{projectId:project.id}} className="project-item" aria-label={`View ${project.title} case study`}>
   <div className="project-image"><img src={project.image} alt={project.title} width={1024} height={1024} loading="lazy"/><span className="project-arrow"><ArrowUpRight size={20}/></span></div>
   <p className="project-category">{project.category}</p><h3>{project.title}</h3>
  </Link>)}</div>
  <p className="project-note">Illustrative concepts. Project photography and case studies to follow.</p>
 </>;
}