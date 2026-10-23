import { MessageCircle, Wrench, MapPin, Clock } from "lucide-react";
import Reveal from "./Reveal";
import { waLink } from "../lib";

const items = [
  [MessageCircle, "Atendimento pelo WhatsApp", "Fale com gente de verdade, sem robô infinito."],
  [Wrench, "Técnicos próprios", "Instalação e visitas feitas pela equipe INET."],
  [MapPin, "Empresa da região", "Conhecemos a sua cidade e a sua rua."],
  [Clock, "Suporte 24h", "Monitoramento e plantão todos os dias."],
] as const;

export default function Support() {
  return (
    <section id="suporte" className="bg-[#F4F7FC] py-24">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Suporte</p>
          <h2 className="section-title mt-3">Atendimento de perto, de verdade.</h2>
          <p className="mt-4 max-w-md text-navy/60">Na INET você não é só mais um número. Nossa equipe é local e resolve rápido.</p>
          <a href={waLink("Olá! Preciso de suporte INET.")} target="_blank" rel="noreferrer" className="btn-navy mt-8">
            <MessageCircle size={18} /> Falar com o suporte
          </a>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([Icon, title, text], i) => (
            <Reveal key={title} delay={i * 0.07} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-lime">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-navy/60">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
