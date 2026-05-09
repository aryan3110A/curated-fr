"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { startTransition, useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getApiErrorMessage } from "@/lib/api-error";
import { blogsApi, type BlogPayload } from "@/services/api/blogs";
import { taxonomiesApi } from "@/services/api/taxonomies";

import { AIGeneratorPanel } from "./ai-generator-panel";
import { ImageUploadField } from "./image-upload-field";
import { RichEditor } from "./rich-editor";

const productSchema = z.object({
  title: z.string().min(2).max(160),
  description: z.string().min(10).max(500),
  image: z.string().optional().default(""),
  buyUrl: z.string().url(),
  price: z.string().optional().default("")
});

const blogFormSchema = z.object({
  title: z.string().min(4).max(160),
  slug: z.string().min(3),
  excerpt: z.string().min(20).max(320),
  content: z.string().min(120),
  featuredImage: z.string().optional().default(""),
  categoryId: z.string().optional().default(""),
  tagIds: z.array(z.string()).default([]),
  metaTitle: z.string().optional().default(""),
  metaDescription: z.string().optional().default(""),
  pinterestUrl: z.string().optional().default(""),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  products: z.array(productSchema).default([])
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

const emptyValues: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  content: "<section><p></p></section>",
  featuredImage: "",
  categoryId: "",
  tagIds: [],
  metaTitle: "",
  metaDescription: "",
  pinterestUrl: "",
  status: "DRAFT",
  products: []
};

const selectClassName =
  "h-12 w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-stone/30 focus:ring-2 focus:ring-stone/10";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizePayload = (values: BlogFormValues): BlogPayload => ({
  ...values,
  featuredImage: values.featuredImage || undefined,
  categoryId: values.categoryId || undefined,
  metaTitle: values.metaTitle || undefined,
  metaDescription: values.metaDescription || undefined,
  pinterestUrl: values.pinterestUrl || undefined,
  products: values.products.map((product) => ({
    ...product,
    image: product.image || undefined,
    price: product.price || undefined
  }))
});

export const BlogForm = ({ blogId, mode }: { blogId?: string; mode: "create" | "edit" }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: emptyValues
  });
  const watchedTitle = form.watch("title");
  const watchedTagIds = form.watch("tagIds");

  const categoriesQuery = useQuery({
    queryKey: ["taxonomies", "categories"],
    queryFn: taxonomiesApi.categories
  });
  const tagsQuery = useQuery({
    queryKey: ["taxonomies", "tags"],
    queryFn: taxonomiesApi.tags
  });
  const existingBlogQuery = useQuery({
    queryKey: ["admin", "blog", blogId],
    queryFn: () => blogsApi.getById(blogId as string),
    enabled: mode === "edit" && Boolean(blogId)
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products"
  });

  useEffect(() => {
    if (watchedTitle && !form.getFieldState("slug").isDirty) {
      form.setValue("slug", toSlug(watchedTitle), { shouldDirty: false });
    }
  }, [form, watchedTitle]);

  useEffect(() => {
    if (!existingBlogQuery.data) {
      return;
    }

    const blog = existingBlogQuery.data;
    form.reset({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage || "",
      categoryId: blog.category?.id || "",
      tagIds: blog.tags.map((tag) => tag.id),
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      pinterestUrl: blog.pinterestUrl || "",
      status: blog.status,
      products: blog.products.map((product) => ({
        title: product.title,
        description: product.description,
        image: product.image || "",
        buyUrl: product.buyUrl,
        price: product.price || ""
      }))
    });
  }, [existingBlogQuery.data, form]);

  const saveMutation = useMutation({
    mutationFn: (values: BlogFormValues) => {
      const payload = normalizePayload(values);
      return mode === "create" ? blogsApi.create(payload) : blogsApi.update(blogId as string, payload);
    },
    onSuccess: () => {
      toast.success(mode === "create" ? "Blog created successfully." : "Blog updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin", "summary"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      startTransition(() => {
        router.push("/blogs");
        router.refresh();
      });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to save the blog right now."));
    }
  });

  const toggleTag = (tagId: string) => {
    const next = watchedTagIds.includes(tagId) ? watchedTagIds.filter((value) => value !== tagId) : [...watchedTagIds, tagId];
    form.setValue("tagIds", next, { shouldDirty: true });
  };

  if (mode === "edit" && existingBlogQuery.isLoading) {
    return <Card className="rounded-[2rem] p-8 text-sm text-stone">Loading blog editor...</Card>;
  }

  return (
    <div className="space-y-8">
      <Card className="bg-white/85">
        <CardHeader>
          <CardTitle className="font-serif text-4xl">{mode === "create" ? "Create a new blog" : "Edit blog"}</CardTitle>
          <CardDescription>Write manually, generate with AI, or combine both. Every field is structured for search, Pinterest, and affiliate-ready content.</CardDescription>
        </CardHeader>
      </Card>

      <AIGeneratorPanel
        getContext={() => ({
          title: form.getValues("title"),
          excerpt: form.getValues("excerpt"),
          content: form.getValues("content")
        })}
        onApplyBlog={(payload) => {
          form.setValue("title", payload.title, { shouldDirty: true });
          form.setValue("excerpt", payload.excerpt, { shouldDirty: true });
          form.setValue("content", payload.content, { shouldDirty: true });
          form.setValue("metaTitle", payload.seoTitle, { shouldDirty: true });
          form.setValue("metaDescription", payload.metaDescription, { shouldDirty: true });
        }}
        onApplySeo={(payload) => {
          form.setValue("metaTitle", payload.seoTitle, { shouldDirty: true });
          form.setValue("metaDescription", payload.metaDescription, { shouldDirty: true });
        }}
      />

      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(
          (values) => {
            saveMutation.mutate(values);
          },
          (errors) => {
            const firstMessage = Object.values(errors)
              .map((error) => error?.message)
              .find((message): message is string => Boolean(message));

            if (firstMessage) {
              toast.error(firstMessage);
            }
          }
        )}
      >
        <Card className="bg-white/85">
          <CardHeader>
            <CardTitle className="font-serif text-3xl">Core story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title</label>
                <Input placeholder="Minimal living room ideas that still feel warm" {...form.register("title")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Slug</label>
                <Input placeholder="minimal-living-room-ideas" {...form.register("slug")} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Excerpt</label>
              <Textarea placeholder="Short description for cards, previews, and metadata." {...form.register("excerpt")} />
            </div>
            <Controller
              control={form.control}
              name="featuredImage"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Featured image</label>
                  <ImageUploadField folder="featured" onChange={field.onChange} value={field.value} />
                </div>
              )}
            />
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-foreground">Category</label>
                <select className={selectClassName} {...form.register("categoryId")}>
                  <option value="">Select category</option>
                  {categoriesQuery.data?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-foreground">Status</label>
                <select className={selectClassName} {...form.register("status")}>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-medium text-foreground">Pinterest URL</label>
                <Input placeholder="https://pinterest.com/..." {...form.register("pinterestUrl")} />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Tags</label>
              <div className="flex flex-wrap gap-3">
                {tagsQuery.data?.map((tag) => {
                  const active = watchedTagIds.includes(tag.id);

                  return (
                    <button
                      className={active ? "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background" : "rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-stone"}
                      key={tag.id}
                      onClick={(event) => {
                        event.preventDefault();
                        toggleTag(tag.id);
                      }}
                      type="button"
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <Controller
              control={form.control}
              name="content"
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Article content</label>
                  <RichEditor onChange={field.onChange} value={field.value} />
                </div>
              )}
            />
          </CardContent>
        </Card>

        <Card className="bg-white/85">
          <CardHeader>
            <CardTitle className="font-serif text-3xl">SEO and metadata</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">SEO title</label>
                <Input placeholder="Search-friendly headline" {...form.register("metaTitle")} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Meta description</label>
                <Textarea placeholder="Compelling meta description for search and social cards" {...form.register("metaDescription")} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/85">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="font-serif text-3xl">Product recommendations</CardTitle>
                <CardDescription>Add affiliate or external product links that appear inside the story.</CardDescription>
              </div>
              <Button
                onClick={() => append({ title: "", description: "", image: "", buyUrl: "https://", price: "" })}
                type="button"
                variant="secondary"
              >
                <Plus className="mr-2 h-4 w-4" /> Add product
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {fields.length === 0 ? <Badge>No products added yet</Badge> : null}
            {fields.map((field, index) => (
              <div className="space-y-4 rounded-[1.75rem] border border-line bg-card/80 p-5" key={field.id}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">Product {index + 1}</p>
                  <Button onClick={() => remove(index)} size="sm" type="button" variant="ghost">
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Product title" {...form.register(`products.${index}.title`)} />
                  <Input placeholder="Buy URL" {...form.register(`products.${index}.buyUrl`)} />
                  <Input placeholder="Price" {...form.register(`products.${index}.price`)} />
                  <Controller
                    control={form.control}
                    name={`products.${index}.image`}
                    render={({ field: imageField }) => (
                      <ImageUploadField folder="products" onChange={imageField.onChange} value={imageField.value} />
                    )}
                  />
                </div>
                <Textarea placeholder="Short product description" {...form.register(`products.${index}.description`)} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button disabled={saveMutation.isPending} size="lg" type="submit">
            {mode === "create" ? "Create blog" : "Save changes"}
          </Button>
          <Button onClick={() => router.push("/blogs")} size="lg" type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
