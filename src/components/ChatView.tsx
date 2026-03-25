import { useState, useEffect, useRef } from "react";
import { PALETTE, COLORS } from "../constants";
import { useAI } from "../hooks/useAI";
import ChatBubble from "./ChatBubble";
import InputBar from "./InputBar";
import Car3D from "./Car3D";
import Back from "./Back";

export default function ChatView({ onBack }: { onBack: () => void }) {
  const ai = useAI("Context: full AI chat with 3D car viewer. The user is chatting from the website.");
  const [inp, setInp] = useState("");
  const [color, setColor] = useState("#B8B8B8");
  const [mob, setMob] = useState<"chat" | "car">("chat");
  const end = useRef<HTMLDivElement>(null);
  const init = useRef(false);

  useEffect(() => {
    if (!init.current) {
      init.current = true;
      ai.send("Ciao, vorrei esplorare le auto ATFlow e configurarne una.");
    }
  }, [ai]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [ai.msgs, ai.typing]);

  const doSend = () => {
    if (!inp.trim()) return;
    ai.send(inp);
    setInp("");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: PALETTE.surface }}>
      <div className="h-14 border-b flex items-center justify-between px-4 sm:px-6 shrink-0" style={{ borderColor: PALETTE.border, background: PALETTE.bg }}>
        <Back onClick={onBack} />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: PALETTE.green }} />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: PALETTE.t1 }}>ATFlow Chat</span>
        </div>
        <div className="flex sm:hidden gap-1">
          {["chat", "car"].map(t => (
            <button key={t} onClick={() => setMob(t as any)} className={"p-2 rounded-lg " + (mob === t ? "bg-zinc-800 text-white" : "text-zinc-600")}>
              {t === "chat" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.025 47.37 47.37 0 00-7.706 0C7.012 4.777 5.75 6.197 5.75 7.847v4.454c0 1.06.55 2.04 1.43 2.624l-1.9 1.895A.75.75 0 014 16.06v-3.236a3.457 3.457 0 01-.495-.082C2.24 12.47 1.25 11.235 1.25 9.79V5.038C1.25 3.587 2.24 2.353 3.505 2.365z" /></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6.5 3c-1.045 0-2.062.317-2.776.869C2.96 4.42 2.5 5.26 2.5 6.25v2.5H1a.5.5 0 000 1h1.5v.5c0 .552.448 1 1 1h1c.552 0 1-.448 1-1v-.5h8v.5c0 .552.448 1 1 1h1c.552 0 1-.448 1-1v-.5H18a.5.5 0 000-1h-1.5v-2.5c0-.992-.509-1.83-1.224-2.381C14.562 3.317 13.545 3 12.5 3h-6z" /></svg>}
            </button>
          ))}
        </div>
        <div className="hidden sm:block w-16" />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className={(mob === "chat" ? "flex" : "hidden") + " sm:flex flex-col w-full sm:w-[44%] lg:w-[40%] border-r"} style={{ borderColor: PALETTE.border, background: PALETTE.bg }}>
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {ai.msgs.map(m => <ChatBubble key={m.id} msg={m} onOption={o => ai.send(o)} onCarColor={setColor} />)}
            {ai.typing && (
              <div className="flex gap-1 px-3 py-2">
                {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: PALETTE.t3, animation: `bounce 1.2s infinite ${i * 0.15}s` }} />)}
              </div>
            )}
            <div ref={end} />
          </div>
          <InputBar value={inp} onChange={setInp} onSend={doSend} />
        </div>
        <div className={(mob === "car" ? "flex" : "hidden") + " sm:flex flex-col flex-1 relative"} style={{ background: PALETTE.surface }}>
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: PALETTE.t1 }}>Anteprima Live</h2>
            <p className="text-[11px]" style={{ color: PALETTE.t3 }}>Trascina per ruotare</p>
          </div>
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex flex-col gap-1.5">
            {COLORS.map(c => (
              <button key={c.hex} onClick={() => { setColor(c.hex); ai.send("Ho scelto il colore " + c.name); }}
                className="w-6 h-6 rounded-full border-2 transition-all hover:scale-110"
                style={{ background: c.hex, borderColor: color === c.hex ? PALETTE.blue : PALETTE.border }} title={c.name} />
            ))}
          </div>
          <div className="flex-1"><Car3D color={color} bg="dark" /></div>
        </div>
      </div>
    </div>
  );
}
