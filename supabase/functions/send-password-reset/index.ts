import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PasswordResetRequest {
  email: string;
  resetUrl: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, resetUrl }: PasswordResetRequest = await req.json();

    // Validate required fields
    if (!email || !resetUrl) {
      throw new Error("Missing required fields: email and resetUrl");
    }

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SignaturePro <noreply@galyam-studio.co.il>",
        to: [email],
        subject: "איפוס סיסמה - SignaturePro",
        html: `
        <!DOCTYPE html>
        <html dir="rtl" lang="he">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Heebo', Arial, sans-serif;
              line-height: 1.8;
              color: #1a1a2e;
              background-color: #f8f9fa;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              color: #ffffff;
              margin: 0;
              font-size: 24px;
              font-weight: 700;
            }
            .content {
              padding: 40px 30px;
            }
            .intro {
              margin-bottom: 25px;
              color: #374151;
            }
            .warning {
              background-color: #fef3c7;
              border: 1px solid #f59e0b;
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              color: #92400e;
              font-size: 14px;
            }
            .cta-section {
              text-align: center;
              margin: 30px 0;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
              color: #ffffff !important;
              text-decoration: none;
              padding: 14px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
            }
            .footer {
              padding: 25px 30px;
              background-color: #f9fafb;
              text-align: center;
              border-top: 1px solid #e5e7eb;
            }
            .footer p {
              margin: 5px 0;
              color: #6b7280;
              font-size: 14px;
            }
            .expiry-note {
              margin-top: 20px;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>איפוס סיסמה</h1>
            </div>
            <div class="content">
              <p class="intro">שלום,</p>
              <p class="intro">קיבלנו בקשה לאיפוס הסיסמה שלך בחשבון SignaturePro.</p>
              <p class="intro">לחץ על הכפתור למטה כדי לבחור סיסמה חדשה:</p>
              
              <div class="cta-section">
                <a href="${resetUrl}" class="cta-button">
                  איפוס סיסמה
                </a>
              </div>
              
              <div class="warning">
                <strong>שים לב:</strong> הקישור הזה תקף לשעה אחת בלבד. אם לא ביקשת לאפס את הסיסמה, התעלם מהודעה זו.
              </div>
              
              <p class="expiry-note">
                אם הכפתור לא עובד, העתק את הקישור הבא לדפדפן שלך:<br>
                <a href="${resetUrl}" style="color: #7c3aed; word-break: break-all;">${resetUrl}</a>
              </p>
            </div>
            <div class="footer">
              <p>SignaturePro by GalyamStudio</p>
              <p>אם לא ביקשת לאפס את הסיסמה, ניתן להתעלם מהודעה זו.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    const emailResponse = await res.json();
    console.log("Password reset email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-password-reset function:", error);
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
