import { BadgeCheck, Boxes, Camera, CheckCircle, EyeOff, FileWarning, ImageUp, Layers, RotateCcw, ScanLine, ScanSearch, ShieldCheck, ShoppingBag, Truck, Warehouse, Zap } from "lucide-react";

// for ProblemValueSection
export const problemCards = [
  {
    icon: EyeOff,
    title: "Blurry Barcodes",
    description: "Scan labels that aren't perfectly clear.",
  },
  {
    icon: FileWarning,
    title: "Damaged Labels",
    description: "Keep scanning even when part of a barcode is difficult to read.",
  },
  {
    icon: RotateCcw,
    title: "Difficult Angles",
    description: "Scan without needing to position every barcode perfectly.",
  },
  {
    icon: CheckCircle,
    title: "Everyday Conditions",
    description: "Built for the way employees actually work.",
  },
];

// for FeaturesSection.tsx
export const features = [
  {
    icon: Zap,
    title: "Ultra-Fast Decoding",
    description:
      "Highly optimized scanning pipeline delivers sub-frame decode times across mobile, tablet, and desktop.",
  },
  {
    icon: ScanSearch,
    title: "Blurry Barcode Recovery",
    description:
      "AI-enhanced detection reads soft, out-of-focus, and motion-blurred labels without forcing a rescan.",
  },
  {
    icon: ShieldCheck,
    title: "Damaged & Missing Lines",
    description:
      "Reconstructs torn, scratched, and partially missing barcodes through pattern-aware decoding.",
  },
  {
    icon: Layers,
    title: "Tilted & Skewed Support",
    description:
      "Decodes barcodes captured at sharp angles — no need to align the camera perfectly.",
  },
  {
    icon: BadgeCheck,
    title: "QR & Code 128",
    description:
      "Production-grade support for QR codes and Code 128, the industry standard for logistics.",
  },
  {
    icon: ImageUp,
    title: "Realtime + Image Upload",
    description:
      "Stream from a live camera or upload an existing image — same engine, same accuracy.",
  },
];

// for HowItWorksSection.tsx
export const steps = [
  {
    step: "01",
    title: "Upload or Capture",
    description:
      "Use your camera or upload an image containing a barcode.",
    icon: Camera,
  },
  {
    step: "02",
    title: "Detect Barcode",
    description:
      "ScanFlow automatically locates supported barcodes in the image.",
    icon: ScanSearch,
  },
  {
    step: "03",
    title: "Decode Instantly",
    description:
      "Extract barcode data quickly with reliable detection accuracy.",
    icon: ScanLine,
  },
  {
    step: "04",
    title: "Use the Result",
    description:
      "Copy, verify, or integrate decoded data into your workflow.",
    icon: CheckCircle,
  },
];

//for UseCasesSection.tsx
export const useCases = [
  {
    title: 'Warehouses',
    description: 'Scan products, packages, shelves, and inventory while moving through daily operations.',
    icon: Warehouse,
  },
  {
    title: 'Retail',
    description: 'Quickly scan products and labels without depending on dedicated scanning devices.',
    icon: ShoppingBag,
  },
  {
    title: 'Logistics',
    description: 'Scan packages and shipments throughout receiving, sorting, and dispatch workflows.',
    icon: Truck,
  },
  {
    title: 'Inventory',
    description: 'Make inventory-related scanning simpler for your team.',
    icon: Boxes,
  },
];

//for PricingSection.tsx
export const plans = [
  {
    name: "Starter",
    price: "29",
    period: "/month",
    description:
      "Perfect for personal projects and small teams starting with barcode scanning.",
    scans: "25K scans/mo",
    features: [
      "QR & 1D barcode support",
      "Web integration",
      "Fast image detection",
      "Basic scan analytics",
      "Email support",
      "3 team seats",
    ],
    cta: "Start Free Trial",
    highlight: false,
  },
  {
    name: "Pro",
    price: "99",
    period: "/month",
    description:
      "Built for growing businesses that need faster and more reliable scanning workflows.",
    scans: "250K scans/mo",
    features: [
      "Everything in Starter",
      "Blur barcode detection",
      "Damaged barcode support",
      "Multi-barcode scanning",
      "Priority support",
      "Unlimited team seats",
      "Advanced scan analytics",
      "Webhook integrations",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "Custom solutions for large-scale operations and advanced workflow integration.",
    scans: "Custom volume",
    features: [
      "Everything in Pro",
      "Dedicated onboarding",
      "Custom workflow integration",
      "Private deployment options",
      "Advanced security controls",
      "Dedicated technical support",
      "Custom API integration",
      "Scalable infrastructure support",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];
