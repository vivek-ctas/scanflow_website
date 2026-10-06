import { SVGProps } from "react";

interface GearProps {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  color: string;
  dur: number;
  reverse?: boolean;
}

function Gear({ cx, cy, r, teeth, color, dur, reverse }: GearProps) {
  const toothW = r * 0.34;
  const toothH = r * 0.36;
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={reverse ? `360 ${cx} ${cy}` : `0 ${cx} ${cy}`}
        to={reverse ? `0 ${cx} ${cy}` : `360 ${cx} ${cy}`}
        dur={`${dur}s`}
        repeatCount="indefinite"
      />
      {Array.from({ length: teeth }).map((_, i) => {
        const angle = (360 / teeth) * i;
        return (
          <rect
            key={i}
            x={cx - toothW / 2}
            y={cy - r - toothH + 4}
            width={toothW}
            height={toothH}
            rx={1.4}
            fill={color}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r} fill={color} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="white" />
    </g>
  );
}

export const MaintenanceIllustration = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 320 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="mnt-accent" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(0 84% 60%)" />
        <stop offset="100%" stopColor="hsl(0 84% 50%)" />
      </linearGradient>
      <linearGradient id="mnt-accent-soft" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(0 84% 72%)" />
        <stop offset="100%" stopColor="hsl(0 84% 82%)" />
      </linearGradient>
      <linearGradient id="mnt-cloud" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="hsl(0 84% 97%)" />
      </linearGradient>
      <filter id="mnt-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" />
        <feOffset dy="6" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.14" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* dashed connection lines to satellite nodes */}
    <g stroke="hsl(0 40% 86%)" strokeWidth={1.4} strokeDasharray="4 5">
      <path d="M58 72 L118 102" />
      <path d="M262 72 L202 102" />
      <path d="M70 188 L128 162" />
      <path d="M250 188 L192 162" />
    </g>

    {/* satellite nodes */}
    <circle
      cx="56"
      cy="66"
      r="9"
      fill="white"
      stroke="hsl(0 55% 82%)"
      strokeWidth={1.4}
    />
    <circle cx="56" cy="66" r="3.2" fill="hsl(0 84% 60%)" />
    <circle
      cx="264"
      cy="66"
      r="9"
      fill="white"
      stroke="hsl(0 55% 82%)"
      strokeWidth={1.4}
    />
    <circle cx="264" cy="66" r="3.2" fill="hsl(0 84% 60%)" />
    <circle
      cx="64"
      cy="194"
      r="9"
      fill="white"
      stroke="hsl(0 55% 82%)"
      strokeWidth={1.4}
    />
    <circle cx="64" cy="194" r="3.2" fill="hsl(0 84% 60%)" />
    <circle
      cx="256"
      cy="194"
      r="9"
      fill="white"
      stroke="hsl(0 55% 82%)"
      strokeWidth={1.4}
    />
    <circle cx="256" cy="194" r="3.2" fill="hsl(0 84% 60%)" />

    {/* traveling signal pulses along the lines */}
    <circle r="2.6" fill="hsl(0 84% 60%)">
      <animateMotion
        path="M58 72 L118 102"
        dur="2.6s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;0"
        dur="2.6s"
        repeatCount="indefinite"
      />
    </circle>
    <circle r="2.6" fill="hsl(0 84% 60%)">
      <animateMotion
        path="M70 188 L128 162"
        dur="2.8s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;0"
        dur="2.8s"
        repeatCount="indefinite"
      />
    </circle>

    {/* cloud */}
    <g filter="url(#mnt-shadow)">
      <path
        d="M104 106 a24 24 0 0 1 20 -38 a32 32 0 0 1 62 4 a22 22 0 0 1 -3 46 h-70 a18 18 0 0 1 -9 -12z"
        fill="url(#mnt-cloud)"
        stroke="hsl(0 40% 88%)"
      />
    </g>

    {/* server rack */}
    <g filter="url(#mnt-shadow)">
      <rect
        x="120"
        y="118"
        width="80"
        height="72"
        rx="10"
        fill="white"
        stroke="hsl(0 30% 90%)"
      />
      <rect
        x="132"
        y="130"
        width="56"
        height="12"
        rx="4"
        fill="hsl(0 60% 96%)"
      />
      <circle cx="140" cy="136" r="2.4" fill="hsl(0 84% 60%)" />
      <rect
        x="132"
        y="148"
        width="56"
        height="12"
        rx="4"
        fill="hsl(0 60% 96%)"
      />
      <circle cx="140" cy="154" r="2.4" fill="hsl(0 84% 60%)" />
      <rect
        x="132"
        y="166"
        width="56"
        height="12"
        rx="4"
        fill="hsl(0 60% 96%)"
      />
      <circle cx="140" cy="172" r="2.4" fill="hsl(0 84% 60%)">
        <animate
          attributeName="opacity"
          values="1;0.25;1"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>

    {/* meshing gears */}
    <Gear cx={222} cy={98} r={15} teeth={8} color="url(#mnt-accent)" dur={9} />
    <Gear
      cx={246}
      cy={122}
      r={9}
      teeth={6}
      color="url(#mnt-accent-soft)"
      dur={6}
      reverse
    />
  </svg>
);
