import { PALETTE } from "../constants";

interface InputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  onMic?: () => void;
  micOn?: boolean;
  dark?: boolean;
}

export default function InputBar({ value, onChange, onSend, onMic, micOn, dark = true }: InputBarProps) {
  return (
    <div className="p-3 border-t flex gap-2 items-center" style={{ borderColor: dark ? PALETTE.border : "#E2E8F0" }}>
      {onMic && (
        <button onClick={onMic} className={"p-2 rounded-full border transition-all hover:scale-105 " + (micOn ? "animate-pulse" : "")} style={{ borderColor: micOn ? "#EF4444" : (dark ? PALETTE.border : "#E2E8F0"), background: micOn ? "#EF444420" : "transparent" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={micOn ? "#EF4444" : PALETTE.blue} className="w-4 h-4"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" /><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" /></svg>
        </button>
      )}
      <input value={value} onChange={e => onChange(e.target.value)} onKeyDown={e => e.key === "Enter" && onSend()}
        placeholder="Scrivi un messaggio..." className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors focus:border-blue-500"
        style={{ background: dark ? PALETTE.inputBg : "#F1F5F9", color: dark ? PALETTE.white : "#0F172A", borderColor: dark ? PALETTE.border : "#E2E8F0" }} />
      <button onClick={onSend} className="p-2.5 rounded-xl text-white transition-all hover:opacity-80" style={{ background: PALETTE.blueD }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" /></svg>
      </button>
    </div>
  );
}
