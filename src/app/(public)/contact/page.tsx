import type { Metadata } from "next";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach out for platform inquiries, partnership opportunities, or editorial collaboration around Pinterest-driven content."
};

export default function ContactPage() {
  return (
    <div className="section-shell grid gap-10 py-12 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <Reveal>
        <SectionHeading
          description="Use this page for partnerships, editorial ideas, affiliate collaboration, or platform setup conversations."
          eyebrow="Contact"
          title="Talk to the team behind the platform"
        />
      </Reveal>
      <Reveal delay={0.08}>
        <Card className="bg-white/85">
          <CardContent className="space-y-4 p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Your name" />
              <Input placeholder="Email address" type="email" />
            </div>
            <Input placeholder="Subject" />
            <Textarea placeholder="Tell us what you want to build, publish, or optimize." />
            <Button type="button">Send inquiry</Button>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
