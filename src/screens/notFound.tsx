"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-secondary mb-4">Error 404</p>
        <h1 className="font-display text-6xl font-bold text-primary mb-4">Page not found</h1>
        <p className="text-lg text-muted-foreground-foreground mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-semibold text-white bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-full hover:opacity-95 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
