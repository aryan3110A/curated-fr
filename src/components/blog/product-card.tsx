import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MediaPlaceholder } from "@/components/shared/media-placeholder";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isRenderableImageUrl } from "@/lib/media";
import type { Product } from "@/types/blog";

export const ProductCard = ({
  product,
  blogHref,
}: {
  product: Product;
  blogHref?: string;
}) => {
  const productImageUrl = isRenderableImageUrl(product.image)
    ? product.image
    : undefined;

  return (
    <Card className="overflow-hidden bg-white/90">
      <div className="relative aspect-[5/4] overflow-hidden">
        {productImageUrl ? (
          <Image
            alt={product.title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            src={productImageUrl}
          />
        ) : (
          <MediaPlaceholder
            className="h-full w-full"
            compact
            label={product.title}
            seed={product.title}
          />
        )}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-xl">{product.title}</CardTitle>
          {product.price ? (
            <span className="rounded-full bg-beige px-3 py-1 text-sm font-semibold text-foreground">
              {product.price}
            </span>
          ) : null}
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href={product.buyUrl} rel="noreferrer" target="_blank">
            Buy now <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        {blogHref ? (
          <Button asChild variant="ghost">
            <Link href={blogHref}>Read the full story</Link>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
};
