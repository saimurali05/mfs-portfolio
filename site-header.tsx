'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
const links = [{href:'/about',label:'About'},{href:'/studio',label:'Studio'},{href:'/projects',label:'Projects'},{href:'/hybrid-pg',label:'Hybrid PG'}];
export function SiteHeader(){const [open,setOpen]=useState(false);return <header className="site-header"><Link className="wordmark" href="/" aria-label="Murali Forge Systems home"><Image src="/images/mfs-real-logo.jpg" alt="Official Murali Forge Systems logo" width={144} height={79} priority/></Link><nav className={open?'nav-links is-open':'nav-links'} aria-label="Main navigation">{links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}</Link>)}<Link className="nav-cta" href="/enquiry" onClick={()=>setOpen(false)}>Start an enquiry <span>↗</span></Link></nav><button className="menu-toggle" aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></header>}
