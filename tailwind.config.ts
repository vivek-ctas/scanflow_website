import type { Config } from "tailwindcss";

export default {
	content: [
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				/* CTAS Brand Guidelines — semantic tokens */
				accent: "hsl(var(--accent))",
				"accent-2": "hsl(var(--accent-2))",
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				/* CTAS Brand Guidelines — semantic tokens */
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				"accent-foreground": "hsl(var(--accent-foreground))",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
			},
			fontFamily: {
				sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
				display: ["var(--font-montserrat)", "var(--font-inter)", "system-ui", "sans-serif"],
				mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
			},
			borderRadius: {
				"4xl": "2rem",
			},
			spacing: {
				"0.75": "0.1875rem",
				"26": "6.5rem",
			},
			opacity: {
				"2": "0.02",
				"4": "0.04",
				"6": "0.06",
				"8": "0.08",
				"12": "0.12",
			},
			keyframes: {
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(24px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"gradient-shift": {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				drift: {
					"0%": { transform: "translate3d(0, 0, 0) scale(1)" },
					"50%": { transform: "translate3d(10px, -14px, 0) scale(1.04)" },
					"100%": { transform: "translate3d(0, 0, 0) scale(1)" },
				},
				"stripe-move": {
					"0%": { backgroundPosition: "0 0" },
					"100%": { backgroundPosition: "180px 0" },
				},
				"scan-beam": {
					"0%": { transform: "translateY(-26px)", opacity: "0.35" },
					"50%": { opacity: "1" },
					"100%": { transform: "translateY(190px)", opacity: "0.2" },
				},
				"float-up": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-12px)" },
				},
				"float-down": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(12px)" },
				},
				"float-gentle": {
					"0%, 100%": { transform: "translateY(0px) translateX(0px)" },
					"25%": { transform: "translateY(-8px) translateX(4px)" },
					"50%": { transform: "translateY(-4px) translateX(0px)" },
					"75%": { transform: "translateY(-6px) translateX(-4px)" },
				},
				"float-gentle-reverse": {
					"0%, 100%": { transform: "translateY(0px) translateX(0px)" },
					"25%": { transform: "translateY(8px) translateX(-4px)" },
					"50%": { transform: "translateY(4px) translateX(0px)" },
					"75%": { transform: "translateY(6px) translateX(4px)" },
				},
				"pulse-ring": {
					"0%": { transform: "scale(0.95)", opacity: "0.7" },
					"70%, 100%": { transform: "scale(1.4)", opacity: "0" },
				},
				"scan-line": {
					"0%": { top: "10%", opacity: "0" },
					"10%": { opacity: "1" },
					"90%": { opacity: "1" },
					"100%": { top: "90%", opacity: "0" },
				},
			},
			animation: {
				"fade-in-up": "fade-in-up 0.7s ease forwards",
				drift: "drift 8s ease-in-out infinite",
				"float-up": "float-up 4s ease-in-out infinite",
				"float-down": "float-down 5s ease-in-out infinite",
				"float-gentle": "float-gentle 6s ease-in-out infinite",
				"float-gentle-reverse": "float-gentle-reverse 7s ease-in-out infinite",
				"pulse-ring": "pulse-ring 2.4s cubic-bezier(.215,.61,.355,1) infinite",
				"scan-beam": "scan-beam 2.6s ease-in-out infinite",
				"scan-premium": "scan-line 3s linear infinite",
				"stripe-move": "stripe-move 24s linear infinite",
			},
		},
	},
	plugins: [],
} satisfies Config;
