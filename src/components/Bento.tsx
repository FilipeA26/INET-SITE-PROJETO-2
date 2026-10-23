import { Gamepad2, Tv, Laptop, ShieldCheck, Wifi } from "lucide-react";
import Reveal from "./Reveal";
import Orbit from "./Orbit";

export default function Bento() {
  return (
    <section id="vantagens" className="container-x py-24">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">Vantagens</p>
        <h2 className="section-title mt-3">Feita para tudo o que você faz online.</h2>
      </Reveal>

      <div className="mt-12 grid auto-rows-[220px] gap-5 md:grid-cols-4">
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white md:col-span-2 md:row-span-2">
          <img src="/fibras.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="relative flex h-full flex-col justify-end">
            <p className="font-display text-6xl font-extrabold italic text-lime">100%</p>
            <h3 className="mt-2 text-3xl font-bold">Fibra até o seu roteador</h3>
            <p className="mt-2 max-w-sm text-white/70">Os dados viajam como luz em fios de vidro: sem interferência elétrica, sem oscilar com a chuva.</p>
          </div>
        </Reveal>

        <Reveal delay={0.05} className="card flex flex-col justify-between p-7">
          <Gamepad2 className="text-electric" size={28} />
          <div>
            <h3 className="text-xl font-bold">Jogos sem lag</h3>
            <p className="mt-1 text-sm text-navy/60">Ping baixo e estável.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="card flex flex-col justify-between p-7">
          <Tv className="text-electric" size={28} />
          <div>
            <h3 className="text-xl font-bold">Streaming 4K</h3>
            <p className="mt-1 text-sm text-navy/60">Várias TVs ao mesmo tempo.</p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative overflow-hidden rounded-3xl bg-lime p-7 text-navy md:col-span-2">
          <Orbit className="absolute -right-10 -top-6 w-72 opacity-60 mix-blend-multiply" />
          <div className="relative flex h-full flex-col justify-between">
            <Laptop size={28} />
            <div>
              <h3 className="text-2xl font-bold">Home office sem travar</h3>
              <p className="mt-1 max-w-sm text-navy/75">Upload alto para videochamadas, envio de arquivos e backup na nuvem.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="card flex flex-col justify-between p-7 md:col-span-2">
          <Wifi className="text-electric" size={28} />
          <div>
            <h3 className="text-xl font-bold">Wi-Fi 6 em todos os cômodos</h3>
            <p className="mt-1 text-sm text-navy/60">Roteadores de última geração e opção de rede mesh.</p>
          </div>
        </Reveal>

        <Reveal delay={0.25} className="card flex flex-col justify-between p-7 md:col-span-2">
          <ShieldCheck className="text-electric" size={28} />
          <div>
            <h3 className="text-xl font-bold">Rede estável e segura</h3>
            <p className="mt-1 text-sm text-navy/60">Monitoramento constante da rede para você não ficar sem internet.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
