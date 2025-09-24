import React, { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Sailboat, Images, FileText } from "lucide-react";

const CONTENT = {
  brand: "Il Tuo Brand",
  payoff: "Made-to-Measure Dayboat, Italian Crafted",
  ctaPrimary: "Richiedi informazioni",
  phone: "+39 000 000 0000",
  email: "info@iltuobrand.it",
  investorDocs: [
    { title: "Investor Presentation", href: "/docs/investor-presentation.pdf" },
    { title: "Fact Sheet (1 pagina)", href: "/docs/fact-sheet.pdf" },
  ],
  sections: {
    hero: {
      headline: "Linea pulita. Eleganza essenziale.",
      sub: "Un dayboat pensato per vivere il mare con autenticità e misura.",
      heroImageMobile: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=70",
      heroImageDesktop: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=2400&auto=format&fit=crop&q=70",
    },
    story: {
      title: "Il progetto",
      body: "Nato dall'unione tra design italiano e artigianalità su misura. Proporzioni senza tempo, funzioni essenziali, materiali selezionati per durare.",
    },
    highlights: [
      { title: "Spazi intelligenti", body: "Vivibilità da categoria superiore in 12 metri." },
      { title: "Beach area", body: "Un dialogo continuo con l'acqua: accesso semplice, volumi liberi." },
      { title: "Su misura", body: "Layout e finiture configurabili, dal teak alla selleria." },
    ],
    gallery: {
      title: "Galleria",
      images: [
        "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=1600&auto=format&fit=crop&q=70",
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1600&auto=format&fit=crop&q=70",
        "https://images.unsplash.com/photo-1490093158370-1a6be674437b?w=1600&auto=format&fit=crop&q=70",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=70",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=70",
        "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=1600&auto=format&fit=crop&q=70",
      ],
    },
    investor: {
      title: "Investor Relations",
      note: "Trasparenza e solidità sono i pilastri della nostra crescita.",
      metrics: [
        { label: "Ricavi 2024", value: "€15M" },
        { label: "EBITDA", value: "22%" },
        { label: "Ordini in portafoglio", value: "€30M" },
        { label: "Unità consegnate", value: "12" },
      ],
    },
    contact: {
      title: "Contatti",
      note: "Parliamo del tuo progetto: riceverai una risposta entro 24 ore.",
    },
  },
};

function Divider() { return <div className="border-t border-black/10" />; }
function Container({ children }) { return <div className="max-w-6xl mx-auto px-4">{children}</div>; }

