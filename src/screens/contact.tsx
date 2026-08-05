"use client";

import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ContactSection from "@/components/sections/ContactSection";

export default function Contact() {
  return (
    <Layout>
      <div className="pt-26">
        <PageHeader
          badge="Contact us"
          title={<>Other ways to <span className="text-gradient">reach us</span></>}
          subtitle="Choose the method that works best for you — we're here to help."
        />
        <ContactSection />
      </div>
    </Layout>
  );
}
