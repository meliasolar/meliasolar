import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const WEB3FORMS_ACCESS_KEY = Deno.env.get("WEB3FORMS_ACCESS_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  propertyAddress: z.string().trim().min(1, "Address is required").max(500),
  purchasePreference: z.string().min(1).max(50),
  energyConsumption: z.string().trim().min(1).max(20),
  energyUnit: z.string().min(1).max(20),
  interestedInStorage: z.boolean(),
  message: z.string().trim().max(1000).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawBody = await req.json();
    const result = contactSchema.safeParse(rawBody);

    if (!result.success) {
      console.error("Validation failed:", result.error.flatten());
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, propertyAddress, purchasePreference, energyConsumption, energyUnit, interestedInStorage, message } = result.data;

    console.log("Received contact form submission:", { name, email: email.substring(0, 3) + "***", phone: "***" });

    const energyDisplay = `${energyConsumption} ${energyUnit}`;

    // Send to Web3Forms
    const web3formsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Solar Quote Request from ${name}`,
        from_name: "Melia Solar",
        name: name,
        email: email,
        phone: phone,
        property_address: propertyAddress,
        purchase_preference: purchasePreference,
        energy_consumption: energyDisplay,
        interested_in_storage: interestedInStorage ? "Yes" : "No",
        message: message || "No additional message provided",
      }),
    });

    const result = await web3formsRes.json();

    if (!web3formsRes.ok || !result.success) {
      console.error("Web3Forms submission failed:", result);
      throw new Error(result.message || "Failed to submit form");
    }

    console.log("Form submitted successfully via Web3Forms:", result);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Form submitted successfully" 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
