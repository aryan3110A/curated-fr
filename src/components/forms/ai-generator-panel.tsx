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
import { getApiErrorMessage } from "@/lib/api-error";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { aiApi } from "@/services/api/ai";

const selectClassName =
  "h-12 w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-stone/30 focus:ring-2 focus:ring-stone/10";
const errorClassName =
  "border-red-400 bg-red-50/60 text-red-900 placeholder:text-red-400 focus:border-red-500 focus:ring-red-100";

type GeneratorFieldErrors = {
  topic?: string;
  keywords?: string;
};

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
  const [fieldErrors, setFieldErrors] = useState<GeneratorFieldErrors>({});

  const keywordList = keywords
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const validateGeneratorFields = (input: {
    topicValue?: string;
    requireTopic?: boolean;
  }) => {
    const nextErrors: GeneratorFieldErrors = {};

    if (
      input.requireTopic &&
      (!input.topicValue || input.topicValue.trim().length < 4)
    ) {
      nextErrors.topic = "Topic must be at least 4 characters.";
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const blogMutation = useMutation({
    mutationFn: () =>
      aiApi.generateBlog({ topic, keywords: keywordList, tone }),
    onSuccess: (result) => {
      setFieldErrors({});
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
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "AI blog generation failed."));
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
      setFieldErrors({});
      setCaptionPreview(
        `${result.caption} ${result.hashtags.join(" ")}`.trim(),
      );
      toast.success("Pinterest caption generated.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Caption generation failed."));
    },
  });

  const handleGenerateDraft = () => {
    if (!validateGeneratorFields({ topicValue: topic, requireTopic: true })) {
      toast.error("Fix the highlighted AI fields first.");
      return;
    }

    blogMutation.mutate();
  };

  const handleGenerateCaption = () => {
    if (
      !validateGeneratorFields({
        topicValue: getContext().title || topic,
        requireTopic: true,
      })
    ) {
      toast.error("Fix the highlighted AI fields first.");
      return;
    }

    captionMutation.mutate();
  };

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
            aria-invalid={Boolean(fieldErrors.topic)}
            className={cn(fieldErrors.topic && errorClassName)}
            onChange={(event) => {
              setTopic(event.target.value);
              setFieldErrors((current) => ({ ...current, topic: undefined }));
            }}
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
        {fieldErrors.topic ? (
          <p className="text-sm text-red-500">{fieldErrors.topic}</p>
        ) : null}
        <Textarea
          aria-invalid={Boolean(fieldErrors.keywords)}
          className={cn(fieldErrors.keywords && errorClassName)}
          onChange={(event) => {
            setKeywords(event.target.value);
            setFieldErrors((current) => ({ ...current, keywords: undefined }));
          }}
          placeholder="Comma separated keywords"
          value={keywords}
        />
        {fieldErrors.keywords ? (
          <p className="text-sm text-red-500">{fieldErrors.keywords}</p>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={blogMutation.isPending || !topic.trim()}
            onClick={handleGenerateDraft}
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
            onClick={handleGenerateCaption}
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
