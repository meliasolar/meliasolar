import { useRef, useMemo, useState, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "@/styles/rich-text-editor.css";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Register custom video blot that creates proper <video> elements
const BlockEmbed = Quill.import("blots/block/embed");

class VideoBlot extends (BlockEmbed as any) {
  static blotName = "video";
  static tagName = "video";

  static create(url: string) {
    const node = super.create() as HTMLVideoElement;
    node.setAttribute("src", url);
    node.setAttribute("controls", "true");
    node.setAttribute("autoplay", "true");
    node.setAttribute("muted", "true");
    node.setAttribute("playsinline", "true");
    node.setAttribute("preload", "metadata");
    node.setAttribute("loop", "true");
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }
}

Quill.register(VideoBlot);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, placeholder = "Start writing..." }: RichTextEditorProps) => {
  const quillRef = useRef<ReactQuill>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadMedia = useCallback(async (file: File) => {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    // Validate file type
    if (!isImage && !isVideo) {
      toast.error("Only image and video files are allowed");
      return;
    }

    // Validate specific video types
    if (isVideo && !["video/mp4", "video/webm"].includes(file.type)) {
      toast.error("Only MP4 and WebM video formats are supported");
      return;
    }

    // Size limits: 5MB for images, 25MB for videos
    const maxSize = isVideo ? 25 * 1024 * 1024 : 5 * 1024 * 1024;
    const maxSizeLabel = isVideo ? "25MB" : "5MB";

    if (file.size > maxSize) {
      toast.error(`${isVideo ? "Video" : "Image"} must be less than ${maxSizeLabel}`);
      return;
    }

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Show loading state
    const range = quill.getSelection(true);
    const loadingText = `Uploading ${isVideo ? "video" : "image"}...`;
    quill.insertText(range.index, loadingText, { italic: true });

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

      // Remove loading text and insert media
      quill.deleteText(range.index, loadingText.length);
      
      if (isVideo) {
        quill.insertEmbed(range.index, "video", urlData.publicUrl);
      } else {
        quill.insertEmbed(range.index, "image", urlData.publicUrl);
      }
      
      quill.setSelection(range.index + 1, 0);

      toast.success(`${isVideo ? "Video" : "Image"} uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      quill.deleteText(range.index, loadingText.length);
      toast.error(`Failed to upload ${isVideo ? "video" : "image"}. Make sure you're logged in as admin.`);
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
        await uploadMedia(file);
      }
    };
  }, [uploadMedia]);

  const videoHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/mp4,video/webm");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        await uploadMedia(file);
      }
    };
  }, [uploadMedia]);

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
    const mediaFiles = files.filter(file => 
      file.type.startsWith("image/") || 
      file.type === "video/mp4" || 
      file.type === "video/webm"
    );

    if (mediaFiles.length === 0) {
      toast.error("No valid image or video files found");
      return;
    }

    // Upload all media files
    for (const file of mediaFiles) {
      await uploadMedia(file);
    }
  }, [uploadMedia]);

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    
    for (const item of items) {
      if (item.type.startsWith("image/") || item.type === "video/mp4" || item.type === "video/webm") {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await uploadMedia(file);
        }
        break;
      }
    }
  }, [uploadMedia]);

  const modules = useMemo(() => ({
    toolbar: {
      container: "#toolbar-top",
      handlers: {
        image: imageHandler,
        video: videoHandler,
      },
    },
  }), [imageHandler, videoHandler]);

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
      <button className="ql-video" title="Insert video" />
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
    "video",
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
            <p className="text-sm font-medium">Drop images or videos here to upload</p>
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
