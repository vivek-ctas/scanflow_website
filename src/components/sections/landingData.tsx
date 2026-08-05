import { BadgeCheck, Boxes, Camera, CheckCircle, Gauge, ImageUp, Layers, ScanLine, ScanSearch, ShieldCheck, ShoppingBag, Truck, Warehouse, Zap } from "lucide-react";

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
      "ScanPro automatically locates supported barcodes in the image.",
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
    description: 'Speed up receiving, putaway, picking, packing, and outbound verification.',
    icon: Warehouse,
  },
  {
    title: 'Retail',
    description: 'Reduce checkout friction and improve shelf-level scanning reliability.',
    icon: ShoppingBag,
  },
  {
    title: 'Logistics',
    description: 'Process damaged shipment labels in fast-moving last-mile and hub operations.',
    icon: Truck,
  },
  {
    title: 'Inventory',
    description: 'Keep stock counts accurate with consistent barcode scanning across mobile and desktop setups.',
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
