"use client";

import { useState } from "react";

import { ImageUploadField } from "@/components/forms/image-upload-field";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MediaPage() {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-stone">Assets</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">Media</h1>
      </div>
      <Card className="bg-white/85">
        <CardHeader>
          <CardTitle className="font-serif text-3xl">Firebase uploads</CardTitle>
          <CardDescription>Upload featured images, content visuals, or product photography into the structured Firebase folder system.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Badge>blogs/featured</Badge>
            <Badge variant="sage">blogs/content</Badge>
            <Badge variant="gold">blogs/products</Badge>
          </div>
          <ImageUploadField folder="content" onChange={setImageUrl} value={imageUrl} />
          {imageUrl ? <p className="rounded-[1.5rem] border border-line bg-card/80 p-4 text-sm leading-7 text-stone">Uploaded URL: {imageUrl}</p> : null}
        </CardContent>
      </Card>
    </div>
  );
}
