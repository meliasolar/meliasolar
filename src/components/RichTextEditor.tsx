import { useRef, useMemo, useState, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadImage = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Show loading state
    const range = quill.getSelection(true);
    quill.insertText(range.index, "Uploading image...", { italic: true });

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(data.path);

      // Remove loading text and insert image
      quill.deleteText(range.index, "Uploading image...".length);
      quill.insertEmbed(range.index, "image", urlData.publicUrl);
      quill.setSelection(range.index + 1, 0);

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      quill.deleteText(range.index, "Uploading image...".length);
      toast.error("Failed to upload image. Make sure you're logged in as admin.");
    }
  }, []);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        await uploadImage(file);
      }
    };
  }, [uploadImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast.error("No valid image files found");
      return;
    }

    // Upload all images
    for (const file of imageFiles) {
      await uploadImage(file);
    }
  }, [uploadImage]);

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await uploadImage(file);
        }
        break;
      }
    }
  }, [uploadImage]);

  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar-top",
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  const toolbarButtons = (
    <>
      <select className="ql-header" defaultValue="">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="">Normal</option>
      </select>
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <select className="ql-color" />
      <select className="ql-background" />
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <select className="ql-align" />
      <button className="ql-blockquote" />
      <button className="ql-code-block" />
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-clean" />
    </>
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <div 
      className={`rich-text-editor relative ${isDragging ? "ring-2 ring-primary ring-offset-2" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 z-10 flex items-center justify-center pointer-events-none rounded-md">
          <div className="bg-background px-4 py-2 rounded-md shadow-lg border">
            <p className="text-sm font-medium">Drop images here to upload</p>
          </div>
        </div>
      )}
      
      {/* Top Toolbar */}
      <div id="toolbar-top" className="ql-toolbar ql-snow editor-toolbar-top">
        {toolbarButtons}
      </div>
      
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      
      {/* Bottom Toolbar */}
      <div 
        className="ql-toolbar ql-snow editor-toolbar-bottom"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const button = target.closest('button, select');
          if (button) {
            const topToolbar = document.getElementById('toolbar-top');
            const correspondingBtn = topToolbar?.querySelector(`.${button.className.split(' ')[0]}`);
            if (correspondingBtn) {
              (correspondingBtn as HTMLElement).click();
            }
          }
        }}
      >
        {toolbarButtons}
      </div>
    </div>
  );
};

export default RichTextEditor;
