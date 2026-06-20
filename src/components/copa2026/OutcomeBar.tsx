// Stacked horizontal probability bar: home win / draw / away win.

interface OutcomeBarProps {
  pHome: number;
  pDraw: number;
  pAway: number;
}

const HOME = '#2dd4bf'; // teal
const DRAW = '#475569'; // slate
const AWAY = '#8b5cf6'; // purple

export default function OutcomeBar({ pHome, pDraw, pAway }: OutcomeBarProps) {
  const seg = (p: number, color: string) =>
    p > 0.001 ? (
      <div
        className="h-full flex items-center justify-center text-[10px] font-semibold text-[#08080f] overflow-hidden"
        style={{ width: `${p * 100}%`, background: color }}
      >
        {p >= 0.12 ? `${Math.round(p * 100)}%` : ''}
      </div>
    ) : null;

  return (
    <div className="w-full">
      <div className="flex h-5 rounded-md overflow-hidden" style={{ background: '#0a0a16' }}>
        {seg(pHome, HOME)}
        {seg(pDraw, DRAW)}
        {seg(pAway, AWAY)}
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] font-medium">
        <span style={{ color: HOME }}>Win {Math.round(pHome * 100)}%</span>
        <span className="text-[#94a3b8]">Draw {Math.round(pDraw * 100)}%</span>
        <span style={{ color: AWAY }}>Win {Math.round(pAway * 100)}%</span>
      </div>
    </div>
  );
}
