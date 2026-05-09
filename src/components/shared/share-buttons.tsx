"use client";

import { Link as LinkIcon, Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    toast.success("Blog link copied to clipboard.");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={() => void share()} type="button" variant="secondary">
        <Share2 className="mr-2 h-4 w-4" /> Share
      </Button>
      <Button
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          toast.success("Link copied.");
        }}
        type="button"
        variant="ghost"
      >
        <LinkIcon className="mr-2 h-4 w-4" /> Copy link
      </Button>
    </div>
  );
};
