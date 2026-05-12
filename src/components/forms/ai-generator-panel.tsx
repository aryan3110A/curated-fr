"use client";

import { useMutation } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { aiApi } from "@/services/api/ai";

const selectClassName =
  "h-12 w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-stone/30 focus:ring-2 focus:ring-stone/10";

export const AIGeneratorPanel = ({
  getContext,
  onApplyBlog,
  onApplySeo,
}: {
  getContext: () => { title: string; excerpt?: string; content?: string };
  onApplyBlog: (payload: {
    title: string;
    excerpt: string;
    content: string;
    seoTitle: string;
    metaDescription: string;
  }) => void;
  onApplySeo: (payload: { seoTitle: string; metaDescription: string }) => void;
}) => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("editorial");
  const [captionPreview, setCaptionPreview] = useState("");

  const keywordList = keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const blogMutation = useMutation({
    mutationFn: () =>
      aiApi.generateBlog({ topic, keywords: keywordList, tone }),
    onSuccess: (result) => {
      onApplyBlog({
        title: result.title,
        excerpt: result.excerpt,
        content: result.content,
        seoTitle: result.seoTitle,
        metaDescription: result.metaDescription,
      });
      setCaptionPreview(result.pinterestCaption);
      toast.success("AI draft applied to the form.");
    },
    onError: () => {
      toast.error("AI blog generation failed.");
    },
  });

  const seoMutation = useMutation({
    mutationFn: () => aiApi.generateSeo(getContext()),
    onSuccess: (result) => {
      onApplySeo(result);
      toast.success("SEO fields generated.");
    },
    onError: () => {
      toast.error("SEO generation failed.");
    },
  });

  const captionMutation = useMutation({
    mutationFn: () =>
      aiApi.generateCaption({
        title: getContext().title || topic,
        keywords: keywordList,
      }),
    onSuccess: (result) => {
      setCaptionPreview(
        `${result.caption} ${result.hashtags.join(" ")}`.trim(),
      );
      toast.success("Pinterest caption generated.");
    },
    onError: () => {
      toast.error("Caption generation failed.");
    },
  });

  return (
    <Card className="bg-white/85">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-serif text-3xl">
          <Sparkles className="h-5 w-5" /> AI generation tools
        </CardTitle>
        <CardDescription>
          Generate a full article draft, fresh SEO metadata, or Pinterest
          captions before editing manually.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Topic, such as warm neutral bedroom ideas"
            value={topic}
          />
          <select
            className={selectClassName}
            onChange={(event) => setTone(event.target.value)}
            value={tone}
          >
            <option value="editorial">Editorial</option>
            <option value="elevated">Elevated</option>
            <option value="warm">Warm</option>
            <option value="luxury">Luxury</option>
            <option value="practical">Practical</option>
          </select>
        </div>
        <Textarea
          onChange={(event) => setKeywords(event.target.value)}
          placeholder="Comma separated keywords"
          value={keywords}
        />
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={blogMutation.isPending || !topic.trim()}
            onClick={() => blogMutation.mutate()}
            type="button"
          >
            {blogMutation.isPending ? "Generating draft..." : "Generate draft"}
          </Button>
          <Button
            disabled={seoMutation.isPending}
            onClick={() => seoMutation.mutate()}
            type="button"
            variant="secondary"
          >
            {seoMutation.isPending ? "Generating SEO..." : "Generate SEO"}
          </Button>
          <Button
            disabled={captionMutation.isPending}
            onClick={() => captionMutation.mutate()}
            type="button"
            variant="ghost"
          >
            {captionMutation.isPending
              ? "Generating caption..."
              : "Generate caption"}
          </Button>
        </div>
        {captionPreview ? (
          <div className="rounded-[1.5rem] border border-line bg-card/80 p-4 text-sm leading-7 text-stone">
            {captionPreview}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
