import Image from "next/image";
import "./ScanFlowLoader.css";

type ScanFlowLoaderProps = {
  className?: string;
};

const BARS: Array<{ w: string; d: string }> = [
  { w: "3px", d: "0ms" },
  { w: "5px", d: "40ms" },
  { w: "2px", d: "80ms" },
  { w: "6px", d: "120ms" },
  { w: "2px", d: "160ms" },
  { w: "4px", d: "200ms" },
  { w: "2px", d: "240ms" },
  { w: "3px", d: "280ms" },
  { w: "5px", d: "320ms" },
  { w: "2px", d: "360ms" },
  { w: "3px", d: "400ms" },
  { w: "6px", d: "440ms" },
  { w: "2px", d: "480ms" },
  { w: "4px", d: "520ms" },
  { w: "3px", d: "560ms" },
];

/**
 * Ported from the ScanFlow panel's FuseLoading: a branded barcode-scanner
 * loading state (logo, animated bars, scan line, "Loading…").
 */
export default function ScanFlowLoader({ className }: ScanFlowLoaderProps) {
  return (
    <div className={`fuse-loading${className ? ` ${className}` : ""}`}>
      <div className="fuse-loading-splash">
        <div className="fuse-loading-brand">
          <Image
            src="/ctasis-logo_blue.svg"
            alt="ScanFlow"
            width={48}
            height={48}
            priority
          />
          <span className="fuse-loading-brand-name">ScanFlow</span>
        </div>

        <div className="scan-stage">
          <div className="barcode-bars">
            {BARS.map((bar, i) => (
              <span
                key={i}
                style={
                  {
                    "--bar-w": bar.w,
                    "--bar-d": bar.d,
                  } as React.CSSProperties
                }
              ></span>
            ))}
          </div>
          <div className="scan-frame">
            <span className="scan-corner tl"></span>
            <span className="scan-corner tr"></span>
            <span className="scan-corner bl"></span>
            <span className="scan-corner br"></span>
          </div>
          <div className="scan-line"></div>
        </div>

        <div className="fuse-loading-label">Loading</div>
      </div>
    </div>
  );
}
