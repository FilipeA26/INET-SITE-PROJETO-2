import { Instagram, Facebook, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Orbit from "./Orbit";
import { PHONE, waLink } from "../lib";

export default function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-navy text-white sm:rounded-[2.5rem]">
        <Orbit className="pointer-events-none absolute -right-20 -top-10 w-[600px] opacity-40" />
        <div className="container-x relative py-20 text-center">
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold italic leading-tight sm:text-6xl">Conecte-se com a INET hoje mesmo.</h2>
          <a href={waLink("Olá! Quero contratar a internet fibra da INET.")} target="_blank" rel="noreferrer" className="btn-primary mt-10">
            Assinar pelo WhatsApp <ArrowRight size={18} />
          </a>
        </div>
        <div className="container-x relative grid gap-8 border-t border-white/10 py-10 md:grid-cols-3 md:items-center">
          <img src="/inet-logo-branca.png" alt="INET Internet Fibra Óptica" className="h-11 w-auto" />
          <div className="flex flex-wrap gap-6 text-sm text-white/80 md:justify-center">
            <a href="tel:+553335363939" className="inline-flex items-center gap-2 hover:text-lime"><Phone size={16} /> {PHONE}</a>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-lime"><MessageCircle size={16} /> WhatsApp</a>
            <span>inetminas.com.br</span>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <a href="https://instagram.com/inetminas" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-lime hover:text-navy"><Instagram size={18} /></a>
            <a href="https://facebook.com/inetminas" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-lime hover:text-navy"><Facebook size={18} /></a>
            <span className="text-sm font-semibold">@inetminas</span>
          </div>
        </div>
        <p className="relative pb-8 text-center text-xs text-white/50">© {new Date().getFullYear()} INET – Internet Fibra Óptica</p>
      </div>
    </footer>
  );
}
