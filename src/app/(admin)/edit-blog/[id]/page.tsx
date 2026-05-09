import { BlogForm } from "@/components/forms/blog-form";

type EditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  return <BlogForm blogId={id} mode="edit" />;
}
