import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AtSign,
  Check,
  Database,
  Facebook,
  Globe2,
  GraduationCap,
  Handshake,
  Instagram,
  Linkedin,
  Lightbulb,
  Menu,
  Quote,
  Settings,
  Shield,
  TrendingUp,
  Twitter,
  Users,
  X,
} from "lucide-react";

const navItems = ["About", "Services", "Industries", "Case Studies", "Process", "Resources", "Contact"];

const services = [
  { icon: Settings, title: "Business Systems Development", description: "Designing the operational backbone that makes your organization more efficient, scalable, and resilient." },
  { icon: Database, title: "Digital Infrastructure", description: "Building a unified digital ecosystem with the right tools, integrations, and workflows to move faster." },
  { icon: TrendingUp, title: "Corporate Consulting", description: "Strategic clarity and practical execution for ambitious organizations navigating their next stage of growth." },
  { icon: Globe2, title: "Media & Public Image Infrastructure", description: "Creating visibility systems that strengthen your reputation, reach, and influence across every channel." },
  { icon: Users, title: "Executive Support Systems", description: "High-level operating support that gives leaders the focus, insight, and leverage to make better decisions." },
  { icon: GraduationCap, title: "Training & Implementation", description: "Transferring capability into your team with hands-on training, playbooks, and lasting implementation support." },
];

const testimonials = [
  ["Adewale Johnson", "CEO", "Atlas Technologies", "Lumora helped us transform our operational backbone in 90 days. We finally have the clarity and systems to scale with confidence."],
  ["Dr. Chioma Nwosu", "Director", "National Health Initiative", "They built the digital infrastructure for our campaign from the ground up. Every moving part now works as one."],
  ["Tunde Bakare", "Founder", "Veritas Consulting", "It felt like gaining an elite operations team overnight. Their thinking is strategic, but their execution is what sets them apart."],
  ["Ngozi Eze", "COO", "Luminance Media", "Our CRM redesign changed how we work. Revenue grew 40% in the first quarter because our team could finally move together."],
  ["Emmanuel Okafor", "Managing Director", "Provident Group", "The executive dashboard alone saves me 10 hours every week. I can see the business clearly and act before issues become problems."],
];

