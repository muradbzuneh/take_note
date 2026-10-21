"use client";

import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Undo,
  Redo,
  Bold,
  Italic,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  SquareCode,
  Minus,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

interface RichTextEditorProps {
  initialContent?: JSONContent | Record<string, unknown>;
  onChange?: (content: JSONContent) => void;
  editable?: boolean;
}

export function RichTextEditor({
  initialContent,
  onChange,
  editable = true,
}: RichTextEditorProps) {
  // Track active states cleanly on editor transactions
  const [, setTick] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: initialContent && Object.keys(initialContent).length > 0
      ? initialContent
      : {
          type: "doc",
          content: [
            {
              type: "paragraph",
            },
          ],
        },
    immediatelyRender: false,
    editable,
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "tiptap ProseMirror focus:outline-none p-6 min-h-[400px]",
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getJSON());
      }
    },
    onTransaction: () => {
      setTick((t) => t + 1);
    },
  });

  useEffect(() => {
    if (editor && editable !== editor.isEditable) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  if (!editor) {
    return (
      <div className="w-full rounded-md border border-border bg-card p-6 min-h-[400px] flex items-center justify-center text-muted-foreground text-sm">
        Loading editor...
      </div>
    );
  }

  const getHeadingLabel = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    return "Paragraph";
  };

  return (
    <div className="w-full rounded-md border border-border bg-card text-card-foreground overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-1.5 bg-muted/40 border-b border-border select-none">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="size-8 p-0"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="size-8 p-0"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo className="size-4" />
          </Button>
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Heading Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-xs font-medium gap-1.5"
            >
              <span>{getHeadingLabel()}</span>
              <ChevronDown className="size-3 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-36">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive("paragraph") ? "bg-accent font-semibold" : ""}
            >
              Paragraph
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 })
                  ? "bg-accent font-semibold"
                  : ""
              }
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 })
                  ? "bg-accent font-semibold"
                  : ""
              }
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 })
                  ? "bg-accent font-semibold"
                  : ""
              }
            >
              Heading 3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Inline Formatting */}
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`size-8 p-0 ${
              editor.isActive("bold") ? "bg-accent text-accent-foreground font-bold" : ""
            }`}
            title="Bold (Ctrl+B)"
          >
            <Bold className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`size-8 p-0 ${
              editor.isActive("italic") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Italic (Ctrl+I)"
          >
            <Italic className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`size-8 p-0 ${
              editor.isActive("strike") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Strikethrough"
          >
            <Strikethrough className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`size-8 p-0 ${
              editor.isActive("code") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Inline Code"
          >
            <Code className="size-4" />
          </Button>
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Lists & Blocks */}
        <div className="flex items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`size-8 p-0 ${
              editor.isActive("bulletList") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Bullet List"
          >
            <List className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`size-8 p-0 ${
              editor.isActive("orderedList") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Numbered List"
          >
            <ListOrdered className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`size-8 p-0 ${
              editor.isActive("blockquote") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Blockquote"
          >
            <Quote className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`size-8 p-0 ${
              editor.isActive("codeBlock") ? "bg-accent text-accent-foreground" : ""
            }`}
            title="Code Block"
          >
            <SquareCode className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="size-8 p-0"
            title="Horizontal Divider"
          >
            <Minus className="size-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}

export default RichTextEditor;
