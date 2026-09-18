"use client";

import Layout from "@/components/layout";
import PageHero from "@/components/pageHero";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Zap,
  Lock,
  Globe,
  Mail,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
} from "lucide-react";
import Link from "next/link";

const TERMS_SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms", icon: Scale },
  { id: "licensing", title: "2. Software License & Scope", icon: Layers },
  { id: "restrictions", title: "3. Prohibited Activities", icon: AlertTriangle },
  { id: "sla", title: "4. SLA & Uptime Commitments", icon: Zap },
  { id: "billing", title: "5. Billing, Plans & Upgrades", icon: CreditCard },
  { id: "intellectual-property", title: "6. Intellectual Property", icon: Cpu },
  { id: "warranties", title: "7. Disclaimers & Warranties", icon: ShieldCheck },
  { id: "liability", title: "8. Limitation of Liability", icon: Lock },
  { id: "termination", title: "9. Term & Termination", icon: RefreshCw },
  { id: "governing-law", title: "10. Governing Law", icon: Globe },
  { id: "contact", title: "11. Contact & Legal Notices", icon: Mail },
];

export default function TermsScreen() {
  const [activeSection, setActiveSection] = useState("acceptance");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of TERMS_SECTIONS) {
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
          badgeIcon={Scale}
          badgeText="Terms & Conditions"
          title={
            <>
              ScanFlow{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Terms of Service
              </span>
            </>
          }
          subtitle="Please read these terms carefully before integrating ScanFlow SDKs or deploying our barcode scanning technology across your web and mobile platforms."
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
              Version 2.4
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200/80 shadow-xs">
              <FileText className="w-3.5 h-3.5 text-primary" />
              8 min read
            </span>
          </div>
        </PageHero>

        {/* Highlight Guarantee Cards */}
        <section className="px-4 sm:px-8 lg:px-[70px] max-w-[1440px] mx-auto -mt-12 mb-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.06)] hover:border-secondary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">Commercial SDK License</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Worldwide, non-exclusive license granted to integrate ScanFlow barcode vision engines into internal and commercial apps.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.06)] hover:border-secondary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">99.9% Uptime Commitment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enterprise and Pro tier customers receive guaranteed license activation availability backed by standard SLAs.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(19,53,90,0.06)] hover:border-secondary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-primary text-base mb-2">Transparent Subscriptions</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Predictable monthly or annual pricing with no surprise overage penalties and straightforward cancellation policies.
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
                    Agreement Sections
                  </span>
                </div>
                <nav className="flex flex-col space-y-1">
                  {TERMS_SECTIONS.map((sec) => {
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
                    <p className="text-xs font-semibold text-primary mb-1">Need enterprise terms?</p>
                    <p className="text-xs text-slate-500 mb-3">Custom MSAs, BAA addendums, and invoicing available.</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-primary transition-colors"
                    >
                      Talk to Enterprise Sales <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Document Body */}
            <main className="lg:col-span-8 space-y-12 text-slate-700 leading-relaxed text-base">
              
              {/* 1. Acceptance */}
              <section id="acceptance" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">1. Acceptance of Terms</h2>
                </div>
                <p className="mb-4">
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you or the entity you represent (&quot;Customer,&quot; &quot;you,&quot; or &quot;Licensee&quot;) and <strong>CTAS Technologies, Inc.</strong> (&quot;CTAS,&quot; &quot;ScanFlow,&quot; &quot;we,&quot; or &quot;us&quot;).
                </p>
                <p className="mb-4">
                  By accessing our website, purchasing a subscription, downloading the ScanFlow SDK package, or embedding our software into your mobile, desktop, or web applications, you agree to be bound by these Terms. If you do not agree, you must not access or use the software.
                </p>
              </section>

              {/* 2. Licensing */}
              <section id="licensing" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">2. Software License & Scope of Use</h2>
                </div>
                <p className="mb-4">
                  Subject to timely payment of applicable subscription fees and continuous adherence to these Terms, CTAS grants you a revocable, non-exclusive, non-transferable license to:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Incorporate the compiled ScanFlow WebAssembly, iOS, and Android binaries into your applications.",
                    "Deploy the scanning capability to authorized end-users within the parameters of your selected plan tier (Starter, Pro, or Enterprise).",
                    "Access online documentation, sample code repositories, and developer support channels.",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. Restrictions */}
              <section id="restrictions" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">3. Prohibited Activities & Restrictions</h2>
                </div>
                <p className="mb-4">
                  You agree that you will not, directly or indirectly:
                </p>
                <div className="space-y-3 text-sm text-slate-600 mb-4">
                  <p><strong>A. Reverse Engineering:</strong> Decompile, disassemble, reverse engineer, or attempt to reconstruct the proprietary algorithms, neural weights, or barcode detection models comprising the SDK.</p>
                  <p><strong>B. Standalone Resale:</strong> Resell, sub-license, distribute, or wrap ScanFlow as a competing standalone barcode scanner SDK product.</p>
                  <p><strong>C. License Tampering:</strong> Circumvent, disable, or tamper with the license key verification mechanisms or API quota limiters.</p>
                  <p><strong>D. Unlawful Applications:</strong> Use the scanning technology in connection with unlawful surveillance or activities violating third-party intellectual property.</p>
                </div>
              </section>

              {/* 4. SLA */}
              <section id="sla" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">4. Service Level Agreement (SLA) & Uptime</h2>
                </div>
                <p className="mb-4">
                  Because ScanFlow executes on-device, core barcode decoding continues uninterrupted even during internet outages. For license validation, cloud dashboards, and API services:
                </p>
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-primary">
                        <th className="p-3.5 font-bold">Plan Tier</th>
                        <th className="p-3.5 font-bold">Uptime SLA</th>
                        <th className="p-3.5 font-bold">Support Response Window</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-3.5 font-semibold text-primary">Starter</td>
                        <td className="p-3.5">99.5%</td>
                        <td className="p-3.5">Within 24 business hours</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-primary">Pro</td>
                        <td className="p-3.5">99.9%</td>
                        <td className="p-3.5">Within 8 business hours</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-primary">Enterprise</td>
                        <td className="p-3.5">99.99%</td>
                        <td className="p-3.5">1-hour priority response + Dedicated TAM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. Billing */}
              <section id="billing" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">5. Billing, Subscriptions & Upgrades</h2>
                </div>
                <p className="mb-4">
                  Subscription fees are billed in advance on a recurring monthly or annual cadence. All fees are non-refundable except where required by law or explicitly stated in an Enterprise Master Services Agreement (MSA).
                </p>
                <p className="mb-4 text-sm text-slate-600">
                  You may upgrade your subscription plan at any time through your dashboard; prorated billing adjustments will apply immediately. You may cancel renewal at any time prior to the next billing cycle.
                </p>
              </section>

              {/* 6. IP */}
              <section id="intellectual-property" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">6. Intellectual Property & Trademarks</h2>
                </div>
                <p className="mb-4">
                  CTAS retains all right, title, and interest (including worldwide patent, copyright, trade secret, and trademark rights) in and to ScanFlow, including all software algorithms, updates, documentation, and underlying source code.
                </p>
                <p className="text-sm text-slate-600">
                  You retain all ownership rights to your application source code and all barcode payload data captured by your users.
                </p>
              </section>

              {/* 7. Warranties */}
              <section id="warranties" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">7. Disclaimers & Warranties</h2>
                </div>
                <p className="mb-4 text-sm sm:text-base text-slate-600">
                  EXCEPT AS EXPRESSLY SET FORTH IN A DEDICATED SERVICE LEVEL AGREEMENT, SCANFLOW AND ITS ASSOCIATED SOFTWARE ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED. CTAS DOES NOT GUARANTEE UNINTERRUPTED OR COMPLETELY ERROR-FREE OPERATION UNDER SEVERELY DAMAGED PHYSICAL SENSOR HARDWARE CONDITIONS.
                </p>
              </section>

              {/* 8. Liability */}
              <section id="liability" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">8. Limitation of Liability</h2>
                </div>
                <p className="mb-4 text-sm sm:text-base text-slate-600">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CTAS OR ITS SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, DATA, OR WAREHOUSE OPERATIONAL INTERRUPTION) ARISING OUT OF OR IN CONNECTION WITH THE USE OF SCANFLOW.
                </p>
              </section>

              {/* 9. Termination */}
              <section id="termination" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">9. Term & Termination</h2>
                </div>
                <p className="mb-4 text-sm sm:text-base text-slate-600">
                  Either party may terminate this agreement if the other party breaches a material provision of these Terms and fails to cure such breach within thirty (30) days of receiving written notice. Upon termination, all rights granted under the license cease immediately.
                </p>
              </section>

              {/* 10. Governing Law */}
              <section id="governing-law" className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_4px_24px_rgba(19,53,90,0.04)] scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">10. Governing Law & Dispute Resolution</h2>
                </div>
                <p className="mb-4 text-sm sm:text-base text-slate-600">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without giving effect to any principles of conflicts of law.
                </p>
              </section>

              {/* 11. Contact */}
              <section id="contact" className="bg-gradient-to-br from-[#13355A] to-[#1B4A75] text-white rounded-3xl p-8 sm:p-10 shadow-xl scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#6BC1E0]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">11. Contact & Legal Notices</h2>
                </div>
                <p className="text-slate-200 mb-6 leading-relaxed">
                  For formal legal notices, custom enterprise Master Service Agreements (MSAs), or questions concerning these Terms, contact our legal counsel:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-8">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xs border border-white/10">
                    <p className="text-xs text-[#8FE7FF] uppercase font-bold tracking-wider mb-1">Legal Department</p>
                    <p className="font-semibold text-white">legal@ctasis.com</p>
                    <p className="text-xs text-slate-300 mt-1">General Legal & Commercial Counsel</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-xs border border-white/10">
                    <p className="text-xs text-[#8FE7FF] uppercase font-bold tracking-wider mb-1">Entity Name</p>
                    <p className="font-semibold text-white">CTAS Technologies, Inc.</p>
                    <p className="text-xs text-slate-300 mt-1">Software Licensing Division</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-full hover:bg-[#8FE7FF] transition-all shadow-md text-sm"
                  >
                    Contact legal & enterprise team
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white px-4 py-3 text-sm font-medium transition-colors"
                  >
                    View Privacy Policy →
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
