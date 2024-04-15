import nodemailer from "nodemailer";
import ErrorHandler from "../middlewares/error";
export const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  try {
    const tansporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    } as nodemailer.TransportOptions);
    const info = await tansporter.sendMail({
      from: `hkNotes`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    throw new ErrorHandler("Error sending email", 500);
  }
};
