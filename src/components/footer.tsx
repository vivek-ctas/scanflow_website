import { ScanLine } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Use Cases", href: "/#use-cases" },
    { label: "Reliability", href: "/#reliability" },
    { label: "Pricing", href: "/pricing" },
    { label: "Guide", href: "/guide" },
  ],
  Developers: [
    { label: "Documentation", href: "#" },
    { label: "API Docs", href: "#" },
    { label: "Support", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Company: [
    { label: "About", href: "https://www.ctasis.com/about-us" },
    { label: "Blog", href: "https://www.ctasis.com/blog" },
    { label: "Contact", href: "/contact" }
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white pt-16 pb-10 overflow-hidden">
      <div className="px-5 sm:px-8 lg:px-[70px]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">

            <Link href="/" className="flex items-center gap-2.5 w-fit">
              <img
                src="/ctasis-logo_white.svg"
                alt="scanflow"
                className="h-14 w-auto object-contain"
              />
              <span className="text-[1.8rem] font-bold tracking-tight font-outfit bg-gradient-to-r from-white via-[#8FE7FF] to-[#3C9AC4] bg-clip-text text-transparent">
                scanflow
              </span>
            </Link>


            <p className="text-sm text-slate-400 leading-relaxed max-w-[220px]">
              The world&apos;s fastest and most accurate barcode scanning engine.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-[#3C9AC4] animate-pulse" />
              <span className="text-xs text-[#3C9AC4] font-mono">
                99.9% uptime SLA
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white text-base">
                {category}
                <span className="mt-2 block h-0.5 w-6 rounded-full bg-gradient-to-r from-[#3C9AC4] to-[#6BC1E0]" />
              </h4>
              <ul className="space-y-3 mt-4">
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center text-slate-400 hover:text-[#3C9AC4] transition-colors text-sm"
                        >
                          <span className="text-[#3C9AC4] mr-1.5 transition-transform group-hover:translate-x-0.5">›</span>
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="group flex items-center text-slate-400 hover:text-[#3C9AC4] transition-colors text-sm"
                        >
                          <span className="text-[#3C9AC4] mr-1.5 transition-transform group-hover:translate-x-0.5">›</span>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © 2025 ScanPro Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400">Made for warehouse-scale reliability</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3C9AC4]" />
              <span className="text-xs text-slate-400">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}
