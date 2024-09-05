"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "../../ui/toggle";
import { Bold, Italic, List, ListOrdered, Strikethrough } from "lucide-react";
import { useFormContext } from "react-hook-form";
const Tiptap = ({ value }) => {
  console.log(value);
  const { setValue } = useFormContext();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal px-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc px-4",
          },
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("description", content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    content: value,
  });

  return (
    <div>
      <div>
        <Toggle
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="w-4 h-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="w-4 h-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="w-4 h-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }>
          <List className="w-4 h-4" />
        </Toggle>
        <Toggle
          aria-label="Toggle bold"
          //   pressed={editor.isActive("bold")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }>
          <ListOrdered className="w-4 h-4" />
        </Toggle>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