function PillLink({ children, outline = false, to = "/contact" }: { children: React.ReactNode; outline?: boolean; to?: string }) {
  return <Link reloadDocument to={to} className={`inline-flex items-center justify-center rounded-full px-8 py-4 text-xs font-medium uppercase tracking-[0.08em] transition-all duration-300 hover:scale-[1.02] ${outline ? "border border-lumora-green text-lumora-green hover:bg-lumora-green hover:text-white" : "bg-lumora-green text-white hover:bg-lumora-bright hover:brightness-110"}`}>{children}</Link>;
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <main className="overflow-hidden bg-white text-lumora-dark">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-lumora-dark/80 backdrop-blur-md">
        <div className="lumora-container flex h-20 items-center justify-between">
          <Link reloadDocument to="/" className="font-heading text-lg font-semibold tracking-[0.08em] text-white">LUMORA HUB</Link>
          <nav className="hidden items-center gap-7 lg:flex">
            <Link reloadDocument to="/" className="relative text-sm text-lumora-bright after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-0.5 after:bg-lumora-bright">Home</Link>
            {navItems.map((item) => <Link reloadDocument key={item} to={`/${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-white/65 transition hover:text-white">{item}</Link>)}
          </nav>
          <div className="hidden lg:block"><PillLink>Book Consultation</PillLink></div>
          <button className="text-white lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="lumora-container border-t border-white/10 pb-6 pt-5 lg:hidden"><nav className="flex flex-col gap-4">{["Home", ...navItems].map((item) => <Link reloadDocument onClick={() => setMenuOpen(false)} key={item} to={item === "Home" ? "/" : `/#${item.toLowerCase().replace(/ /g, "-")}`} className="text-sm text-white/80">{item}</Link>)}<PillLink>Book Consultation</PillLink></nav></div>}
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-lumora-dark pt-20">
        <div className="absolute inset-0 lumora-grid" />
        <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-lumora-green/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-lumora-bright/10 blur-3xl" />
        {["left-[12%] top-[24%]", "left-[78%] top-[18%]", "left-[22%] top-[70%]", "left-[88%] top-[78%]", "left-[63%] top-[58%]", "left-[42%] top-[16%]"].map((position, i) => <span key={position} className={`absolute ${position} h-1.5 w-1.5 animate-float rounded-full bg-lumora-bright/60`} style={{ animationDelay: `${i * 0.8}s` }} />)}
        <div className="relative z-10 mx-auto max-w-[850px] px-5 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.18em] text-lumora-bright">Business Systems · Digital Infrastructure · Corporate Consulting</p>
          <h1 className="font-heading text-5xl font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-6xl lg:text-[76px]">Building The Systems Behind Modern Success</h1>
          <p className="mx-auto mt-8 max-w-[650px] text-lg leading-relaxed text-white/60 sm:text-xl">We help businesses, executives, institutions and public figures create scalable infrastructure, stronger visibility and sustainable growth — across Africa and beyond.</p>
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"><PillLink>Book Consultation</PillLink><PillLink outline to="/services">Explore Services</PillLink></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/[0.08] py-5"><div className="lumora-container flex flex-col items-center justify-between gap-4 sm:flex-row"><span className="text-xs text-white/40">Trusted by leaders across Africa</span><div className="flex gap-7 font-heading text-xs tracking-[0.18em] text-white/30"><span>GOV.NG</span><span>ATLASS</span><span>VERITAS</span><span>LUMIN</span><span>PROV</span></div></div></div>
      </section>

      <section className="section-padding bg-white"><div className="lumora-container grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-20">{[[Shield, "Authority", "We bring deep expertise in business systems, digital infrastructure, and corporate strategy — tested across industries and grounded in hands-on implementation."], [Lightbulb, "Innovation", "We don't follow playbooks — we write them. Every solution is designed around your context, your ambition, and the modern tools that can move you forward."], [Handshake, "Trust", "Long-term partnerships built on transparency and measurable outcomes. We stay close, communicate clearly, and support you beyond the launch." ]].map(([Icon, title, copy]) => <div key={title as string}><Icon className="mb-6 text-lumora-green" size={38} strokeWidth={1.5} /><h2 className="font-heading text-2xl font-medium">{title as string}</h2><p className="mt-4 text-base leading-relaxed text-lumora-muted">{copy as string}</p></div>)}</div></section>

      <section id="services" className="section-padding bg-lumora-soft"><div className="lumora-container"><div className="mx-auto mb-16 max-w-2xl text-center"><p className="mb-4 text-xs uppercase tracking-[0.15em] text-lumora-green">What We Do</p><h2 className="font-heading text-4xl font-medium leading-tight tracking-[-0.03em] md:text-5xl">End-to-End Systems for Modern Organizations</h2><p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-lumora-muted">From infrastructure to influence — comprehensive solutions that transform how organizations operate and grow.</p></div><div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, description }) => <Link reloadDocument to={`/services#${title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} key={title} className="group rounded-lg border border-black/[0.06] bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-lumora-green hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:p-10"><Icon className="mb-6 text-lumora-green" size={38} strokeWidth={1.5} /><h3 className="font-heading text-xl font-medium">{title}</h3><p className="mt-3 line-clamp-2 text-sm leading-relaxed text-lumora-muted">{description}</p><span className="mt-5 inline-flex items-center gap-1 text-sm text-lumora-green group-hover:underline">Learn More <ArrowRight size={14} /></span></Link>)}</div></div></section>

      <section className="bg-gradient-to-br from-lumora-green to-lumora-bright py-20 md:py-24"><div className="lumora-container grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">{[["40+", "Projects Delivered"], ["25+", "Clients Served"], ["60+", "Systems Built"], ["38%", "Average Efficiency Gain"]].map(([number, label]) => <div key={label} className="text-center"><p className="font-heading text-5xl font-bold leading-tight text-white lg:text-6xl">{number}</p><p className="mt-2 text-sm text-white/70">{label}</p></div>)}</div></section>

      <section id="case-studies" className="section-padding bg-white"><div className="lumora-container"><div className="mx-auto mb-16 max-w-2xl text-center"><p className="mb-4 text-xs uppercase tracking-[0.15em] text-lumora-green">Client Success Stories</p><h2 className="font-heading text-4xl font-medium tracking-[-0.03em] md:text-5xl">What Our Partners Say</h2></div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{testimonials.slice(0, 3).map(([name, role, company, quote]) => <article key={name} className="rounded-lg border border-black/[0.06] p-8 md:p-10"><Quote className="mb-6 text-lumora-green/25" size={34} /><p className="font-accent text-lg italic leading-relaxed">“{quote}”</p><div className="mt-7"><p className="font-semibold">{name}</p><p className="text-sm text-lumora-muted">{role}</p><p className="text-sm text-lumora-green">{company}</p></div></article>)}</div></div></section>

      <section id="contact" className="bg-lumora-dark py-24 md:py-32"><div className="lumora-container text-center"><h2 className="font-heading text-4xl font-medium tracking-[-0.03em] text-white md:text-5xl">Ready to Build Systems That Scale?</h2><p className="mt-4 text-lg text-white/60">Every great organization runs on great systems. Let's architect yours.</p><div className="mt-10"><PillLink>Book Your Consultation</PillLink></div><p className="mt-3 text-xs text-white/35">Free 30-minute strategy call · No commitment</p></div></section>

      <footer className="bg-lumora-green text-white"><div className="lumora-container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"><div><Link reloadDocument to="/" className="font-heading text-xl font-semibold tracking-[0.08em]">LUMORA HUB</Link><p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">Building Systems. Creating Influence. Driving Growth.</p><p className="mb-3 mt-8 text-xs uppercase tracking-[0.08em] text-white/50">Subscribe to our newsletter</p>{subscribed ? <p className="flex items-center gap-2 text-sm text-white"><Check size={16} /> You're on the list.</p> : <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex gap-2"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="h-10 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/50" /><button className="h-10 rounded-full bg-white px-5 text-xs font-medium uppercase tracking-wider text-lumora-green transition hover:bg-white/90">Subscribe</button></form>}</div><FooterColumn title="Services" items={services.map((s) => s.title)} /><FooterColumn title="Company" items={["About Us", "Our Process", "Case Studies", "Resources", "Contact"]} /><div><h3 className="mb-6 text-sm uppercase tracking-[0.08em]">Get In Touch</h3><div className="space-y-3 text-sm text-white/70"><p>lumorahub2@gmail.com</p><p>+234 702 534 0480</p><p>No 8b, Providence Street, Lekki, Lagos, Nigeria</p></div><div className="mt-6 flex gap-4 text-white/60"><Link reloadDocument size={18} /><Twitter size={18} /><Instagram size={18} /><Facebook size={18} /><AtSign size={18} /></div></div></div><div className="border-t border-white/15"><div className="lumora-container flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/50 sm:flex-row"><span>© 2025 Lumora Hub. All rights reserved.</span><span>Privacy Policy &nbsp; · &nbsp; Terms of Service</span></div></div></footer>
    </main>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) { const routes: Record<string, string> = { "About Us": "/about", "Our Process": "/process", "Case Studies": "/case-studies", Resources: "/resources", Contact: "/contact" }; return <div><h3 className="mb-6 text-sm uppercase tracking-[0.08em]">{title}</h3><div className="space-y-3">{items.map((item) => <Link reloadDocument key={item} to={routes[item] ?? `/services#${item.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="block text-sm text-white/65 transition hover:text-white">{item}</Link>)}</div></div>; }
