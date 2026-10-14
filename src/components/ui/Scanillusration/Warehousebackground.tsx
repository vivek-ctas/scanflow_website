// WarehouseBackground.tsx
// Real warehouse jevu look: multi-bay steel rack, 3 levels, alag-alag size na boxes,
// aisle sign, hazard-stripe pillars, depth mate faded back rack ane floor.
import type { SVGProps } from "react";

// [x, level(0-2), width, height, variant(0 yellow | 1 orange | 2 cardboard)]
type BoxSpec = [number, number, number, number, 0 | 1 | 2];

const LEVELS = [155, 290, 425]; // beam top y (boxes aa line par bese)
const PILLARS = [40, 253, 466, 680];

const BOXES: BoxSpec[] = [
  // top level
  [60, 0, 62, 50, 0],
  [128, 0, 80, 65, 1],
  [272, 0, 70, 55, 2],
  [350, 0, 56, 43, 0],
  [412, 0, 40, 59, 1],
  [486, 0, 76, 63, 1],
  [570, 0, 64, 49, 0],
  // middle level
  [58, 1, 56, 52, 2],
  [122, 1, 86, 70, 0],
  [272, 1, 60, 60, 1],
  [340, 1, 50, 46, 0],
  [398, 1, 52, 64, 2],
  [486, 1, 66, 50, 0],
  [560, 1, 80, 68, 1],
  // bottom level
  [60, 2, 100, 69, 1],
  [168, 2, 64, 53, 0],
  [270, 2, 64, 59, 2],
  [342, 2, 100, 75, 1],
  [488, 2, 70, 63, 0],
  [566, 2, 80, 53, 2],
];

const BOX_FILL = ["url(#wb-boxA)", "url(#wb-boxB)", "url(#wb-boxC)"];
const BOX_STROKE = ["#f2a93b", "#e57f12", "#d49a5e"];

function Box({ spec }: { spec: BoxSpec }) {
  const [x, lvl, w, h, v] = spec;
  const y = LEVELS[lvl] - h;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="3"
        fill={BOX_FILL[v]}
        stroke={BOX_STROKE[v]}
        strokeWidth="1"
      />
      {/* packing tape */}
      <rect
        x={x + w / 2 - 4}
        y={y}
        width="8"
        height={h}
        fill="#fff"
        opacity="0.28"
      />
      {/* barcode label */}
      {w >= 56 && (
        <g>
          <rect
            x={x + 6}
            y={y + h - 18}
            width="26"
            height="12"
            rx="2"
            fill="#fff"
            opacity="0.92"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={x + 9 + i * 3.6}
              y={y + h - 16}
              width={i % 2 ? 1 : 2}
              height="8"
              fill="#1e293b"
            />
          ))}
        </g>
      )}
    </g>
  );
}

export default function WarehouseBackground(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 720 480"
      preserveAspectRatio="xMinYMin meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      {...props}
    >
      <defs>
        <linearGradient id="wb-boxA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffeaa8" />
          <stop offset="1" stopColor="#f9b640" />
        </linearGradient>
        <linearGradient id="wb-boxB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#ee8a1c" />
        </linearGradient>
        <linearGradient id="wb-boxC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f9d7ae" />
          <stop offset="1" stopColor="#dca065" />
        </linearGradient>
        <linearGradient id="wb-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dfe9f6" />
          <stop offset="1" stopColor="#dfe9f6" stopOpacity="0" />
        </linearGradient>
        <pattern
          id="wb-hazard"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect width="6" height="12" fill="#fbbf24" />
          <rect x="6" width="6" height="12" fill="#3b5b8c" />
        </pattern>
      </defs>

      {/* floor */}
      <rect x="0" y="448" width="720" height="32" fill="url(#wb-floor)" />
      <line
        x1="0"
        y1="466"
        x2="720"
        y2="466"
        stroke="#f4c84a"
        strokeWidth="2"
        strokeDasharray="16 10"
        opacity="0.5"
      />
      <ellipse
        cx="360"
        cy="452"
        rx="340"
        ry="8"
        fill="#13355A"
        opacity="0.08"
      />

      {/* far back rack (depth) */}
      <g opacity="0.35">
        {[10, 175, 340, 505, 700].map((x) => (
          <rect key={x} x={x} y="80" width="5" height="365" fill="#b9d7fb" />
        ))}
        {[200, 320, 440].map((y) => (
          <rect key={y} x="10" y={y} width="695" height="6" fill="#a9cdf8" />
        ))}
        {[
          [24, 150],
          [96, 160],
          [190, 144],
          [262, 156],
          [356, 150],
          [420, 160],
          [520, 146],
          [600, 158],
          [30, 270],
          [110, 262],
          [200, 268],
          [370, 264],
          [450, 272],
          [540, 262],
          [620, 270],
          [40, 390],
          [130, 384],
          [215, 392],
          [360, 386],
          [470, 392],
          [560, 384],
        ].map(([x, y], i) => (
          <rect
            key={i}
            x={x}
            y={y + (y > 300 ? 36 : y > 200 ? 28 : 20) - 40}
            width="46"
            height="36"
            rx="3"
            fill="#f6c58a"
          />
        ))}
      </g>

      {/* main rack – roof beam */}
      <rect x="40" y="40" width="648" height="8" fill="#9cc6f7" />

      {/* boxes (pillars/beams ni pachal) */}
      {BOXES.map((b, i) => (
        <Box key={i} spec={b} />
      ))}

      {/* shelf beams */}
      {LEVELS.map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="648" height="10" fill="#9cc6f7" />
          <rect x="40" y={y} width="648" height="2.5" fill="#d3e7fd" />
        </g>
      ))}

      {/* pillars */}
      {PILLARS.map((x) => (
        <g key={x}>
          <rect x={x} y="40" width="8" height="410" fill="#b9d7fb" />
          <rect x={x} y="40" width="2.5" height="410" fill="#e0efff" />
          <rect x={x} y="428" width="8" height="22" fill="url(#wb-hazard)" />
        </g>
      ))}

      {/* hanging aisle sign */}
      <line
        x1="118"
        y1="48"
        x2="118"
        y2="60"
        stroke="#a9c1e0"
        strokeWidth="1.5"
      />
      <line
        x1="176"
        y1="48"
        x2="176"
        y2="60"
        stroke="#a9c1e0"
        strokeWidth="1.5"
      />
      <rect
        x="104"
        y="58"
        width="86"
        height="26"
        rx="6"
        fill="#fff"
        stroke="#bcd6f5"
      />
      <text
        x="147"
        y="76"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill="#13355A"
        fontFamily="inherit"
      >
        AISLE A-12
      </text>
    </svg>
  );
}
