import { useState, useCallback, useRef } from "react";
import { Message } from "../types";
import { getGeminiResponse } from "../services/gemini";

export function useAI(extraContext: string = "") {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const history = useRef<{ role: string, content: string }[]>([]);

  const send = useCallback(async (text: string, silent: boolean = false) => {
    if (!silent) {
      setMsgs(p => [...p, { id: Date.now(), text, sender: "user" }]);
    }
    
    setTyping(true);

    try {
      const parsed = await getGeminiResponse(text, history.current, extraContext);
      
      const aiText = parsed.message || "Come posso aiutarti?";
      
      // Update history for Gemini
      history.current.push({ role: "user", content: text });
      history.current.push({ role: "model", content: JSON.stringify(parsed) });

      setMsgs(p => [...p, {
        id: Date.now() + 1,
        text: aiText,
        sender: "ai",
        options: parsed.options || null,
        showCar: parsed.showCar || false,
        carColor: parsed.carColor || null,
        isQuoteSent: parsed.isQuoteSent || false,
      }]);
    } catch (error) {
      setMsgs(p => [...p, { id: Date.now() + 1, text: "Connessione interrotta. Riprova.", sender: "ai" }]);
    } finally {
      setTyping(false);
    }
  }, [extraContext]);

  return { msgs, typing, send };
}
