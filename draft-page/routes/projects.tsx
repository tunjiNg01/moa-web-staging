import { createFileRoute } from '@tanstack/react-router';
import { SiteShell, PageHeading, ContactBand } from '@/components/site-shell';
import { ProjectGallery } from '@/components/project-gallery';
import { pageHead } from '@/lib/site-content';
export const Route=createFileRoute('/projects')({head:()=>pageHead('Projects','Explore structural engineering possibilities across public, commercial and residential environments with MO&A.'),component:Projects});
function Projects(){return <SiteShell><PageHeading label="Engineering possibilities" title="Ambition, made tangible." description="A look at the spaces and structural possibilities that inspire our thinking — from expressive public buildings to the places we call home."/><section className="section"><div className="container"><ProjectGallery filterable/></div></section><ContactBand/></SiteShell>}
