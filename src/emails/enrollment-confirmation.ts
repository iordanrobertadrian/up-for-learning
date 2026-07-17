import { siteConfig } from "@/config/site";
import type { EnrollmentDTO } from "@/types";

interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

const esc = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function buildEnrollmentConfirmationEmail(
  enrollment: EnrollmentDTO,
): EmailContent {
  const firstName = enrollment.fullName.trim().split(/\s+/).pop() ?? "";
  const greeting = firstName ? `Bună, ${esc(firstName)},` : "Bună ziua,";

  const html = `<!doctype html>
<html lang="ro">
  <body style="margin:0;background:#FBF7EE;font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF7EE;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px -12px rgba(60,83,48,0.18);">
            <tr>
              <td style="background:#5F8248;padding:26px 32px;">
                <p style="margin:0;color:#FBF7EE;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Up for Learning</p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:22px;">Îți mulțumim!</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 16px;font-size:15px;color:#2C3327;">${greeting}</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4A5340;">
                  Îți mulțumim că ai contactat <strong style="color:#2C3327;">Up for Learning</strong>. Acesta este un mesaj automat prin care confirmăm primirea solicitării tale.
                </p>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4A5340;">
                  Ne propunem să răspundem tuturor solicitărilor venite prin e-mail cât mai curând posibil, în aproximativ <strong style="color:#2C3327;">două zile lucrătoare</strong>.
                </p>
                <p style="margin:0 0 4px;font-size:15px;color:#4A5340;">Cu gânduri bune,</p>
                <p style="margin:0 0 8px;font-size:15px;font-weight:600;color:#5F8248;">Echipa Up for Learning</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #EBDFC4;">
                  <tr>
                    <td style="padding-top:18px;">
                      <p style="margin:0 0 6px;font-size:13px;color:#6B7361;">📞 <a href="tel:${esc(
                        siteConfig.contact.phoneHref.replace("tel:", ""),
                      )}" style="color:#5F8248;text-decoration:none;">${esc(
                        siteConfig.contact.phone,
                      )}</a></p>
                      <p style="margin:0 0 6px;font-size:13px;color:#6B7361;">✉️ <a href="mailto:${esc(
                        siteConfig.contact.email,
                      )}" style="color:#5F8248;text-decoration:none;">${esc(
                        siteConfig.contact.email,
                      )}</a></p>
                      <p style="margin:0;font-size:13px;color:#6B7361;">📍 ${esc(
                        siteConfig.contact.address,
                      )}, ${esc(siteConfig.contact.city)}, ${esc(
                        siteConfig.contact.county,
                      )}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#F4EEE1;padding:16px 32px;">
                <p style="margin:0;font-size:12px;color:#8A8577;text-align:center;">Acesta este un mesaj automat — te rugăm să nu răspunzi la acest e-mail.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "Acesta este un mesaj automat – te rugăm să nu răspunzi la acest e-mail.",
    "",
    "Îți mulțumim că ai contactat Up for Learning. Acesta este un mesaj automat prin care confirmăm primirea solicitării tale.",
    "",
    "Ne propunem să răspundem tuturor solicitărilor venite prin e-mail cât mai curând posibil, în aproximativ două zile lucrătoare.",
    "",
    "Cu gânduri bune,",
    "Echipa Up for Learning",
    "",
    `${siteConfig.contact.phone} · ${siteConfig.contact.email}`,
    `${siteConfig.contact.address}, ${siteConfig.contact.city}, ${siteConfig.contact.county}`,
  ].join("\n");

  return {
    subject: "Am primit solicitarea ta · Up for Learning",
    html,
    text,
  };
}
