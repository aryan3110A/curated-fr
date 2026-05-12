import type { Metadata } from "next";

import { LoginForm } from "@/components/forms/login-form";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure login for CuratedCounter admins and editors."
};

export default function AdminEntryPage() {
  return (
    <div className="section-shell grid gap-10 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <Reveal>
        <SectionHeading
          description="Use your admin or editor credentials to enter the editorial workspace."
          eyebrow="Secure access"
          title="Enter the editorial workspace"
        />
      </Reveal>
      <Reveal delay={0.08}>
        <LoginForm />
      </Reveal>
    </div>
  );
}