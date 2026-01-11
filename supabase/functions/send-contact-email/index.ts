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
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone });

    // Validate inputs
    if (!name || !email || !phone || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send to Web3Forms
    const web3formsRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Quote Request from ${name}`,
        from_name: "Voltaic Now Website",
        name: name,
        email: email,
        phone: phone,
        message: message,
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
