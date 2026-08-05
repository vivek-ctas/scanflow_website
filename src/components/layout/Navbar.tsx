"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Guide", href: "/guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-ink/10 py-3" : "py-5"
        }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* <Link href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-ink to-accent p-0.5 shadow-sm">
            <div className="h-full w-full rounded-[10px] bg-surface flex items-center justify-center">
              <ScanLine className="w-4 h-4 text-accent" />
            </div>
          </div>
          <span className="font-display text-lg font-bold text-ink tracking-tight">
            CTAS <span className="text-accent">ScanPro</span>
          </span>
        </Link> */}
        {/* Logo */}
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

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 relative group ${
                isActive(link.href) ? "text-ink font-semibold" : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-semibold bg-gradient-to-r from-ink to-accent text-white px-5 py-2.5 rounded-full hover:opacity-95 transition-all duration-200 hover:-translate-y-0.5 glow-sm"
          >
            Start Free Trial
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-ink/10 px-6 py-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm transition-colors ${
                    isActive(link.href) ? "text-ink font-semibold" : "text-muted hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 text-center font-semibold bg-gradient-to-r from-ink to-accent text-white px-5 py-3 rounded-full"
                onClick={() => setOpen(false)}
              >
                Start Free Trial
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
