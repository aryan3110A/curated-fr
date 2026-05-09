"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const NewsletterCard = () => {
  const [email, setEmail] = useState("");

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white via-cream to-beige shadow-float">
      <CardHeader>
        <CardTitle className="font-serif text-3xl">Weekly visual briefs for Pinterest-first growth</CardTitle>
        <CardDescription>
          Get editorial angles, visual hooks, and affiliate-ready blog ideas without adding noise to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 md:flex-row">
        <Input onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email" type="email" value={email} />
        <Button
          onClick={() => {
            if (!email.trim()) {
              toast.error("Enter an email address to subscribe.");
              return;
            }

            toast.success("Newsletter signup captured. Wire your provider next.");
            setEmail("");
          }}
          type="button"
        >
          Join the list
        </Button>
      </CardContent>
    </Card>
  );
};
