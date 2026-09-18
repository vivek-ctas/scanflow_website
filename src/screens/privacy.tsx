"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  Cpu,
  FileText,
  CheckCircle2,
  Mail,
  ArrowRight,
  Sparkles,
  Globe,
  Database,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { id: "overview", title: "1. Overview & Commitment", icon: Eye },
  { id: "on-device", title: "2. On-Device Edge Architecture", icon: Cpu },
  { id: "collection", title: "3. Information We Collect", icon: Database },
  { id: "usage", title: "4. How We Use Data", icon: RefreshCw },
  { id: "sharing", title: "5. Third-Party Sharing", icon: Globe },
  { id: "security", title: "6. Security & Storage", icon: Lock },
  { id: "rights", title: "7. Your Privacy Rights (GDPR/CCPA)", icon: ShieldCheck },
  { id: "retention", title: "8. Retention & Deletion", icon: FileText },
  { id: "contact", title: "9. Contact & DPO", icon: Mail },
];

export default function PrivacyScreen() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <div className="pt-24 bg-[#F7F9FC]">
        {/* Page Hero */}
        <PageHero
          badgeIcon={ShieldCheck}
          badgeText="Privacy & Security"
          title={
            <>
              ScanFlow{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </>
          }
          subtitle="We believe in privacy by design. Learn how ScanFlow processes barcodes locally on your device with zero cloud storage of your raw camera feeds or image data."
          badgeClassName="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-primary border border-primary/15 shadow-sm"
          titleClassName="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-primary mb-6 leading-[1.1] tracking-tight"
          subtitleClassName="text-lg sm:text-xl text-slate-600 mb-6 leading-relaxed max-w-2xl"
          centered
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Effective: March 1, 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 text-secondary" />
              Last Updated: March 2026
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-xs">
              <FileText className="w-3.5 h-3.5 text-primary" />
              7 min read
            </span>
          </div>
        </PageHero>

        {/* Highlight Guarantee Cards */}
        <section className="px-4 sm:px-8 lg:px-[70px] max-w-[1440px] mx-auto -mt-12 mb-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.06)] hover:border-secondary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">100% On-Device Decoding</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                ScanFlow computer vision models run directly on client hardware (WebAssembly/Native). Camera frames never leave the device.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.06)] hover:border-secondary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">Zero Barcode Image Storage</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We do not collect, archive, or analyze photographs of your warehouse parcels, labels, or customer packages.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.06)] hover:border-secondary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">GDPR & CCPA Compliant</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Built to satisfy strict global enterprise standards including SOC 2 Type II controls and CCPA/GDPR privacy mandates.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="px-4 sm:px-8 lg:px-[70px] max-w-[1440px] mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Sticky Table of Contents */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.04)]">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                  <FileText className="w-4 h-4 text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Table of Contents
                  </span>
                </div>
                <nav className="flex flex-col space-y-1">
                  {SECTIONS.map((sec) => {
                    const Icon = sec.icon;
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-200 ${
                          isActive
                            ? "bg-secondary/10 text-secondary border border-secondary/20 shadow-xs"
                            : "text-slate-600 hover:text-primary hover:bg-slate-50"
                        }`}
                      >
                        <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-secondary" : "text-slate-400 group-hover:text-primary"}`} />
                        <span className="truncate">{sec.title}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
                    <p className="text-xs font-semibold text-primary mb-1">Have compliance questions?</p>
                    <p className="text-xs text-slate-500 mb-3">Our security team responds within 24 hours.</p>
                    <a
                      href="mailto:privacy@ctasis.com"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition-colors"
                    >
                      privacy@ctasis.com <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Document Body */}
            <main className="lg:col-span-8 space-y-12 text-slate-700 leading-relaxed text-base">
              
              {/* 1. Overview */}
              <section id="overview" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">1. Overview & Commitment to Privacy</h2>
                </div>
                <p className="mb-4">
                  Welcome to ScanFlow (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a high-performance computer vision barcode scanning software product provided by <strong>CTAS</strong>. We are deeply committed to protecting the privacy, security, and confidentiality of our users, developers, and enterprise customers.
                </p>
                <p className="mb-4">
                  This Privacy Policy details the types of information we may collect when you visit <Link href="/" className="text-secondary hover:underline font-semibold">ctasis.com</Link>, integrate the ScanFlow Web/Mobile SDKs, or use our cloud licensing dashboard, and describes how that information is handled, stored, and protected.
                </p>
                <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/20 flex gap-3.5 items-start mt-6">
                  <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    <strong>Core Privacy Philosophy:</strong> ScanFlow is designed from the ground up as an edge-computing engine. Barcode detection, localization, and decoding occur strictly in client-side memory.
                  </p>
                </div>
              </section>

              {/* 2. On-Device Architecture */}
              <section id="on-device" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">2. On-Device Edge Architecture</h2>
                </div>
                <p className="mb-4">
                  Unlike traditional cloud-vision APIs that require sending high-resolution video streams or photographs over the public internet to third-party servers, ScanFlow executes completely inside the end-user&apos;s browser sandbox or mobile application container.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Camera video frames are rendered to local memory buffers and analyzed frame-by-frame.",
                    "No image pixels, snapshots, video feeds, or package labels are ever transmitted to CTAS servers.",
                    "The camera stream is immediately closed and released when scanning is stopped by the host application.",
                    "Decoded string payloads (e.g. GTIN, UPC, EAN-13 values) belong exclusively to your application and are never harvested.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. Information We Collect */}
              <section id="collection" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Database className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">3. Information We Collect</h2>
                </div>
                <p className="mb-4">
                  We collect only the minimal amount of data necessary to authenticate licenses, bill for services, and provide technical support:
                </p>

                <div className="space-y-4 my-6">
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-primary text-sm mb-1">A. Account & Contact Information</h4>
                    <p className="text-sm text-slate-600">
                      When you sign up for a trial, request a quote, or purchase a subscription, we collect your name, business email, company name, phone number, and billing details.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-primary text-sm mb-1">B. License Verification & Operational Telemetry</h4>
                    <p className="text-sm text-slate-600">
                      For software activation and usage tier verification, the SDK may periodically communicate with our license server. Telemetry transmitted is limited to SDK version, license key ID, platform type (iOS, Android, Web), and aggregate scan counter metrics.
                    </p>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-4">
                    <h4 className="font-bold text-primary text-sm mb-1">C. Website Analytics & Cookies</h4>
                    <p className="text-sm text-slate-600">
                      When browsing our marketing website, standard server logs and privacy-friendly analytics collect IP addresses (anonymized), browser user-agents, and page visit duration to optimize website performance.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. How We Use Data */}
              <section id="usage" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">4. How We Use Your Information</h2>
                </div>
                <p className="mb-4">
                  We use collected information strictly for legitimate commercial and operational purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-slate-600 mb-6">
                  <li>Provisioning your ScanFlow API keys and customer portal credentials.</li>
                  <li>Processing monthly or annual subscription billings and tax invoices.</li>
                  <li>Monitoring system reliability, uptime SLA commitments (99.9%), and fraud prevention.</li>
                  <li>Delivering security patches, engine performance improvements, and critical updates.</li>
                  <li>Providing 24/7 developer and enterprise customer support.</li>
                </ul>
              </section>

              {/* 5. Sharing */}
              <section id="sharing" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">5. Data Sharing & Third Parties</h2>
                </div>
                <p className="mb-4 font-semibold text-primary">
                  We do not sell, rent, monetize, or trade your personal information or business data to data brokers or advertising networks.
                </p>
                <p className="mb-4 text-sm text-slate-600">
                  We only share essential information with audited, SOC 2 compliant sub-processors that assist us in operating our business:
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-primary">
                        <th className="p-3.5 font-bold">Partner / Provider</th>
                        <th className="p-3.5 font-bold">Purpose</th>
                        <th className="p-3.5 font-bold">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3.5 font-medium text-primary">Stripe</td>
                        <td className="p-3.5">Payment processing & PCI-DSS compliance</td>
                        <td className="p-3.5">United States / Global</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-primary">AWS / Cloudflare</td>
                        <td className="p-3.5">Encrypted cloud hosting & edge CDN delivery</td>
                        <td className="p-3.5">United States / EU</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-medium text-primary">Postmark / Resend</td>
                        <td className="p-3.5">Transactional license & notification emails</td>
                        <td className="p-3.5">United States</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 6. Security */}
              <section id="security" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">6. Data Security & Storage</h2>
                </div>
                <p className="mb-4">
                  We deploy industry-standard technical and organizational measures to safeguard data against unauthorized access, destruction, or alteration:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <h5 className="font-bold text-primary text-sm mb-1">Encryption In Transit</h5>
                    <p className="text-xs text-slate-600">All network traffic to our portals is encrypted with TLS 1.3 with Perfect Forward Secrecy.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <h5 className="font-bold text-primary text-sm mb-1">Encryption At Rest</h5>
                    <p className="text-xs text-slate-600">Account and licensing records are encrypted at rest using AES-256 standards.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <h5 className="font-bold text-primary text-sm mb-1">Role-Based Access</h5>
                    <p className="text-xs text-slate-600">Strict least-privilege RBAC controls and mandatory multi-factor authentication (MFA) for staff.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    <h5 className="font-bold text-primary text-sm mb-1">Penetration Testing</h5>
                    <p className="text-xs text-slate-600">Regular third-party vulnerability audits and code analysis for zero-day vulnerabilities.</p>
                  </div>
                </div>
              </section>

              {/* 7. Rights */}
              <section id="rights" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">7. Your Privacy Rights (GDPR & CCPA)</h2>
                </div>
                <p className="mb-4">
                  Depending on your geographic jurisdiction, you hold specific statutory rights regarding your personal information:
                </p>
                <div className="space-y-3 mb-6 text-sm text-slate-600">
                  <p><strong>Right to Access:</strong> Request a copy of personal information we store concerning your account.</p>
                  <p><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete billing/contact records.</p>
                  <p><strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request permanent deletion of your account and credentials.</p>
                  <p><strong>Right to Data Portability:</strong> Receive your operational telemetry records in a structured, machine-readable JSON format.</p>
                  <p><strong>Non-Discrimination:</strong> We will never penalize or degrade services if you choose to exercise your statutory rights.</p>
                </div>
                <p className="text-sm">
                  To exercise any of these rights, email us directly at{" "}
                  <a href="mailto:privacy@ctasis.com" className="text-secondary font-semibold hover:underline">
                    privacy@ctasis.com
                  </a>.
                </p>
              </section>

              {/* 8. Retention */}
              <section id="retention" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">8. Data Retention & Deletion</h2>
                </div>
                <p className="mb-4">
                  We retain account credentials and billing records for as long as your organization maintains an active subscription or trial. If an account is closed or terminated, we purge all non-essential account records within 60 days, retaining only those required by statutory financial, tax, and audit obligations.
                </p>
              </section>

              {/* 9. Contact */}
              <section id="contact" className="bg-gradient-to-br from-[#13355A] to-[#1B4A75] text-white rounded-3xl p-8 sm:p-10 shadow-xl scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#6BC1E0]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">9. Contact Our Privacy Team & DPO</h2>
                </div>
                <p className="text-slate-200 mb-6 leading-relaxed">
                  If you have questions, concerns, or requests regarding this Privacy Policy or ScanFlow&apos;s edge-processing data model, please get in touch with our Data Protection Officer:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xs border border-white/10">
                    <p className="text-xs text-[#8FE7FF] uppercase font-bold tracking-wider mb-1">Email Inquiry</p>
                    <p className="font-semibold text-white">privacy@ctasis.com</p>
                    <p className="text-xs text-slate-300 mt-1">Direct to Legal & Compliance Team</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xs border border-white/10">
                    <p className="text-xs text-[#8FE7FF] uppercase font-bold tracking-wider mb-1">Corporate Headquarters</p>
                    <p className="font-semibold text-white">CTAS Technologies, Inc.</p>
                    <p className="text-xs text-slate-300 mt-1">Enterprise Software Division</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-[#8FE7FF] transition-all shadow-md text-sm"
                  >
                    Contact sales & legal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/terms"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white px-4 py-3 text-sm font-medium transition-colors"
                  >
                    View Terms of Service →
                  </Link>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
