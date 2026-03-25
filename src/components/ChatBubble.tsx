import React, { useEffect } from "react";
import { Message } from "../types";
import { PALETTE } from "../constants";
import Car3D from "./Car3D";

interface BubbleProps {
  msg: Message;
  onOption: (opt: string) => void;
  onCarColor?: (color: string) => void;
}

const ChatBubble: React.FC<BubbleProps> = ({ msg, onOption, onCarColor }) => {
  const isU = msg.sender === "user";

  useEffect(() => {
    if (!isU && msg.carColor) onCarColor?.(msg.carColor);
  }, [msg.carColor, isU, onCarColor]);

  return (
    <div className={"flex flex-col mb-4 " + (isU ? "items-end" : "items-start")}>
      {!isU && (
        <div className="flex items-center gap-1.5 mb-1 ml-1">
          <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#4B83FF,#2563EB)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5"><path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5z" clipRule="evenodd" /></svg>
          </div>
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: PALETTE.t3 }}>ATFlow AI</span>
        </div>
      )}
      <div className={"max-w-[85%] px-4 py-3 text-sm leading-relaxed " + (isU ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm border")}
        style={isU ? { background: PALETTE.blueD, color: PALETTE.white } : { background: PALETTE.card, color: PALETTE.t2, borderColor: PALETTE.cardBorder }}>
        {msg.text}
        {msg.isQuoteSent && (
          <div className="mt-3 p-3 rounded-xl border flex items-center gap-3" style={{ borderColor: PALETTE.green + "40", background: PALETTE.green + "10" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={PALETTE.green} className="w-5 h-5 shrink-0"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" /></svg>
            <div>
              <p className="text-xs font-bold" style={{ color: PALETTE.green }}>Preventivo inviato!</p>
              <p className="text-[10px]" style={{ color: PALETTE.t3 }}>Riceverai il preventivo via email entro 24h.</p>
            </div>
          </div>
        )}
      </div>
      {msg.showCar && (
        <div className="mt-2 w-72 h-44 rounded-xl overflow-hidden border" style={{ borderColor: PALETTE.cardBorder }}>
          <Car3D color={msg.carColor || "#B8B8B8"} bg="dark" />
        </div>
      )}
      {msg.options && msg.options.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {msg.options.map((o, i) => (
            <button key={i} onClick={() => onOption(o)} className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all hover:border-blue-500 hover:text-blue-400"
              style={{ borderColor: PALETTE.border, color: PALETTE.t2 }}>{o}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
