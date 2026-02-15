import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Phone, Mail, MapPin, Battery } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import AddressAutocomplete from "@/components/AddressAutocomplete";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone is required").max(20, "Phone must be less than 20 characters"),
  propertyAddress: z.string().trim().min(1, "Property address is required").max(500, "Address must be less than 500 characters"),
  purchasePreference: z.string().min(1, "Please select a purchase preference"),
  energyConsumption: z.string().trim().min(1, "Energy consumption is required"),
  energyUnit: z.string().min(1, "Please select a unit"),
  interestedInStorage: z.boolean(),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    purchasePreference: "",
    energyConsumption: "",
    energyUnit: "kWh/Month",
    interestedInStorage: false,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (name: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data,
      });

      if (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again or call us directly.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Message sent! 🫶",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyAddress: "",
        purchasePreference: "",
        energyConsumption: "",
        energyUnit: "kWh/Month",
        interestedInStorage: false,
        message: "",
      });
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left Column - Info */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary-foreground tracking-tight">
              Get Your Free Quote 🫶
            </h2>
            <p className="text-primary-foreground/80 text-lg mt-6 max-w-md">
              Ready to start saving on your energy bills? Fill out the form and we'll get back to you within 24 hours.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-primary-foreground/70">Call us</div>
                  <a href="tel:+13103469466" className="font-semibold text-primary-foreground hover:underline">+1 (310) 346-9466</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-primary-foreground/70">Email us</div>
                  <a href="mailto:projects@meliasolar.com" className="font-semibold text-primary-foreground hover:underline">projects@meliasolar.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm text-primary-foreground/70">Service areas</div>
                  <div className="font-semibold text-primary-foreground">CA, TX, CO, NV, FL, HI, IL, MA, MD, NJ, VA, CT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground font-medium">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-muted border-border text-foreground ${errors.name ? "border-destructive" : ""}`}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground font-medium">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-muted border-border text-foreground ${errors.email ? "border-destructive" : ""}`}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-card-foreground font-medium">Phone *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`bg-muted border-border text-foreground ${errors.phone ? "border-destructive" : ""}`}
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
              </div>

              {/* Property Address with Autocomplete */}
              <div className="space-y-2">
                <Label htmlFor="propertyAddress" className="text-card-foreground font-medium">Property Address *</Label>
                <AddressAutocomplete
                  value={formData.propertyAddress}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, propertyAddress: value }));
                    if (errors.propertyAddress) {
                      setErrors((prev) => ({ ...prev, propertyAddress: undefined }));
                    }
                  }}
                  placeholder="Start typing your property address..."
                  className="bg-muted border-border text-foreground"
                  hasError={!!errors.propertyAddress}
                />
                {errors.propertyAddress && <p className="text-sm text-destructive">{errors.propertyAddress}</p>}
              </div>

              {/* Purchase Preference Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="purchasePreference" className="text-card-foreground font-medium">Purchase Preference *</Label>
                <Select
                  value={formData.purchasePreference}
                  onValueChange={(value) => handleSelectChange("purchasePreference", value)}
                >
                  <SelectTrigger className={`bg-muted border-border text-foreground ${errors.purchasePreference ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select purchase preference" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Help Me Decide">Help Me Decide</SelectItem>
                    <SelectItem value="Long Term Financing">Long Term Financing</SelectItem>
                    <SelectItem value="Short Term Financing">Short Term Financing</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                {errors.purchasePreference && <p className="text-sm text-destructive">{errors.purchasePreference}</p>}
              </div>

              {/* Energy Consumption with Unit Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="energyConsumption" className="text-card-foreground font-medium">Energy Consumption *</Label>
                <div className="flex gap-2">
                  <Input
                    id="energyConsumption"
                    name="energyConsumption"
                    type="number"
                    placeholder="e.g. 850"
                    value={formData.energyConsumption}
                    onChange={handleChange}
                    className={`flex-1 bg-muted border-border text-foreground ${errors.energyConsumption ? "border-destructive" : ""}`}
                    min="0"
                  />
                  <Select
                    value={formData.energyUnit}
                    onValueChange={(value) => handleSelectChange("energyUnit", value)}
                  >
                    <SelectTrigger className="w-[140px] bg-muted border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="kWh/Month">kWh/Month</SelectItem>
                      <SelectItem value="kWh/Year">kWh/Year</SelectItem>
                      <SelectItem value="USD/Month">USD/Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {errors.energyConsumption && <p className="text-sm text-destructive">{errors.energyConsumption}</p>}
              </div>

              {/* Interested in Storage/Backup Solution */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Battery className="w-5 h-5 text-primary" />
                  <Label htmlFor="interestedInStorage" className="text-card-foreground font-medium cursor-pointer">
                    Interested in Storage/Backup Solution?
                  </Label>
                </div>
                <Switch
                  id="interestedInStorage"
                  checked={formData.interestedInStorage}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, interestedInStorage: checked }))}
                />
              </div>

              {/* Message (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-card-foreground font-medium">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className={`bg-muted border-border text-foreground ${errors.message ? "border-destructive" : ""}`}
                />
                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                variant="solar"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Get My Free Quote
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
