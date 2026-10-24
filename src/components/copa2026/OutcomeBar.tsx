// Stacked horizontal probability bar: home win / draw / away win.

interface OutcomeBarProps {
  pHome: number;
  pDraw: number;
  pAway: number;
  homeLabel?: string;
  drawLabel?: string;
  awayLabel?: string;
  /** Hide the draw segment (e.g. a two-way "to advance" bar). */
  twoWay?: boolean;
}

const HOME = '#2dd4bf'; // teal
const DRAW = '#475569'; // slate
const AWAY = '#8b5cf6'; // purple

export default function OutcomeBar({
  pHome,
  pDraw,
  pAway,
  homeLabel = 'Win',
  drawLabel = 'Draw',
  awayLabel = 'Win',
  twoWay = false,
}: OutcomeBarProps) {
  const seg = (p: number, color: string, textColor = '#08080f') =>
    p > 0.001 ? (
      <div
        className="h-full flex items-center justify-center text-[10px] font-semibold overflow-hidden"
        style={{ width: `${p * 100}%`, background: color, color: textColor }}
      >
        {p >= 0.12 ? `${Math.round(p * 100)}%` : ''}
      </div>
    ) : null;

  return (
    <div className="w-full">
      <div className="flex h-5 rounded-md overflow-hidden" style={{ background: '#0a0a16' }}>
        {seg(pHome, HOME)}
        {!twoWay && seg(pDraw, DRAW, '#f1f5f9')}
        {seg(pAway, AWAY)}
      </div>
      <div className="flex justify-between gap-2 mt-1.5 text-[10px] font-medium">
        <span className="truncate" style={{ color: HOME }}>
          {homeLabel} {Math.round(pHome * 100)}%
        </span>
        {!twoWay && (
          <span className="text-[#94a3b8] shrink-0">
            {drawLabel} {Math.round(pDraw * 100)}%
          </span>
        )}
        <span className="truncate text-right" style={{ color: AWAY }}>
          {awayLabel} {Math.round(pAway * 100)}%
        </span>
      </div>
    </div>
  );
}
