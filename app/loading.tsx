function WaveLoaderInner() {
    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-white/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">

                {/* Wave bars */}
                <div className="flex items-end gap-[5px]" style={{ height: 52 }}>
                    {[
                        { color: "#13355A", delay: "0s" },
                        { color: "#1B4A75", delay: "0.1s" },
                        { color: "#2C6A94", delay: "0.2s" },
                        { color: "#3C9AC4", delay: "0.3s" },
                        { color: "#6BC1E0", delay: "0.4s" },
                        { color: "#3C9AC4", delay: "0.5s" },
                        { color: "#2C6A94", delay: "0.6s" },
                        { color: "#1B4A75", delay: "0.7s" },
                        { color: "#13355A", delay: "0.8s" },
                    ].map((bar, i) => (
                        <div
                            key={i}
                            className="wave-bar"
                            style={{
                                background: bar.color,
                                animationDelay: bar.delay,
                            }}
                        />
                    ))}
                </div>

                {/* Shimmer label */}
                <span className="shimmer-text text-xs font-medium uppercase tracking-widest">
                    Scanning
                </span>
            </div>

            <style>{`
        .wave-bar {
          width: 7px;
          height: 44px;
          border-radius: 4px;
          transform-origin: bottom;
          animation: waveBar 1.1s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            #13355A 0%,
            #3C9AC4 40%,
            #13355A 60%,
            #3C9AC4 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 2.4s linear infinite;
        }

        @keyframes waveBar {
          0%,100% { transform: scaleY(0.35); }
          50% { transform: scaleY(1); }
        }

        @keyframes shimmerText {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
        </div>
    );
}

export default function WaveLoader() {
    return (
        <WaveLoaderInner />
    );
}
