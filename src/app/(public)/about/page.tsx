import type { Metadata } from "next";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how CuratedCounter blends Pinterest traffic, editorial blogging, AI workflows, and elegant affiliate product surfaces."
};

export default function AboutPage() {
  return (
    <div className="section-shell space-y-10 py-12 md:space-y-12 md:py-16">
      <Reveal>
        <SectionHeading
          description="CuratedCounter is designed to feel like Pinterest meets Medium through a calmer, more premium product lens."
          eyebrow="About"
          title="A platform for visual stories that also convert"
        />
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Visual-first publishing",
            description: "Every content surface is optimized for save-worthy first impressions and readable second screens."
          },
          {
            title: "AI-assisted creation",
            description: "Admins can generate blog drafts, SEO metadata, and Pinterest captions before refining them manually."
          },
          {
            title: "Affiliate-ready structure",
            description: "Products appear inside the story arc instead of sitting in a disconnected commerce block."
          }
        ].map((item, index) => (
          <Reveal delay={index * 0.06} key={item.title}>
            <Card className="bg-white/85">
              <CardContent className="space-y-3 p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-stone">0{index + 1}</p>
                <h2 className="font-serif text-3xl text-foreground">{item.title}</h2>
                <p className="text-sm leading-7 text-stone">{item.description}</p>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
