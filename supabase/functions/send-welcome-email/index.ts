import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    // Authenticate the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claimsData, error: claimsError } = await anonClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Use email from JWT claims
    const email = claimsData.claims.email as string;
    if (!email) {
      return new Response(
        JSON.stringify({ error: "No email in token" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get displayName from request body (optional, not sensitive)
    const { displayName } = await req.json();

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const greeting = displayName ? `שלום ${displayName},` : "שלום,";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "SignaturePro <noreply@galyam-studio.co.il>",
        to: [email],
        subject: "ברוכים הבאים ל-SignaturePro",
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
              font-size: 28px;
              font-weight: 700;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 18px;
              margin-bottom: 20px;
            }
            .intro {
              margin-bottom: 25px;
              color: #374151;
            }
            .features {
              background-color: #f3f4f6;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .features ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .features li {
              padding: 8px 0;
              padding-right: 25px;
              position: relative;
              color: #374151;
            }
            .features li::before {
              content: "•";
              color: #7c3aed;
              font-weight: bold;
              position: absolute;
              right: 5px;
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
            .signature {
              margin-top: 30px;
              color: #374151;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ברוכים הבאים ל-SignaturePro</h1>
            </div>
            <div class="content">
              <p class="greeting">${greeting}</p>
              <p class="intro">שמחים שהצטרפת אלינו.</p>
              <p class="intro">ב-SignaturePro תוכל ליצור חתימות מייל מקצועיות ומעוצבות תוך דקות ספורות, ולהטביע את החותם האישי שלך בכל הודעה שתשלח.</p>
              
              <div class="features">
                <p><strong>מה מחכה לך:</strong></p>
                <ul>
                  <li>יצירת חתימה מקצועית בכמה צעדים פשוטים</li>
                  <li>תצוגה מקדימה בזמן אמת של כל שינוי</li>
                  <li>הוספת פרטי קשר, לוגו ורשתות חברתיות</li>
                  <li>הורדת קובץ HTML מוכן לשימוש בכל תוכנת מייל</li>
                  <li>שמירה וניהול של מספר חתימות</li>
                </ul>
              </div>
              
              <p>הכל מוכן ומחכה לך, נותר רק להתחיל.</p>
              
              <div class="cta-section">
                <a href="https://aa23aaa.lovable.app/editor" class="cta-button">
                  התחילו ליצור את החתימה הראשונה שלכם
                </a>
              </div>
              
              <div class="signature">
                <p>בהצלחה,<br>צוות SignaturePro</p>
              </div>
            </div>
            <div class="footer">
              <p>SignaturePro by GalyamStudio</p>
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
    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
