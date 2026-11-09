"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Quote,
  List,
  ListOrdered,
  Link2,
  Unlink,
  Code,
  Minus,
  Eye,
  Edit3,
  Sparkles,
  Undo,
  Redo,
  Pilcrow,
} from "lucide-react";
import { Button } from "@repo/ui";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the technical analysis, geotechnical methodology, or foresight narrative here...",
  minHeight = "460px",
}: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline font-medium hover:opacity-80 transition-opacity",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-stone max-w-none dark:prose-invert focus:outline-none p-6 text-foreground text-sm sm:text-base leading-relaxed [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-5 [&>h3]:mb-2 [&>p]:mb-4 [&>blockquote]:border-l-2 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>hr]:my-6 [&>hr]:border-border [&>pre]:bg-muted [&>pre]:p-4 [&>pre]:rounded-xs [&>pre]:font-mono [&>pre]:text-xs",
        style: `min-height: ${minHeight};`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value if changed outside editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div
        style={{ minHeight }}
        className="border border-border rounded-xs bg-card p-6 flex items-center justify-center text-xs text-muted-foreground"
      >
        Initializing Tiptap Editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL (e.g. https://moa.ng/projects/civic):", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Metrics
  const textContent = editor.getText().trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;
  const charCount = textContent.length;
  const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="border border-border rounded-xs bg-card overflow-hidden shadow-2xs focus-within:border-primary/50 transition-colors">
      {/* 1. Tiptap Formatting Toolbar */}
      <div className="p-2 border-b border-border bg-muted/30 flex flex-wrap items-center justify-between gap-2">
        {/* Buttons Group */}
        <div className="flex flex-wrap items-center gap-0.5">
          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-1.5 rounded-xs text-xs font-bold transition-colors ${
              editor.isActive("heading", { level: 2 })
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Heading 2 (H2)"
          >
            <Heading1 className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-1.5 rounded-xs text-xs font-bold transition-colors ${
              editor.isActive("heading", { level: 3 })
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Heading 3 (H3)"
          >
            <Heading2 className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-1.5 rounded-xs text-xs transition-colors ${
              editor.isActive("paragraph")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Normal Paragraph"
          >
            <Pilcrow className="size-4" />
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Inline Styles */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("bold")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("italic")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("underline")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Underline (Ctrl+U)"
          >
            <UnderlineIcon className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("strike")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("code")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Inline Code"
          >
            <Code className="size-4" />
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Blockquotes & Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("blockquote")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Technical Callout / Blockquote"
          >
            <Quote className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("bulletList")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Bullet List"
          >
            <List className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("orderedList")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Numbered List"
          >
            <ListOrdered className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-1.5 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title="Horizontal Divider"
          >
            <Minus className="size-4" />
          </button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Links */}
          <button
            type="button"
            onClick={setLink}
            className={`p-1.5 rounded-xs transition-colors ${
              editor.isActive("link")
                ? "bg-primary text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Add Link"
          >
            <Link2 className="size-4" />
          </button>

          {editor.isActive("link") && (
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              className="p-1.5 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Remove Link"
            >
              <Unlink className="size-4" />
            </button>
          )}

          <div className="h-4 w-px bg-border mx-1" />

          {/* Undo / Redo */}
          <button
            type="button"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 transition-colors"
            title="Undo"
          >
            <Undo className="size-4" />
          </button>

          <button
            type="button"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 rounded-xs text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 transition-colors"
            title="Redo"
          >
            <Redo className="size-4" />
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-background border border-border rounded-xs p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`px-2.5 py-1 rounded-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "write"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Edit3 className="size-3" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-2.5 py-1 rounded-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-primary text-white font-semibold shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="size-3" />
            <span>Public Reader Preview</span>
          </button>
        </div>
      </div>

      {/* 2. Tiptap Content Area */}
      {activeTab === "write" ? (
        <EditorContent editor={editor} />
      ) : (
        /* Public Reader Preview Mode */
        <div
          style={{ minHeight }}
          className="p-8 bg-muted/10 text-foreground overflow-y-auto"
        >
          {editor.getHTML().trim() ? (
            <div
              dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
              className="prose prose-stone max-w-2xl mx-auto dark:prose-invert [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-5 [&>h3]:mb-2 [&>p]:text-base [&>p]:leading-relaxed [&>p]:mb-5 [&>blockquote]:border-l-2 [&>blockquote]:border-primary [&>blockquote]:pl-5 [&>blockquote]:py-1 [&>blockquote]:italic [&>blockquote]:text-foreground/90 [&>blockquote]:my-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>hr]:my-8 [&>hr]:border-border"
            />
          ) : (
            <div className="py-16 text-center text-muted-foreground text-xs">
              No write-up content to preview yet. Switch back to Write mode to craft your article.
            </div>
          )}
        </div>
      )}

      {/* 3. Footer Stats Bar */}
      <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <div className="flex items-center gap-3">
          <span>{wordCount} Words</span>
          <span>•</span>
          <span>{charCount} Characters</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="size-3 text-primary" />
          <span>~{readTimeMinutes} min read</span>
        </div>
      </div>
    </div>
  );
}
