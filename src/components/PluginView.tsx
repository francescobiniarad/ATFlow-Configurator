import { useState, useEffect, useRef } from "react";
import { PALETTE, COLORS, MODELS, INTERIORS, WHEELS } from "../constants";
import { useAI } from "../hooks/useAI";
import ChatBubble from "./ChatBubble";
import InputBar from "./InputBar";
import Car3D from "./Car3D";

export default function PluginView({ onBack }: { onBack: () => void }) {
  const ai = useAI("Context: modale conversazionale embedded in the configurator page. The user is actively configuring a car. When they change options, proactively suggest alternatives that save money or speed up delivery. Be contextual to their selections.");
  const [inp, setInp] = useState("");
  const [open, setOpen] = useState(false);
  const [cfg, setCfg] = useState({ model: 0, color: 0, interior: 0, wheel: 0 });
  const [tab, setTab] = useState<"model" | "color" | "interior" | "wheel">("model");
  const end = useRef<HTMLDivElement>(null);
  const lastCfg = useRef("");

  useEffect(() => {
    if (end.current) end.current.scrollIntoView({ behavior: "smooth" });
  }, [ai.msgs, ai.typing]);

  const price = MODELS[cfg.model].base + INTERIORS[cfg.interior].extra + WHEELS[cfg.wheel].extra;
  const monthly = Math.round((price - 8000) / 60 * 1.04);

  const changeCfg = (key: keyof typeof cfg, val: number) => {
    const next = { ...cfg, [key]: val };
    setCfg(next);
    const desc = `Model: ${MODELS[next.model].name}, Color: ${COLORS[next.color].name}, Interior: ${INTERIORS[next.interior].name}, Wheels: ${WHEELS[next.wheel].name}. Total: EUR ${(MODELS[next.model].base + INTERIORS[next.interior].extra + WHEELS[next.wheel].extra).toLocaleString()}`;
    
    if (desc !== lastCfg.current) {
      lastCfg.current = desc;
      setOpen(true);
      const labels = { model: "modello", color: "colore", interior: "interni", wheel: "cerchi" };
      const vn = key === "model" ? MODELS[val].name : key === "color" ? COLORS[val].name : key === "interior" ? INTERIORS[val].name : WHEELS[val].name;
      const me = Math.round(((MODELS[next.model].base + INTERIORS[next.interior].extra + WHEELS[next.wheel].extra) - 8000) / 60 * 1.04);
      ai.send(`[SYSTEM: User just changed ${labels[key]} to ${vn}. Current full config: ${desc}. Monthly ~EUR ${me}/month. Suggest a smart alternative or confirm with enthusiasm. Be brief and contextual to THIS specific change.]`, true);
    }
  };

  const doSend = () => {
    if (!inp.trim()) return;
    ai.send(inp);
    setInp("");
  };

  const tabs: { id: typeof tab; label: string }[] = [
    { id: "model", label: "Modello" },
    { id: "color", label: "Colore" },
    { id: "interior", label: "Interni" },
    { id: "wheel", label: "Cerchi" }
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#F0F2F5" }}>
      <nav className="h-14 flex items-center justify-between px-4 sm:px-8 shrink-0 border-b" style={{ background: "#fff", borderColor: "#E2E8F0" }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: PALETTE.blueD }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3"><path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" /></svg></div>
          <span className="font-bold text-sm" style={{ color: "#0F172A" }}>ATFLOW</span>
          <span className="text-[10px] px-2 py-0.5 rounded ml-2" style={{ background: "#EBF0FF", color: PALETTE.blueD }}>Configuratore</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-xs font-bold" style={{ color: PALETTE.blueD }}>
            <span style={{ color: "#0F172A" }}>{"\u20AC"}{price.toLocaleString()}</span>
            <span style={{ color: "#94A3B8" }}>{"\u00B7"}</span>
            <span>{"\u20AC"}{monthly}/mese</span>
          </div>
          <button onClick={onBack} className="text-xs font-medium px-3 py-1.5 rounded-lg border" style={{ borderColor: "#E2E8F0", color: "#64748B" }}>Esci</button>
        </div>
      </nav>

      <div className="flex-1 relative overflow-hidden">
        <div className="w-full h-full"><Car3D color={COLORS[cfg.color].hex} bg="light" /></div>

        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
          <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "#0F172A" }}>{MODELS[cfg.model].name}</h2>
          <p className="text-[11px]" style={{ color: "#94A3B8" }}>{MODELS[cfg.model].type} {"\u00B7"} {COLORS[cfg.color].name}</p>
        </div>

        <div className="absolute bottom-4 left-4 right-20 sm:bottom-6 sm:left-6 sm:right-24 z-10">
          <div className="backdrop-blur-xl rounded-xl border overflow-hidden" style={{ background: "#ffffffEE", borderColor: "#E2E8F0" }}>
            <div className="flex border-b" style={{ borderColor: "#E2E8F0" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={"flex-1 py-2.5 text-xs font-semibold transition-colors " + (tab === t.id ? "border-b-2" : "")}
                  style={{ color: tab === t.id ? PALETTE.blueD : "#94A3B8", borderColor: tab === t.id ? PALETTE.blueD : "transparent" }}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="p-3 sm:p-4">
              {tab === "model" && (
                <div className="flex gap-2">
                  {MODELS.map((m, i) => (
                    <button key={i} onClick={() => changeCfg("model", i)}
                      className={"flex-1 p-3 rounded-lg text-left border transition-all " + (cfg.model === i ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300")}>
                      <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{m.name}</p>
                      <p className="text-[10px]" style={{ color: "#94A3B8" }}>{m.type}</p>
                      <p className="text-xs font-bold mt-1" style={{ color: PALETTE.blueD }}>{"\u20AC"}{m.base.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              )}
              {tab === "color" && (
                <div className="flex gap-3 items-center">
                  {COLORS.map((c, i) => (
                    <button key={i} onClick={() => changeCfg("color", i)} className="flex flex-col items-center gap-1.5">
                      <div className={"w-10 h-10 rounded-full border-2 transition-all hover:scale-110 " + (cfg.color === i ? "ring-2 ring-blue-500 ring-offset-2" : "")}
                        style={{ background: c.hex, borderColor: cfg.color === i ? PALETTE.blueD : "#E2E8F0" }} />
                      <span className="text-[9px] font-medium" style={{ color: cfg.color === i ? PALETTE.blueD : "#94A3B8" }}>{c.name.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              )}
              {tab === "interior" && (
                <div className="flex gap-2">
                  {INTERIORS.map((int, i) => (
                    <button key={i} onClick={() => changeCfg("interior", i)}
                      className={"flex-1 p-3 rounded-lg text-left border transition-all " + (cfg.interior === i ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300")}>
                      <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{int.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: cfg.interior === i ? PALETTE.blueD : "#94A3B8" }}>{int.extra ? "+\u20AC" + int.extra.toLocaleString() : "Incluso"}</p>
                    </button>
                  ))}
                </div>
              )}
              {tab === "wheel" && (
                <div className="flex gap-2">
                  {WHEELS.map((w, i) => (
                    <button key={i} onClick={() => changeCfg("wheel", i)}
                      className={"flex-1 p-3 rounded-lg text-left border transition-all " + (cfg.wheel === i ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300")}>
                      <p className="text-xs font-bold" style={{ color: "#0F172A" }}>{w.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: cfg.wheel === i ? PALETTE.blueD : "#94A3B8" }}>{w.extra ? "+\u20AC" + w.extra.toLocaleString() : "Incluso"}</p>
                    </button>
                  ))}
                </div>
              )}
              <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#E2E8F0" }}>
                <div>
                  <p className="text-lg font-bold" style={{ color: "#0F172A" }}>{"\u20AC"}{price.toLocaleString()}</p>
                  <p className="text-[10px]" style={{ color: "#94A3B8" }}>Prezzo configurato</p>
                </div>
                <p className="text-base font-bold" style={{ color: PALETTE.blueD }}>{"\u20AC"}{monthly}/mese</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end z-20">
          {open && (
            <div className="mb-3 w-72 sm:w-80 rounded-2xl shadow-2xl overflow-hidden flex flex-col border" style={{ background: PALETTE.bg, borderColor: PALETTE.border, maxHeight: "50vh" }}>
              <div className="p-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#4B83FF,#2563EB)" }}>
                <div className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" /></svg>
                  <span className="text-sm font-bold">ATFlow AI</span>
                </div>
                <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-full text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg></button>
              </div>
              <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 240 }}>
                {ai.msgs.map(m => <ChatBubble key={m.id} msg={m} onOption={o => ai.send(o)} />)}
                {ai.typing && (
                  <div className="flex gap-1 px-3 py-2">
                    {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: PALETTE.t3, animation: `bounce 1.2s infinite ${i * 0.15}s` }} />)}
                  </div>
                )}
                <div ref={end} />
              </div>
              <InputBar value={inp} onChange={setInp} onSend={doSend} />
            </div>
          )}
          <button onClick={() => { if (!open) { setOpen(true); if (!ai.msgs.length) ai.send(`Ho appena aperto il configuratore. Sto guardando il ${MODELS[cfg.model].name} in ${COLORS[cfg.color].name}. Puoi aiutarmi?`); } else setOpen(false); }}
            className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform relative text-white"
            style={{ background: PALETTE.blueD }}>
            {!open && <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: PALETTE.blue }} />}
            {open
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" /><path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" /></svg>}
          </button>
        </div>
      </div>
    </div>
  );
}
