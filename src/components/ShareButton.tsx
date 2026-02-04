import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  slug: string;
  title: string;
  className?: string;
}

const ShareButton = ({ slug, title, className }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    return `${supabaseUrl}/functions/v1/og-meta?slug=${encodeURIComponent(slug)}`;
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Share link copied!", {
        description: "This link will show the article preview when shared on social media.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      setCopied(true);
      toast.success("Share link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopyLink}
      className={className}
      aria-label={`Copy share link for ${title}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </>
      )}
    </Button>
  );
};

export default ShareButton;
