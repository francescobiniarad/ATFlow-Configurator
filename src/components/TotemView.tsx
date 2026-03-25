import { useState, useEffect, useRef, useCallback } from "react";
import { PALETTE } from "../constants";
import { useAI } from "../hooks/useAI";
import Car3D from "./Car3D";

export default function TotemView({ onBack }: { onBack: () => void }) {
  const ai = useAI("Context: voice totem in the physical ATFlow showroom. The person just walked in. Be extra welcoming and warm. Start with a greeting.");
  const [inp, setInp] = useState("");
  const [color, setColor] = useState("#B8B8B8");
  const [listening, setListening] = useState(true);
  const [micOn, setMicOn] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const init = useRef(false);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      ai.send("Ciao, sono appena entrato nello showroom ATFlow.");
    }
  }, [ai]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
    const last = ai.msgs.slice().reverse().find(m => m.sender === "ai" && m.carColor);
    if (last) setColor(last.carColor!);
  }, [ai.msgs, ai.typing]);

  const toggleMic = useCallback(() => {
    if (micOn) {
      recognition.current?.stop();
      setMicOn(false);
    } else {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SR) {
        const r = new SR();
        r.lang = "it-IT";
        r.interimResults = false;
        r.onresult = (e: any) => {
          const t = e.results[0][0].transcript;
          ai.send(t);
        };
        r.onend = () => setMicOn(false);
        recognition.current = r;
        r.start();
        setMicOn(true);
      } else {
        alert("Speech recognition not supported in this browser.");
      }
    }
  }, [micOn, ai]);

  const doSend = () => {
    if (!inp.trim()) return;
    setListening(false);
    ai.send(inp);
    setInp("");
    setTimeout(() => setListening(true), 1500);
  };

  const lastAI = ai.msgs.slice().reverse().find(m => m.sender === "ai");

  return (
    <div className="h-screen flex flex-col items-center overflow-hidden" style={{ background: PALETTE.bg }}>
      <button onClick={onBack} className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 p-3 rounded-full hover:bg-white/5" style={{ color: PALETTE.t3 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
      </button>
      <div className="pt-8 sm:pt-10 text-center z-10">
        <h2 className="text-2xl sm:text-3xl font-extralight" style={{ color: PALETTE.t3 + "60", letterSpacing: "0.5em" }}>ATFLOW STORE</h2>
      </div>
      <div className="flex-1 flex flex-col items-center justify-between w-full max-w-3xl px-6 py-4 overflow-hidden">
        <div className="w-full h-44 sm:h-56"><Car3D color={color} bg="dark" /></div>

        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center shrink-0">
          {(micOn || (listening && !ai.typing)) && <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ background: micOn ? "#EF4444" : PALETTE.blue }} />}
          <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full blur-2xl transition-all duration-700" style={{ background: (micOn ? "#EF4444" : PALETTE.blue) + "15", transform: ai.typing ? "scale(1.8)" : "scale(1)", opacity: ai.typing ? 0.5 : 0.25 }} />
          <button onClick={toggleMic} className="relative z-10 rounded-full flex items-center justify-center border shadow-2xl transition-all hover:scale-105" style={{ width: 80, height: 80, background: micOn ? "#EF444420" : PALETTE.card, borderColor: micOn ? "#EF4444" : (listening && !ai.typing ? PALETTE.blue : PALETTE.border) }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={micOn ? "#EF4444" : (listening && !ai.typing ? PALETTE.blue : PALETTE.t3)} className="w-7 h-7"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" /><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" /></svg>
          </button>
        </div>

        <p className="text-xs font-medium" style={{ color: micOn ? "#EF4444" : (ai.typing ? PALETTE.blue : PALETTE.t3) }}>
          {micOn ? "🎙️ In ascolto..." : ai.typing ? "Elaborazione..." : "Clicca il microfono o scrivi sotto"}
        </p>

        <div className="text-center max-w-xl h-32 px-4 overflow-y-auto scrollbar-hide" ref={end}>
          {ai.typing ? <p className="text-lg animate-pulse" style={{ color: PALETTE.blue }}>Sto elaborando...</p>
          : lastAI ? (
            <div>
              <p className="text-lg sm:text-xl font-light leading-snug mb-4 text-white">{lastAI.text}</p>
              {lastAI.options && lastAI.options.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {lastAI.options.map((o, i) => (
                    <button key={i} onClick={() => ai.send(o)} className="px-4 py-2 rounded-full border text-sm transition-all hover:border-blue-500"
                      style={{ borderColor: PALETTE.border, color: PALETTE.t2, background: PALETTE.card }}>{o}</button>
                  ))}
                </div>
              )}
              {lastAI.isQuoteSent && (
                <div className="mt-4 mx-auto max-w-xs p-3 rounded-xl border flex items-center gap-3" style={{ borderColor: PALETTE.green + "40", background: PALETTE.green + "10" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={PALETTE.green} className="w-5 h-5 shrink-0"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
                  <div><p className="text-xs font-bold" style={{ color: PALETTE.green }}>Preventivo inviato!</p></div>
                </div>
              )}
            </div>
          ) : <p className="text-xl font-light" style={{ color: PALETTE.t3 + "60" }}>Come posso aiutarti oggi?</p>}
        </div>

        <div className="w-full max-w-md mb-6">
          <div className="rounded-full border flex overflow-hidden" style={{ background: PALETTE.card, borderColor: PALETTE.border }}>
            <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && doSend()}
              className="flex-1 bg-transparent px-5 py-3 text-sm outline-none" style={{ color: PALETTE.white }} placeholder="Simula comando vocale..." />
            <button onClick={doSend} className="px-6 font-bold text-sm text-white" style={{ background: PALETTE.blueD }}>Invia</button>
          </div>
        </div>
      </div>
    </div>
  );
}
