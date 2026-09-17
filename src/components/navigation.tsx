"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Guide", href: "/guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-stripe"
    >
      <div className="px-[50px] lg:px-[70px] flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1 group shrink-0"
        >
          <Image
            src="/ctasis-logo_blue.svg"
            alt="scanflow"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
          />

          <span className="text-[1.8rem] font-bold tracking-tight font-outfit bg-gradient-to-r from-[#3C9AC4] to-[#13355A] bg-clip-text text-transparent">
            scanflow
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-200 relative group ${isActive(link.href) ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-secondary transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-full hover:opacity-95 transition-all duration-200 hover:-translate-y-0.5 glow-sm"
          >
            Get started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary"
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
            className="md:hidden glass border-t border-primary/10 px-6 py-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm transition-colors ${isActive(link.href) ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 text-center font-semibold bg-gradient-to-r from-primary to-secondary text-white px-5 py-3 rounded-full"
                onClick={() => setOpen(false)}
              >
                Get started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
