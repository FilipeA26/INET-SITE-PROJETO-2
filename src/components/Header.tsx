import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { PHONE, waLink } from "../lib";

const links = [
  ["Planos", "#planos"],
  ["Vantagens", "#vantagens"],
  ["Suporte", "#suporte"],
  ["Dúvidas", "#duvidas"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white/85 backdrop-blur-xl transition-shadow ${scrolled ? "shadow-[0_8px_30px_-20px_rgba(3,37,108,0.5)]" : ""}`}>
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#inicio" aria-label="INET – início">
          <img src="/inet-logo.png" alt="INET Internet Fibra Óptica" className="h-10 w-auto sm:h-11" />
        </a>
        <nav className="hidden items-center gap-1 rounded-full bg-[#F1F5FC] p-1 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-5 py-2 text-sm font-medium text-navy/75 transition hover:bg-white hover:text-navy">
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:+553335363939" className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            <Phone size={16} className="text-leaf" /> {PHONE}
          </a>
          <a href={waLink("Olá! Quero assinar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="btn-navy py-2.5 text-sm">
            Assine já
          </a>
        </div>
        <button className="text-navy lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-1 pb-6 lg:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 font-medium hover:bg-[#F1F5FC]">
              {label}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-navy mt-3">
            Assine já
          </a>
        </nav>
      )}
    </header>
  );
}
