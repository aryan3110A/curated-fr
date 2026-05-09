"use client";

import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, UploadCloud } from "lucide-react";
import { toast } from "sonner";

import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isRenderableImageUrl } from "@/lib/media";
import { uploadsApi } from "@/services/api/uploads";

export const ImageUploadField = ({
  value,
  onChange,
  folder,
}: {
  value?: string;
  onChange: (value: string) => void;
  folder: "featured" | "content" | "products";
}) => {
  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadsApi.uploadImage(file, folder),
    onSuccess: (result) => {
      onChange(result.url);
      toast.success(
        isRenderableImageUrl(result.url)
          ? "Image uploaded successfully."
          : "Firebase is unavailable, so a placeholder image design will be used.",
      );
    },
    onError: () => {
      toast.error("Image upload failed. Check Firebase storage configuration.");
    },
  });

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[1.5rem] border border-line bg-card/90">
        {value ? (
          isRenderableImageUrl(value) ? (
            <img
              alt="Selected upload"
              className="aspect-[4/3] w-full object-cover"
              src={value}
            />
          ) : (
            <MediaPlaceholder
              className="aspect-[4/3] w-full"
              label="Preview placeholder"
              seed={value}
            />
          )
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center text-sm text-stone">
            No image selected yet.
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:shadow-card">
          {uploadMutation.isPending ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          Upload image
          <input
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                uploadMutation.mutate(file);
              }
            }}
            type="file"
          />
        </label>
        <Input
          onChange={(event) => onChange(event.target.value)}
          placeholder="Or paste an image URL"
          value={value ?? ""}
        />
      </div>
    </div>
  );
};
