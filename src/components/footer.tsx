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
    <footer className="border-t border-primary/10 pt-16 pb-10 bg-white/70">
      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">

            {/* <Link href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5">
                <div className="h-full w-full rounded-[10px] bg-background flex items-center justify-center">
                  <ScanLine className="w-4 h-4 text-secondary" />
                </div>
              </div>
              <span className="font-display text-lg font-bold text-primary">
                CTAS <span className="text-secondary">ScanPro</span>
              </span>
            </Link> */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <img
                src="/scanpro.png" // public folder ma tamaro logo
                alt="CTAS ScanPro Logo"
                className="w-auto h-12 object-contain transition-all duration-300 group-hover:scale-105"
              />

            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
              The world&apos;s fastest and most accurate barcode scanning engine.
            </p>
            <div className="mt-5 flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-secondary font-mono">
                99.9% uptime SLA
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-primary/55 uppercase tracking-widest mb-4 font-mono">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {/* {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))} */}
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
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

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 ScanPro Technologies, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground">Made for warehouse-scale reliability</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span className="text-xs text-muted-foreground">SOC 2 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
