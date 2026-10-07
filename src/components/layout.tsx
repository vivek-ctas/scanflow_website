import { ReactNode } from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import FloatingActions from "./ui/FloatingActions";
import { WebSettingsProvider } from "./web-settings/WebSettingsProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <WebSettingsProvider>
      <div className="min-h-screen bg-muted flex flex-col relative">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
      </div>
    </WebSettingsProvider>
  );
};

export default Layout;
