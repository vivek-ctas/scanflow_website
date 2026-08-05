import type { ReactNode } from "react";
import WaveDivider from "@/components/sections/WaveDivider";

interface PageHeaderProps {
  badge: string;
  title: ReactNode;
  subtitle: string;
  children?: ReactNode;
}

export default function PageHeader({ badge, title, subtitle, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-grid-stripes">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,193,224,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(19,53,90,0.14),transparent_44%)]" />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent-2/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container-wide pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
        <p className="section-label mb-5 inline-flex">{badge}</p>
        <h1 className="font-display text-4xl md:text-6xl leading-tight text-ink max-w-3xl mx-auto tracking-tight">
          {title}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-light max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>

      <WaveDivider />

    </section>
  );
}