function useHashRoute() {
  const parse = () => (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || '/';
  const [route, setRoute] = useState(parse());
  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return [route, (r) => { window.location.hash = r; setRoute(r); }];
}

function Nav({ open, setOpen }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/70 border-b border-black/10">
      <Container>
        <div className="py-3 flex items-center justify-between">
          <a href="#/" className="font-medium tracking-tight flex items-center gap-2">
            <Sailboat className="h-5 w-5" /> {CONTENT.brand}
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-wide">
            <a href="#/modello" className="hover:opacity-70">Modello</a>
            <a href="#/galleria" className="hover:opacity-70">Galleria</a>
            <a href="#/investor" className="hover:opacity-70">Investor</a>
            {CONTENT.investorDocs?.map((d, i) => (
              <a key={i} href={d.href} target="_blank" rel="noreferrer" className="hover:opacity-70 flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" /> {d.title}
              </a>
            ))}
            <a href="#/contatti" className="hover:opacity-70">Contatti</a>
            <a href="#/contatti" className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-black/15 shadow-sm hover:shadow transition">
              {CONTENT.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-3 text-sm">
            <a onClick={() => setOpen(false)} href="#/modello">Modello</a>
            <a onClick={() => setOpen(false)} href="#/galleria">Galleria</a>
            <a onClick={() => setOpen(false)} href="#/investor">Investor</a>
            {CONTENT.investorDocs?.map((d, i) => (
              <a key={i} onClick={() => setOpen(false)} href={d.href} target="_blank" rel="noreferrer">{d.title}</a>
            ))}
            <a onClick={() => setOpen(false)} href="#/contatti">Contatti</a>
          </div>
        )}
      </Container>
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-14 md:pt-16">
      <div className="relative">
        <picture>
          <source media="(min-width: 768px)" srcSet={CONTENT.sections.hero.heroImageDesktop} />
          <img src={CONTENT.sections.hero.heroImageMobile} alt="Hero" className="w-full h-[70vh] md:h-[85vh] object-cover" />
        </picture>
        <div className="absolute inset-0">
          <Container>
            <div className="h-full flex items-end md:items-center">
              <div className="bg-white/70 md:bg-white/0 backdrop-blur-sm md:backdrop-blur-0 rounded-2xl md:rounded-none p-4 md:p-0 md:max-w-xl mb-6 md:mb-0">
                <p className="text-[12px] uppercase tracking-[0.18em] text-black/70">{CONTENT.payoff}</p>
                <h1 className="mt-2 text-4xl md:text-6xl font-serif leading-tight">{CONTENT.sections.hero.headline}</h1>
                <p className="mt-3 text-base md:text-lg text-black/70">{CONTENT.sections.hero.sub}</p>
                <div className="mt-5 flex items-center gap-3">
                  <a href="#/contatti" className="inline-flex items-center gap-2 rounded-full px-5 py-3 border border-black/15 shadow-sm hover:shadow-md transition">
                    {CONTENT.ctaPrimary} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-medium">{CONTENT.sections.story.title}</h2>
          </div>
          <div className="md:col-span-7 text-black/75 leading-relaxed">
            <p>{CONTENT.sections.story.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Highlights() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          {CONTENT.sections.highlights.map((h, i) => (
            <div key={i} className="rounded-2xl border border-black/10 p-6 md:p-8">
              <h3 className="text-lg font-medium mb-2">{h.title}</h3>
              <p className="text-sm text-black/70 leading-relaxed">{h.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Gallery() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-medium">{CONTENT.sections.gallery.title}</h2>
          <span className="text-xs uppercase tracking-widest text-black/60">{CONTENT.sections.gallery.images.length} foto</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {CONTENT.sections.gallery.images.map((src, i) => (
            <img key={i} src={src} alt={`Gallery ${i+1}`} className="rounded-xl object-cover aspect-square" />)
          )}
        </div>
      </Container>
    </section>
  );
}

function InvestorSection() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-medium">{CONTENT.sections.investor.title}</h2>
            <p className="text-black/70 mt-3">{CONTENT.sections.investor.note}</p>
            <div className="mt-5 space-y-2">
              {CONTENT.investorDocs?.map((d, i) => (
                <a key={i} href={d.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm underline">
                  <FileText className="h-4 w-4" /> {d.title}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-6">
            {CONTENT.sections.investor.metrics.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl border border-black/10 shadow-sm">
                <p className="text-sm uppercase tracking-wide text-black/60">{m.label}</p>
                <p className="mt-1 text-xl font-medium">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-medium">{CONTENT.sections.contact.title}</h2>
            <p className="text-black/70 mt-3">{CONTENT.sections.contact.note}</p>
            <div className="mt-6 space-y-1 text-sm">
              <p>Tel. <a href={`tel:${CONTENT.phone}`} className="underline underline-offset-2">{CONTENT.phone}</a></p>
              <p>Email <a href={`mailto:${CONTENT.email}`} className="underline underline-offset-2">{CONTENT.email}</a></p>
            </div>
          </div>
          <div className="md:col-span-7">
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border border-black/10 p-6 bg-white shadow-sm">
              <div className="grid grid-cols-1 gap-4">
                <input className="border rounded-xl px-3 py-2" required placeholder="Nome" />
                <input className="border rounded-xl px-3 py-2" required type="email" placeholder="Email" />
                <textarea className="border rounded-xl px-3 py-2 min-h-[120px]" required placeholder="Messaggio" />
                <button className="inline-flex items-center gap-2 rounded-full px-5 py-3 border border-black/15 shadow-sm hover:shadow-md transition" type="submit">
                  {CONTENT.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </button>
                {sent && (<p className="text-sm text-green-600">Messaggio simulato come inviato (integriamo email/CRM alla pubblicazione).</p>)}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-black/10 text-sm text-black/60">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {CONTENT.brand}. Tutti i diritti riservati.</p>
          <a href="#/" className="underline">Torna su</a>
        </div>
      </Container>
    </footer>
  );
}

function HomePage() { return (<><Hero /><Divider /><Story /><Divider /><Highlights /><Divider /><Gallery /><Divider /><InvestorSection /><Divider /><Contact /></>); }
function ModelloPage() { return (<><Hero /><Divider /><Story /><Divider /><Highlights /><Divider /><Gallery /></>); }
function GalleriaPage() { return (<><Gallery /><Divider /><Contact /></>); }
function InvestorPage() { return (<><InvestorSection /><Divider /><Contact /></>); }
function ContattiPage() { return (<><Contact /></>); }

export default function App() {
  const [open, setOpen] = useState(false);
  const [route] = useHashRoute();
  useEffect(() => { setOpen(false); }, [route]);

  let Page = <HomePage />;
  if (route === '/modello') Page = <ModelloPage />;
  else if (route === '/galleria') Page = <GalleriaPage />;
  else if (route === '/investor') Page = <InvestorPage />;
  else if (route === '/contatti') Page = <ContattiPage />;

  return (
    <div className="font-[ui-sans-serif] text-black bg-white">
      <Nav open={open} setOpen={setOpen} />
      <main className="space-y-0 pt-14 md:pt-16">
        {Page}
      </main>
      <Footer />
    </div>
  );
}
