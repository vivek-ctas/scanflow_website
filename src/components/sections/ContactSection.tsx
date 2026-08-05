"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";

const contacts = [
    {
        id: "email",
        icon: Mail,
        tag: "Email us",
        heading: "info@ctasis.com",
        sub: "Send us an email anytime — we read every message.",
        href: "mailto:info@ctasis.com",
        accent: "#3B9ECC",
        accentLight: "#E8F5FC",
        number: "01",
    },
    {
        id: "phone",
        icon: Phone,
        tag: "Call us",
        heading: "+91 7948993409",
        sub: "Mon – Fri, 10 AM to 8 PM. Real humans, real answers.",
        href: "tel:+917948993409",
        accent: "#16A97A",
        accentLight: "#E4F7F1",
        number: "02",
    },
    {
        id: "visit",
        icon: MapPin,
        tag: "Visit us",
        heading: "Gota, Ahmedabad",
        sub: "A-865/866, Money Plant High Street, Jagatpur Rd, near BSNL Office, Gujarat 382470",
        href: "https://maps.google.com/?q=Money+Plant+High+Street+Gota+Ahmedabad",
        accent: "#7C5CDB",
        accentLight: "#F0EDFB",
        number: "03",
    },
    {
        id: "hours",
        icon: Clock,
        tag: "Business hours",
        heading: "10 AM – 8 PM",
        sub: "Monday through Friday. We're always reachable within one business day.",
        href: null,
        accent: "#D97706",
        accentLight: "#FEF3E0",
        number: "04",
    },
];

type ContactItem = (typeof contacts)[number];

function useTilt() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 20 });
    const sy = useSpring(y, { stiffness: 200, damping: 20 });
    const rotateX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"]);
    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
        x.set(0);
        y.set(0);
    };
    return { rotateX, rotateY, onMove, onLeave };
}

function ContactCard({ item, index, isInView }: { item: ContactItem; index: number; isInView: boolean }) {
    const { rotateX, rotateY, onMove, onLeave } = useTilt();
    const [hovered, setHovered] = useState(false);
    const Icon = item.icon;
    const Tag = item.href ? "a" : "div";
    const tagProps = item.href
        ? {
            href: item.href,
            target: item.href.startsWith("http") ? "_blank" : undefined,
            rel: "noopener noreferrer",
        }
        : {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.12 }}
            style={{ perspective: "900px" }}
        >
            <Tag {...tagProps} style={{ display: "block", textDecoration: "none" }}>
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    onMouseMove={onMove}
                    onMouseLeave={() => {
                        onLeave();
                        setHovered(false);
                    }}
                    onMouseEnter={() => setHovered(true)}
                    className="group relative overflow-hidden rounded-4xl border border-primary/10 bg-white/95 shadow-[0_20px_60px_rgba(19,53,90,0.09)] transition-shadow duration-300 hover:shadow-[0_32px_80px_rgba(19,53,90,0.15)]"
                >
                    {/* Color wash on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-4xl pointer-events-none"
                        style={{ background: item.accentLight }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.35 }}
                    />

                    {/* Top accent bar */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-0.75 rounded-t-4xl"
                        style={{ background: item.accent }}
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {/* Ambient glow */}
                    <div
                        className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full blur-2xl transition-opacity duration-500"
                        style={{ background: item.accent, opacity: hovered ? 0.18 : 0.07 }}
                    />

                    <div className="relative z-10 flex items-start gap-6 p-7">
                        {/* Watermark number */}
                        <div
                            className="absolute right-6 top-3 font-display text-7xl font-bold tracking-tighter select-none pointer-events-none transition-opacity duration-300"
                            style={{ color: item.accent, opacity: hovered ? 0.1 : 0.05 }}
                        >
                            {item.number}
                        </div>

                        {/* Icon bubble */}
                        <motion.div
                            className="shrink-0 flex items-center justify-center rounded-2xl"
                            style={{
                                width: 54,
                                height: 54,
                                background: hovered ? item.accent : item.accentLight,
                                transition: "background 0.3s",
                            }}
                            animate={{ rotate: hovered ? [0, -8, 8, 0] : 0 }}
                            transition={{ duration: 0.45 }}
                        >
                            <Icon
                                className="h-5 w-5"
                                style={{ color: hovered ? "#fff" : item.accent, transition: "color 0.3s" }}
                            />
                        </motion.div>

                        {/* Text */}
                        <div className="flex-1 min-w-0 pt-0.5">
                            <p
                                className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1.5"
                                style={{ color: item.accent }}
                            >
                                {item.tag}
                            </p>
                            <p className="font-display text-xl font-semibold text-primary leading-tight mb-2 truncate">
                                {item.heading}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.sub}</p>
                        </div>

                        {/* Arrow for linked cards */}
                        {item.href && (
                            <motion.div
                                className="shrink-0 flex items-center justify-center rounded-xl mt-1"
                                style={{ width: 32, height: 32 }}
                                animate={{
                                    x: hovered ? 3 : 0,
                                    y: hovered ? -3 : 0,
                                    background: hovered ? item.accent : item.accentLight,
                                }}
                                transition={{ duration: 0.25 }}
                            >
                                <ArrowUpRight
                                    className="h-4 w-4"
                                    style={{ color: hovered ? "#fff" : item.accent, transition: "color 0.25s" }}
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* Bottom shimmer */}
                    <motion.div
                        className="absolute bottom-0 left-8 right-8 h-px"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            </Tag>
        </motion.div>
    );
}

export default function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            id="contact"
            ref={ref}
            className="relative isolate container-wide py-20 overflow-hidden"
        >
            {/* Background blobs */}
            <div className="pointer-events-none absolute -left-10 top-8 -z-10 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute left-1/3 top-1/2 -z-10 h-40 w-40 rounded-full bg-secondary/5 blur-2xl" />

            {/* Cards grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {contacts.map((item, i) => (
                    <ContactCard key={item.id} item={item} index={i} isInView={isInView} />
                ))}
            </div>

            {/* Bottom CTA strip */}
            <motion.div
                className="mt-12 relative overflow-hidden rounded-4xl border border-secondary/20 bg-gradient-to-br from-secondary/8 via-white/60 to-secondary/5 p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.65 }}
            >
                <div className="pointer-events-none absolute -right-12 top-0 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
                <div>
                    <p className="font-display text-xl text-primary font-semibold">
                        Prefer a quick email?
                    </p>
                    <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                        Drop us a line at {" "}
                        <a
                            href="mailto:info@ctasis.com"
                            className="text-secondary font-medium underline underline-offset-2 hover:opacity-75 transition"
                        >
                            info@ctasis.com
                        </a>{" "}
                        — we reply within one business day.
                    </p>
                </div>
                <motion.a
                    href="mailto:info@ctasis.com"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="shrink-0 inline-flex items-center gap-2 rounded-2xl bg-secondary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(59,158,204,0.35)] hover:opacity-90 transition"
                >
                    <Mail className="h-4 w-4" />
                    Email us now
                </motion.a>
            </motion.div>
        </section>
    );
}




