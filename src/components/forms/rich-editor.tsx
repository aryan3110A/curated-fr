"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

import { cn } from "@/lib/utils";

const ToolButton = ({
  active,
  children,
  onClick
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className={cn(
      "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition",
      active ? "bg-foreground text-background" : "bg-beige text-stone hover:bg-white"
    )}
    onClick={(event) => {
      event.preventDefault();
      onClick();
    }}
    type="button"
  >
    {children}
  </button>
);

export const RichEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-foreground underline decoration-stone/30 underline-offset-4"
        }
      }),
      Placeholder.configure({
        placeholder: "Write a calm, immersive, search-friendly article..."
      })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "article-content min-h-[320px] focus:outline-none"
      }
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    }
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false);
    }
  }, [editor, value]);

  if (!editor) {
    return <div className="rounded-[1.75rem] border border-line bg-card/80 p-6 text-sm text-stone">Loading editor...</div>;
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line bg-card/90 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-line p-4">
        <ToolButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </ToolButton>
        <ToolButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </ToolButton>
        <ToolButton active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </ToolButton>
        <ToolButton active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </ToolButton>
        <ToolButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          List
        </ToolButton>
      </div>
      <EditorContent className="p-6" editor={editor} />
    </div>
  );
};
