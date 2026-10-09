import { WebSettingsProvider } from "@/components/web-settings/WebSettingsProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <WebSettingsProvider>{children}</WebSettingsProvider>;
}
