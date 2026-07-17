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

export function buildEnrollmentNotificationEmail(
  enrollment: EnrollmentDTO,
): EmailContent {
  const rows: Array<[string, string]> = [
    ["Nume și prenume", enrollment.fullName],
    ["Telefon", enrollment.phone],
    ["Email", enrollment.email],
    ["Vârsta copilului", enrollment.childAge],
    ["Clasa", enrollment.childGrade],
    ["Cursul dorit", enrollment.course],
    [
      "Zile preferate",
      enrollment.preferredDays.length ? enrollment.preferredDays.join(", ") : "—",
    ],
    ["Interval orar preferat", enrollment.preferredSchedule || "—"],
    ["Mesaj", enrollment.message || "—"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;font-size:13px;color:#6B7361;border-bottom:1px solid #EBDFC4;white-space:nowrap;vertical-align:top;">${esc(
            label,
          )}</td>
          <td style="padding:10px 16px;font-size:14px;color:#2C3327;border-bottom:1px solid #EBDFC4;font-weight:600;">${esc(
            value,
          )}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="ro">
  <body style="margin:0;background:#FBF7EE;font-family:'Segoe UI',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FBF7EE;padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px -12px rgba(60,83,48,0.18);">
            <tr>
              <td style="background:#5F8248;padding:24px 32px;">
                <p style="margin:0;color:#FBF7EE;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Up for Learning</p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">Cerere nouă de înscriere</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${tableRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <p style="margin:0;font-size:12px;color:#6B7361;">Solicitare primită prin formularul de pe site. Poți gestiona cererea din panoul de administrare.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = rows
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return {
    subject: `Înscriere nouă — ${enrollment.fullName} (${enrollment.course})`,
    html,
    text: `Cerere nouă de înscriere\n\n${text}`,
  };
}
