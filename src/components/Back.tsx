import { PALETTE } from "../constants";

export default function Back({ onClick, light = false }: { onClick: () => void, light?: boolean }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-70" style={{ color: light ? "#64748B" : PALETTE.t3 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" /></svg>
      <span className="hidden sm:inline">Indietro</span>
    </button>
  );
}
