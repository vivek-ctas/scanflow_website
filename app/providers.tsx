"use client";

import { WebSettingsProvider } from "@/components/web-settings/WebSettingsProvider";
import { Toaster } from "@/components/ui/Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WebSettingsProvider>
      <Toaster />
      {children}
    </WebSettingsProvider>
  );
}
