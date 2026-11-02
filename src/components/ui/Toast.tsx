"use client";

import { Toaster as HotToaster } from "react-hot-toast";

/**
 * Toast host. Mounted once in app/providers.tsx.
 * Hosts `react-hot-toast` notifications (`notify.*`).
 * Fully responsive for mobile and desktop screens.
 */
export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      containerStyle={{
        top: 16,
        left: 12,
        right: 12,
        zIndex: 99999,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          maxWidth: "100%",
          padding: 0,
          background: "transparent",
          boxShadow: "none",
        },
      }}
    />
  );
}

export default Toaster;
