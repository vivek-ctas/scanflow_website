import { ReactNode } from "react";
import Navigation from "./navigation";
import Footer from "./footer";
import FloatingActions from "./ui/FloatingActions";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-muted flex flex-col relative">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Layout;
