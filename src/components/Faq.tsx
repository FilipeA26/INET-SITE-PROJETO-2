import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  ["Quanto tempo demora a instalação?", "Normalmente em poucos dias úteis após a assinatura, de acordo com a agenda da sua região."],
  ["A instalação é cobrada?", "Nos planos atuais a instalação é gratuita. Consulte as condições no momento da contratação."],
  ["Tem fidelidade?", "As condições de fidelidade variam por plano e promoção. Nossa equipe explica tudo antes de você assinar."],
  ["A internet funciona com chuva?", "Sim. A fibra óptica transmite dados por luz e não sofre interferência de chuva nem de rede elétrica."],
  ["Como consulto se a INET atende meu endereço?", "Chame a gente no WhatsApp (33) 3536-3939 com seu endereço e confirmamos na hora."],
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="duvidas" className="container-x grid gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr]">
      <Reveal>
        <p className="eyebrow">Dúvidas</p>
        <h2 className="section-title mt-3">Perguntas frequentes.</h2>
      </Reveal>
      <div className="divide-y divide-navy/10 border-y border-navy/10">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-xl font-semibold"
            >
              {q}
              <Plus className={`shrink-0 text-leaf transition-transform ${open === i ? "rotate-45" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden text-navy/65">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
