import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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

    // Send notification email to business
    const businessEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Voltaic Now <onboarding@resend.dev>",
        to: ["meliaking@voltaicnow.com"],
        subject: `New Quote Request from ${name}`,
        html: `
          <h1>New Quote Request</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!businessEmailRes.ok) {
      const errorData = await businessEmailRes.json();
      console.error("Business email failed:", errorData);
      throw new Error(errorData.message || "Failed to send business notification");
    }

    console.log("Business notification email sent successfully");

    // Send confirmation email to customer
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Voltaic Now <onboarding@resend.dev>",
        to: [email],
        subject: "We received your quote request! 🫶",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1a365d;">Thank you for contacting Voltaic Now, ${name}!</h1>
            <p style="font-size: 16px; color: #333;">We have received your quote request and our team will get back to you within 24 hours.</p>
            <p style="font-size: 16px; color: #333;">Here's a summary of your message:</p>
            <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #555;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="font-size: 16px; color: #333;">In the meantime, feel free to call us at <a href="tel:+13103469466" style="color: #2b6cb0;">+1 (310) 346-9466</a> if you have any urgent questions.</p>
            <p style="font-size: 16px; color: #333; margin-top: 30px;">Best regards,<br><strong>The Voltaic Now Team</strong></p>
          </div>
        `,
      }),
    });

    if (!customerEmailRes.ok) {
      console.error("Customer email failed but business email succeeded");
    } else {
      console.log("Customer confirmation email sent successfully");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Emails sent successfully" 
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
