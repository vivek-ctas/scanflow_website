import React from "react";
import toast from "react-hot-toast";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type Tone = "success" | "error" | "info";

const toneConfig = {
  success: {
    label: "Success",
    icon: CheckCircle2,
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200/80",
    badge: "bg-emerald-100/80 text-emerald-700",
    border: "border-emerald-200/90",
    shadow:
      "shadow-[0_10px_30px_-6px_rgba(16,185,129,0.25),0_4px_12px_rgba(0,0,0,0.06)]",
  },
  error: {
    label: "Error",
    icon: AlertCircle,
    iconBg: "bg-rose-50 text-rose-600 border border-rose-200/80",
    badge: "bg-rose-100/80 text-rose-700",
    border: "border-rose-200/90",
    shadow:
      "shadow-[0_10px_30px_-6px_rgba(244,63,94,0.25),0_4px_12px_rgba(0,0,0,0.06)]",
  },
  info: {
    label: "Info",
    icon: Info,
    iconBg: "bg-sky-50 text-sky-600 border border-sky-200/80",
    badge: "bg-sky-100/80 text-sky-700",
    border: "border-sky-200/90",
    shadow:
      "shadow-[0_10px_30px_-6px_rgba(14,165,233,0.25),0_4px_12px_rgba(0,0,0,0.06)]",
  },
};

const show = (message: string, tone: Tone) => {
  const config = toneConfig[tone];
  const Icon = config.icon;
  const duration = tone === "error" ? 5000 : 4000;

  return toast.custom(
    (t) =>
      React.createElement(
        "div",
        {
          className: `pointer-events-auto flex items-start gap-2.5 sm:gap-3 rounded-2xl border bg-white/95 p-3 sm:px-4 sm:py-3.5 shadow-xl backdrop-blur-md transition-all duration-200 ease-out w-full max-w-[calc(100vw-24px)] sm:w-auto sm:min-w-[320px] sm:max-w-[480px] ${
            config.border
          } ${config.shadow} ${
            t.visible
              ? "translate-y-0 scale-100 opacity-100"
              : "-translate-y-2 scale-95 opacity-0"
          }`,
        },
        React.createElement(
          "div",
          {
            className: `flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-xl ${config.iconBg} mt-0.5`,
          },
          React.createElement(Icon, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4" }),
        ),
        React.createElement(
          "div",
          { className: "min-w-0 flex-1 pt-0.5" },
          React.createElement(
            "div",
            { className: "flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1" },
            React.createElement(
              "span",
              {
                className: `rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${config.badge}`,
              },
              config.label,
            ),
          ),
          React.createElement(
            "p",
            {
              className:
                "text-xs sm:text-sm text-slate-800 font-medium leading-relaxed break-words",
            },
            message,
          ),
        ),
        React.createElement(
          "button",
          {
            type: "button",
            onClick: () => toast.dismiss(t.id),
            className:
              "text-slate-400 hover:text-slate-600 -mr-1 -mt-0.5 shrink-0 rounded-lg p-1.5 transition-colors focus:outline-none",
            "aria-label": "Dismiss",
          },
          React.createElement(X, { className: "h-4 w-4" }),
        ),
      ),
    { position: "top-center", duration },
  );
};

export const notify = {
  success: (message: string) => show(message, "success"),
  error: (message: string) => show(message, "error"),
  info: (message: string) => show(message, "info"),
  dismiss: () => toast.dismiss(),
};
