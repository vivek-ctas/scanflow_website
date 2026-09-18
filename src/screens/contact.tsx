"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import { BoxWithPhoneIllustration } from "@/components/ui/illustration";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  CheckCircle2,
  Building,
  User,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Zap,
} from "lucide-react";
import Link from "next/link";

const contactCards = [
  {
    id: "email",
    icon: Mail,
    tag: "Email us directly",
    heading: "info@ctasis.com",
    sub: "For general inquiries, quotes & technical support.",
    href: "mailto:info@ctasis.com",
    accent: "#3C9AC4",
    bgAccent: "bg-[#3C9AC4]/10 text-[#3C9AC4]",
  },
  {
    id: "phone",
    icon: Phone,
    tag: "Call our team",
    heading: "+91 7948993409",
    sub: "Mon – Fri, 10 AM – 8 PM IST. Real humans, real answers.",
    href: "tel:+917948993409",
    accent: "#10B981",
    bgAccent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "visit",
    icon: MapPin,
    tag: "Visit our HQ",
    heading: "Gota, Ahmedabad",
    sub: "A-865/866, Money Plant High Street, Jagatpur Rd, near BSNL Office, Gujarat 382470",
    href: "https://maps.google.com/?q=Money+Plant+High+Street+Gota+Ahmedabad",
    accent: "#13355A",
    bgAccent: "bg-primary/10 text-primary",
  },
  {
    id: "hours",
    icon: Clock,
    tag: "Business Hours",
    heading: "10:00 AM – 8:00 PM IST",
    sub: "Monday through Friday. Guaranteed response within 24 hours.",
    href: null,
    accent: "#D97706",
    bgAccent: "bg-amber-500/10 text-amber-600",
  },
];

const INQUIRY_TYPES = [
  "Sales & Pricing",
  "Request a Demo",
  "Technical Support",
  "SDK Integration",
  "Partnership & Reseller",
  "General Inquiry",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "Sales & Pricing",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  return (
    <Layout>
      <div className="pt-24 bg-[#F7F9FC]">
        {/* Hero Section */}
        <PageHero
          badgeIcon={Sparkles}
          badgeText="Get In Touch"
          title={
            <>
              Let&apos;s talk about your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                barcode scanning workflow.
              </span>
            </>
          }
          subtitle="Have questions about ScanFlow integration, custom licensing, volume pricing, or need an enterprise demo? Our engineering and sales team is here to assist."
          badgeClassName="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-primary border border-primary/15 shadow-sm"
          titleClassName="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-primary mb-6 leading-[1.1] tracking-tight"
          subtitleClassName="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl"
          visual={
            <div className="relative animate-float-slow w-full max-w-2xl lg:max-w-3xl lg:scale-105">
              <BoxWithPhoneIllustration className="w-full h-auto drop-shadow-xl" />
            </div>
          }
        >
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span>&lt; 2 Hour First Response</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <span>Direct Engineer Support</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>Enterprise SLA Available</span>
            </div>
          </div>
        </PageHero>

        {/* Main Content: Form + Map & Details */}
        <section className="relative py-16 lg:py-24 px-4 sm:px-8 lg:px-[70px] max-w-[1440px] mx-auto overflow-hidden">
          {/* Subtle Ambient Light Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            
            {/* ── Left Column: Contact Form ── */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_12px_40px_rgba(19,53,90,0.06)]">
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3.5 py-1 text-xs font-semibold text-secondary ring-1 ring-secondary/20 mb-3">
                  <MessageSquare className="w-3.5 h-3.5" />
                  SEND A MESSAGE
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                  How can we help your team?
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Fill out the form below and our team will get back to you with custom pricing or SDK access.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 sm:p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Message Received!</h3>
                    <p className="text-slate-700 text-base max-w-md mx-auto mb-6">
                      Thank you for contacting us, <strong>{formData.name || "friend"}</strong>. One of our technical leads will review your requirements and reach out at <strong>{formData.email}</strong> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          phone: "",
                          inquiryType: "Sales & Pricing",
                          message: "",
                        });
                      }}
                      className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-secondary transition-all shadow-md"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            required
                            placeholder="Alex Morgan"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Work Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Company / Organization
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            placeholder="Acme Logistics Inc."
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary focus:bg-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Inquiry Type Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                        Inquiry Type
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {INQUIRY_TYPES.map((type) => {
                          const isSelected = formData.inquiryType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, inquiryType: type })}
                              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                                isSelected
                                  ? "bg-secondary text-white shadow-sm shadow-secondary/30 scale-102"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Message & Project Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your barcode formats (e.g. Code 128, EAN-13, GS1), camera workflow, expected monthly volume, or any questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-[#1B4A75] to-secondary px-8 py-4 text-white font-semibold text-base shadow-lg shadow-primary/20 hover:opacity-95 hover:shadow-xl transition-all duration-200 disabled:opacity-60 cursor-pointer"
                      >
                        {status === "submitting" ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Request</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-slate-600 mt-3 flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>256-bit SSL encrypted. We respect your privacy. No spam.</span>
                      </p>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* ── Right Column: Info Cards + Live Map ── */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Direct Info Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactCards.map((item) => {
                  const Icon = item.icon;
                  const Wrapper = item.href ? "a" : "div";
                  const wrapperProps = item.href
                    ? {
                        href: item.href,
                        target: item.href.startsWith("http") ? "_blank" : undefined,
                        rel: "noopener noreferrer",
                      }
                    : {};

                  return (
                    <Wrapper
                      key={item.id}
                      {...wrapperProps}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-[0_4px_16px_rgba(19,53,90,0.04)] hover:shadow-md hover:border-secondary/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.bgAccent}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {item.href && (
                            <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-secondary transition-colors" />
                          )}
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          {item.tag}
                        </p>
                        <p className="font-bold text-primary text-sm sm:text-base mb-1 truncate">
                          {item.heading}
                        </p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.sub}
                        </p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Interactive Google Map Embed Card */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-[0_8px_30px_rgba(19,53,90,0.06)] overflow-hidden">
                <div className="flex items-center justify-between px-2 pb-3.5 mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      CTAS Technologies Office Location
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Money+Plant+High+Street+Gota+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors"
                  >
                    Open in Maps <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Map iframe */}
                <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100">
                  <iframe
                    title="CTAS Technologies Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.3644158461877!2d72.53123897600863!3d23.083756814032126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8346f17845f9%3A0xe4a19c50403328e7!2sMoney%20Plant%20High%20Street!5e0!3m2!1sen!2sin!4v1710777600000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                  {/* Location floating pin badge */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-xl px-3.5 py-2 border border-slate-200/80 shadow-lg pointer-events-none flex items-center gap-2 text-xs">
                    <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                    <div>
                      <p className="font-bold text-primary">Money Plant High Street</p>
                      <p className="text-[11px] text-slate-500">Gota, Ahmedabad, Gujarat</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="px-4 sm:px-8 lg:px-[70px] max-w-[1440px] mx-auto pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-[#163E66] to-[#1B4A75] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#8FE7FF] mb-3 backdrop-blur-sm">
                <Zap className="w-3.5 h-3.5" />
                EXPLORE SDK DOCUMENTATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                Ready to evaluate ScanFlow in code?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Check out our quick setup guide to test camera feeds, explore live multi-barcode scanning, and integrate WebAssembly runtime in 10 minutes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-semibold px-7 py-3.5 text-sm hover:bg-[#8FE7FF] transition-all shadow-md"
              >
                View Getting Started Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 text-sm hover:bg-white/20 transition-colors"
              >
                Compare Plans
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
