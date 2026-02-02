import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Save, X, Image as ImageIcon, CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type PublishMode = "draft" | "now" | "scheduled";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  published: boolean;
  scheduled_at: string | null;
  created_at: string;
}

const AdminBlog = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const [publishMode, setPublishMode] = useState<PublishMode>("draft");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);

  // Helper to determine publish mode from a post
  const getPublishModeFromPost = (post: BlogPost): PublishMode => {
    if (post.published) return "now";
    if (post.scheduled_at) return "scheduled";
    return "draft";
  };

  // Helper to get scheduled datetime from date and time
  const getScheduledDateTime = (): string | null => {
    if (publishMode !== "scheduled" || !scheduledDate) return null;
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const dateTime = new Date(scheduledDate);
    dateTime.setHours(hours, minutes, 0, 0);
    return dateTime.toISOString();
  };

  // Helper to check if scheduled time is in the past
  const isScheduledInPast = (): boolean => {
    if (publishMode !== "scheduled" || !scheduledDate) return false;
    const scheduledDateTime = getScheduledDateTime();
    if (!scheduledDateTime) return false;
    return new Date(scheduledDateTime) <= new Date();
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchPosts();
    }
  }, [user, isAdmin]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ variant: "destructive", title: "Please select an image file" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "Image must be less than 5MB" });
      return;
    }

    setIsUploadingImage(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `featured-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(data.path);

      setFormData({ ...formData, image_url: urlData.publicUrl });
      toast({ title: "Featured image uploaded!" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to upload image",
        description: error.message,
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFeaturedDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(true);
  };

  const handleFeaturedDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(false);
  };

  const handleFeaturedDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFeatured(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith("image/"));

    if (!imageFile) {
      toast({ variant: "destructive", title: "Please drop an image file" });
      return;
    }

    await handleImageUpload(imageFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast({
        variant: "destructive",
        title: "Please fill in all required fields",
      });
      return;
    }

    setIsSaving(true);

    // If scheduled time is in the past, treat as publish now
    const effectivePublishMode = isScheduledInPast() ? "now" : publishMode;
    const scheduledDateTime = effectivePublishMode === "scheduled" ? getScheduledDateTime() : null;

    try {
      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url || null,
            published: effectivePublishMode === "now",
            scheduled_at: scheduledDateTime,
          })
          .eq("id", editingPost.id);

        if (error) throw error;
        toast({ 
          title: effectivePublishMode === "scheduled" 
            ? `Post scheduled for ${format(new Date(scheduledDateTime!), "PPP 'at' p")}` 
            : "Post updated successfully!" 
        });
      } else {
        const { error } = await supabase.from("blog_posts").insert({
          title: formData.title,
          content: formData.content,
          image_url: formData.image_url || null,
          published: effectivePublishMode === "now",
          scheduled_at: scheduledDateTime,
          author_id: user?.id,
        });

        if (error) throw error;
        toast({ 
          title: effectivePublishMode === "scheduled" 
            ? `Post scheduled for ${format(new Date(scheduledDateTime!), "PPP 'at' p")}` 
            : "Post created successfully!" 
        });
      }

      setIsEditing(false);
      setEditingPost(null);
      setFormData({ title: "", content: "", image_url: "" });
      setPublishMode("draft");
      setScheduledDate(undefined);
      setScheduledTime("09:00");
      fetchPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error saving post",
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      image_url: post.image_url || "",
    });
    const mode = getPublishModeFromPost(post);
    setPublishMode(mode);
    if (post.scheduled_at) {
      const scheduledDate = new Date(post.scheduled_at);
      setScheduledDate(scheduledDate);
      setScheduledTime(format(scheduledDate, "HH:mm"));
    } else {
      setScheduledDate(undefined);
      setScheduledTime("09:00");
    }
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: error.message,
      });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Access Denied
            </h1>
            <p className="text-muted-foreground mb-8">
              You don't have permission to access this page. Admin access is required.
            </p>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>News Admin | Melia King Solar</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                News Admin
              </h1>
              <p className="text-muted-foreground">
                Manage your news posts
              </p>
            </div>
            <div className="flex gap-3">
              {!isEditing && (
                <Button
                  onClick={() => {
                    setIsEditing(true);
                    setEditingPost(null);
                    setFormData({ title: "", content: "", image_url: "" });
                    setPublishMode("draft");
                    setScheduledDate(undefined);
                    setScheduledTime("09:00");
                  }}
                  variant="solar"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              )}
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Editor */}
          {isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {editingPost ? "Edit Post" : "Create New Post"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      className="text-lg"
                    />
                  </div>

                  {/* Featured Image Upload */}
                  <div className="space-y-2">
                    <Label>Featured Image</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      This image appears as the thumbnail and when shared on social media
                    </p>
                    
                    {formData.image_url ? (
                      <div className="relative rounded-lg overflow-hidden border border-border">
                        <img
                          src={formData.image_url}
                          alt="Featured"
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData({ ...formData, image_url: "" })}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleFeaturedDragOver}
                        onDragLeave={handleFeaturedDragLeave}
                        onDrop={handleFeaturedDrop}
                        className={cn(
                          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                          isDraggingFeatured 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary"
                        )}
                      >
                        {isUploadingImage ? (
                          <p className="text-muted-foreground">Uploading...</p>
                        ) : isDraggingFeatured ? (
                          <>
                            <ImageIcon className="w-10 h-10 text-primary mx-auto mb-3" />
                            <p className="text-primary font-medium mb-1">
                              Drop image here
                            </p>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                            <p className="text-muted-foreground mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content *</Label>
                    <RichTextEditor
                      content={formData.content}
                      onChange={(content) => setFormData({ ...formData, content })}
                      placeholder="Start writing your article..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Use the toolbar to format text. Drag & drop or paste images directly into the editor.
                    </p>
                  </div>

                  {/* Publishing Options */}
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
                    <Label className="text-base font-medium">Publishing Options</Label>
                    <RadioGroup
                      value={publishMode}
                      onValueChange={(value) => setPublishMode(value as PublishMode)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="draft" id="draft" />
                        <Label htmlFor="draft" className="font-normal cursor-pointer">
                          Save as Draft
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="now" id="now" />
                        <Label htmlFor="now" className="font-normal cursor-pointer">
                          Publish Now
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem value="scheduled" id="scheduled" className="mt-0.5" />
                        <div className="flex-1 space-y-3">
                          <Label htmlFor="scheduled" className="font-normal cursor-pointer">
                            Schedule for Later
                          </Label>
                          
                          {publishMode === "scheduled" && (
                            <div className="flex flex-wrap gap-3 pt-1">
                              {/* Date Picker */}
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-[200px] justify-start text-left font-normal",
                                      !scheduledDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={scheduledDate}
                                    onSelect={setScheduledDate}
                                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              
                              {/* Time Picker */}
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <Input
                                  type="time"
                                  value={scheduledTime}
                                  onChange={(e) => setScheduledTime(e.target.value)}
                                  className="w-[130px]"
                                />
                              </div>
                              
                              {scheduledDate && (
                                <p className="w-full text-sm text-muted-foreground">
                                  → Will publish: {format(scheduledDate, "EEEE, MMMM d, yyyy")} at {scheduledTime}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      variant="solar" 
                      disabled={isSaving || (publishMode === "scheduled" && !scheduledDate)}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving 
                        ? "Saving..." 
                        : publishMode === "scheduled" 
                          ? "Schedule Post" 
                          : editingPost 
                            ? "Update Post" 
                            : "Create Post"
                      }
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingPost(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Posts List */}
          <div className="space-y-4">
            {posts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No posts yet. Create your first post!
                  </p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      {post.image_url && (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-foreground truncate">
                            {post.title}
                          </h3>
                          {post.published ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex-shrink-0">
                              <Eye className="w-3 h-3" /> Published
                            </span>
                          ) : post.scheduled_at && new Date(post.scheduled_at) <= new Date() ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex-shrink-0">
                              <Eye className="w-3 h-3" /> Live (Scheduled)
                            </span>
                          ) : post.scheduled_at ? (
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0">
                              <CalendarIcon className="w-3 h-3" /> 
                              Scheduled: {format(new Date(post.scheduled_at), "MMM d, yyyy 'at' p")}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full flex-shrink-0">
                              <EyeOff className="w-3 h-3" /> Draft
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(post)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminBlog;
