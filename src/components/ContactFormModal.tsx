import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft, Send, Check, Battery, User, Mail, Phone, MapPin, CreditCard, Zap } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

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

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "Your Name", icon: User, field: "name" },
  { id: 2, title: "Email Address", icon: Mail, field: "email" },
  { id: 3, title: "Phone Number", icon: Phone, field: "phone" },
  { id: 4, title: "Property Address", icon: MapPin, field: "propertyAddress" },
  { id: 5, title: "Purchase Preference", icon: CreditCard, field: "purchasePreference" },
  { id: 6, title: "Energy Usage", icon: Zap, field: "energyConsumption" },
  { id: 7, title: "Battery Storage", icon: Battery, field: "interestedInStorage" },
  { id: 8, title: "Additional Details", icon: Send, field: "message" },
];

const ContactFormModal = ({ open, onOpenChange }: ContactFormModalProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    purchasePreference: "",
    energyConsumption: "",
    energyUnit: "USD/Month",
    interestedInStorage: false,
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const resetForm = () => {
    setCurrentStep(0);
    setDirection(1);
    setFormData({
      name: "",
      email: "",
      phone: "",
      propertyAddress: "",
      purchasePreference: "",
      energyConsumption: "",
      energyUnit: "USD/Month",
      interestedInStorage: false,
      message: "",
    });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const step = steps[currentStep];
    const field = step.field as keyof ContactFormData;
    
    // Skip validation for optional message field
    if (field === "message") return true;
    if (field === "interestedInStorage") return true;

    const fieldSchema = {
      name: z.string().trim().min(1, "Name is required"),
      email: z.string().trim().email("Please enter a valid email"),
      phone: z.string().trim().min(1, "Phone is required"),
      propertyAddress: z.string().trim().min(1, "Property address is required"),
      purchasePreference: z.string().min(1, "Please select a purchase preference"),
      energyConsumption: z.string().trim().min(1, "Energy consumption is required"),
    };

    if (field in fieldSchema) {
      const result = fieldSchema[field as keyof typeof fieldSchema].safeParse(formData[field]);
      if (!result.success) {
        setErrors({ [field]: result.error.errors[0].message });
        return false;
      }
    }
    
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
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
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data,
      });

      if (error) {
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

      resetForm();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentStep < steps.length - 1) {
      e.preventDefault();
      handleNext();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const CurrentIcon = steps[currentStep].icon;

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.field) {
      case "name":
        return (
          <div className="space-y-4">
            <Label htmlFor="name" className="text-lg font-medium text-foreground">
              What's your full name?
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className={`text-lg py-6 bg-muted border-border ${errors.name ? "border-destructive" : ""}`}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>
        );

      case "email":
        return (
          <div className="space-y-4">
            <Label htmlFor="email" className="text-lg font-medium text-foreground">
              What's your email address?
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className={`text-lg py-6 bg-muted border-border ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        );

      case "phone":
        return (
          <div className="space-y-4">
            <Label htmlFor="phone" className="text-lg font-medium text-foreground">
              What's your phone number?
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoFocus
              className={`text-lg py-6 bg-muted border-border ${errors.phone ? "border-destructive" : ""}`}
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>
        );

      case "propertyAddress":
        return (
          <div className="space-y-4">
            <Label htmlFor="propertyAddress" className="text-lg font-medium text-foreground">
              What's the property address for installation?
            </Label>
            <AddressAutocomplete
              value={formData.propertyAddress}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, propertyAddress: value }));
                if (errors.propertyAddress) {
                  setErrors((prev) => ({ ...prev, propertyAddress: undefined }));
                }
              }}
              placeholder="Start typing your address..."
              className="text-lg py-6 bg-muted border-border"
              hasError={!!errors.propertyAddress}
            />
            {errors.propertyAddress && <p className="text-sm text-destructive">{errors.propertyAddress}</p>}
          </div>
        );

      case "purchasePreference":
        return (
          <div className="space-y-4">
            <Label className="text-lg font-medium text-foreground">
              How would you like to purchase?
            </Label>
            <Select
              value={formData.purchasePreference}
              onValueChange={(value) => {
                setFormData((prev) => ({ ...prev, purchasePreference: value }));
                if (errors.purchasePreference) {
                  setErrors((prev) => ({ ...prev, purchasePreference: undefined }));
                }
              }}
            >
              <SelectTrigger className={`text-lg py-6 bg-muted border-border ${errors.purchasePreference ? "border-destructive" : ""}`}>
                <SelectValue placeholder="Select your preference" />
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
        );

      case "energyConsumption":
        return (
          <div className="space-y-4">
            <Label className="text-lg font-medium text-foreground">
              What's your current energy consumption?
            </Label>
            <div className="flex gap-3">
              <Input
                id="energyConsumption"
                name="energyConsumption"
                type="number"
                placeholder="e.g. 850"
                value={formData.energyConsumption}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
                className={`flex-1 text-lg py-6 bg-muted border-border ${errors.energyConsumption ? "border-destructive" : ""}`}
                min="0"
              />
              <Select
                value={formData.energyUnit}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, energyUnit: value }))}
              >
                <SelectTrigger className="w-[150px] text-lg py-6 bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="USD/Month">USD/Month</SelectItem>
                  <SelectItem value="kWh/Month">kWh/Month</SelectItem>
                  <SelectItem value="kWh/Year">kWh/Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.energyConsumption && <p className="text-sm text-destructive">{errors.energyConsumption}</p>}
          </div>
        );

      case "interestedInStorage":
        return (
          <div className="space-y-6">
            <Label className="text-lg font-medium text-foreground">
              Are you interested in battery storage?
            </Label>
            <div className="flex items-center justify-between p-6 bg-muted rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <Battery className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Battery Storage</p>
                  <p className="text-sm text-muted-foreground">Backup power during outages</p>
                </div>
              </div>
              <Switch
                checked={formData.interestedInStorage}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, interestedInStorage: checked }))}
                className="scale-125"
              />
            </div>
          </div>
        );

      case "message":
        return (
          <div className="space-y-4">
            <Label htmlFor="message" className="text-lg font-medium text-foreground">
              Anything else you'd like to share? (Optional)
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your project, timeline, or any questions..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="text-lg bg-muted border-border"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      if (!value) resetForm();
      onOpenChange(value);
    }}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card border-border">
        <DialogTitle className="sr-only">Get Your Free Solar Quote</DialogTitle>
        
        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Icon & Content */}
        <div className="px-6 py-8 min-h-[280px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CurrentIcon className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Form Content */}
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button
              variant="solar"
              onClick={handleNext}
              className="flex-1"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="solar"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Submit
                  <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
