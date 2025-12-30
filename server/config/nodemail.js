import nodemailer from "nodemailer";
import { emailTemplates } from "./emailTemplates.js";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendEmail = async (to, subject, text, html = null) => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Tracky" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text,
    });

    console.log("📧 Email sent successfully to:", to);
    return true;
  } catch (error) {
    console.error("❌ Email failed:", error.message);
    return false;
  }
};

export const sendTemplatedEmail = async (templateName, to, data) => {
  try {
    const template = emailTemplates[templateName];

    if (!template) {
      throw new Error(`Template "${templateName}" not found`);
    }

    // Generate email content from template
    const emailData = template(data);

    // Send the email
    return await sendEmail(
      to,
      emailData.subject,
      emailData.html.replace(/<[^>]*>/g, ""),
      emailData.html
    );
  } catch (error) {
    console.error("❌ Templated email error:", error.message);
    return false;
  }
};

export const sendQuickEmail = async (to, subject, message, type = "info") => {
  try {
    let htmlContent = "";
    let icon = "📧";
    switch (type) {
      case "success":
        icon = "✅";
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f0f9f0; border-radius: 10px;">
            <div style="text-align: center; padding: 20px; background: #2e7d32; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">${icon} ${subject}</h1>
            </div>
            <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; line-height: 1.6;">${message}</p>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Best regards,<br>
                <strong>BudgetTrack Pro Team</strong>
              </p>
            </div>
          </div>
        `;
        break;
      case "warning":
        icon = "⚠️";
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fff3e0; border-radius: 10px;">
            <div style="text-align: center; padding: 20px; background: #ff9800; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">${icon} ${subject}</h1>
            </div>
            <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; line-height: 1.6;">${message}</p>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Best regards,<br>
                <strong>BudgetTrack Pro Team</strong>
              </p>
            </div>
          </div>
        `;
        break;
      case "error":
        icon = "❌";
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffebee; border-radius: 10px;">
            <div style="text-align: center; padding: 20px; background: #d32f2f; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">${icon} ${subject}</h1>
            </div>
            <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; line-height: 1.6;">${message}</p>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Best regards,<br>
                <strong>BudgetTrack Pro Team</strong>
              </p>
            </div>
          </div>
        `;
        break;
      default:
        icon = "📧";
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #e3f2fd; border-radius: 10px;">
            <div style="text-align: center; padding: 20px; background: #2196f3; color: white; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">${icon} ${subject}</h1>
            </div>
            <div style="padding: 30px; background: white; border-radius: 0 0 10px 10px;">
              <p style="font-size: 16px; line-height: 1.6;">${message}</p>
              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                Best regards,<br>
                <strong>BudgetTrack Pro Team</strong>
              </p>
            </div>
          </div>
        `;
    }

    return await sendEmail(to, subject, message, htmlContent);
  } catch (error) {
    console.error("❌ Quick email error:", error.message);
    return false;
  }
};

export default nodemailer;
