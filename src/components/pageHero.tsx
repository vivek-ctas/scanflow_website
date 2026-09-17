import type { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import WaveDivider from "@/components/sections/WaveDivider";

interface PageHeroProps {
  badgeIcon?: LucideIcon;
  badgeText: string;
  title: ReactNode;
  subtitle: string;
  visual?: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
  children?: ReactNode;
  badgeClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const PageHero = ({
  badgeIcon: BadgeIcon,
  badgeText,
  title,
  subtitle,
  visual,
  actions,
  centered = false,
  children,
  badgeClassName,
  titleClassName,
  subtitleClassName,
}: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-grid-stripes">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(107,193,224,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(19,53,90,0.14),transparent_44%)]" />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-accent-2/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[440px] h-[440px] rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

      <div className={`px-5 sm:px-8 lg:px-[70px] pt-20 pb-24 sm:pt-28 sm:pb-32 ${centered ? "text-center" : ""}`}>
        {visual && !centered ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 text-left">
              <p className={badgeClassName ?? "section-label mb-5 inline-flex items-center gap-2"}>
                {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
                {badgeText}
              </p>
              <h1 className={titleClassName ?? "font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary tracking-tight"}>
                {title}
              </h1>
              <p className={subtitleClassName ?? "mt-6 text-lg md:text-xl text-slate-700 leading-relaxed"}>
                {subtitle}
              </p>
              {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
              {children && <div className="mt-8">{children}</div>}
            </div>
            <div className="lg:col-span-6 flex justify-center items-center">
              {visual}
            </div>
          </div>
        ) : (
          <>
            <p className={badgeClassName ?? "section-label mb-5 inline-flex items-center gap-2"}>
              {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
              {badgeText}
            </p>
            <h1 className={`${titleClassName ?? "font-display text-4xl md:text-6xl font-bold leading-tight text-primary max-w-3xl tracking-tight"} ${centered ? "mx-auto" : ""}`}>
              {title}
            </h1>
            <p className={`${subtitleClassName ?? "mt-6 text-lg md:text-xl text-slate-700 max-w-2xl leading-relaxed"} ${centered ? "mx-auto" : ""}`}>
              {subtitle}
            </p>
            {actions && <div className="mt-8 flex flex-wrap gap-4">{actions}</div>}
            {visual && <div className="mt-12">{visual}</div>}
            {children && <div className="mt-8">{children}</div>}
          </>
        )}
      </div>

      <WaveDivider />
    </section>
  );
};

export default PageHero;
