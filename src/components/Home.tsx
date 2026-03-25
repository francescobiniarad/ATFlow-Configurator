import { PALETTE } from "../constants";

export default function Home({ onGo }: { onGo: (p: string) => void }) {
  const cards = [
    { id: "chat", title: "AI Chat", tag: "CONVERSATIONAL", desc: "Conversazione libera con configuratore 3D",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" /><path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" /></svg> },
    { id: "plugin", title: "Modale Conversazionale", tag: "MODALE", desc: "Assistente AI embedded nel sito",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" /></svg> },
    { id: "totem", title: "Totem Showroom", tag: "VOICE", desc: "Interfaccia vocale per il punto vendita",
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" /><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" /></svg> },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: PALETTE.bg }}>
      <header className="flex items-center justify-between px-6 sm:px-10 h-16 border-b" style={{ borderColor: PALETTE.border }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4B83FF,#2563EB)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" /></svg>
          </div>
          <span className="text-lg font-bold tracking-wider" style={{ color: PALETTE.t1 }}>ATFLOW</span>
        </div>
        <span className="text-[10px] tracking-wide" style={{ color: PALETTE.t3 }}>Prototype — ARAD Digital</span>
      </header>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-16 max-w-5xl mx-auto w-full">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: PALETTE.blue }}>AI-Powered Experience</p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-2" style={{ color: PALETTE.t1 }}>Configura.</h1>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-2" style={{ color: PALETTE.t1 }}>Finanzia.</h1>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8" style={{ color: PALETTE.blue }}>Guida.</h1>
        <p className="text-base leading-relaxed max-w-xl mb-14" style={{ color: PALETTE.t3 }}>
          Tre touchpoint AI per accompagnarti dalla scoperta al preventivo finale della tua ATFlow EV.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl">
          {cards.map(c => (
            <button key={c.id} onClick={() => onGo(c.id)}
              className="group text-left p-4 rounded-xl border transition-all duration-300 hover:border-zinc-600 aspect-square flex flex-col justify-between"
              style={{ background: PALETTE.card, borderColor: PALETTE.cardBorder }}>
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg" style={{ color: PALETTE.t1, background: PALETTE.inputBg }}>{c.icon}</div>
                <span className="text-[8px] font-semibold tracking-[0.1em] px-2 py-0.5 rounded-full border" style={{ color: PALETTE.t3, borderColor: PALETTE.border }}>{c.tag}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-0.5" style={{ color: PALETTE.t1 }}>{c.title}</h3>
                <p className="text-[11px] leading-snug" style={{ color: PALETTE.t3 }}>{c.desc}</p>
              </div>
              <span className="text-[11px] font-semibold flex items-center gap-1" style={{ color: PALETTE.blue }}>
                Avvia <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
              </span>
            </button>
          ))}
        </div>
      </div>

      <footer className="border-t px-6 sm:px-10 py-5 flex items-center justify-between" style={{ borderColor: PALETTE.border }}>
        <p className="text-[10px]" style={{ color: PALETTE.t3 }}>© 2026 ATFlow AI Experience — Prototype by ARAD Digital</p>
        <p className="text-[10px]" style={{ color: PALETTE.t3 }}>info@atflow.it · Milano</p>
      </footer>
    </div>
  );
}
