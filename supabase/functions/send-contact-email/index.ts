import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const WEB3FORMS_ACCESS_KEY = Deno.env.get("WEB3FORMS_ACCESS_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  purchasePreference: string;
  energyConsumption: string;
  energyUnit: string;
  interestedInStorage: boolean;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      propertyAddress,
      purchasePreference,
      energyConsumption,
      energyUnit,
      interestedInStorage,
      message,
    }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone, propertyAddress });

    // Validate required inputs
    if (!name || !email || !phone || !propertyAddress || !purchasePreference || !energyConsumption || !energyUnit) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All required fields must be filled" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Format energy consumption with unit
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
