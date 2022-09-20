import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 2525,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export class NodeMailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: MailAdapterData) {
    await transport.sendMail({
      from: "Kevin Siman <bat@gmail.com>",
      to: "Siman Kevin <tab@gmail.com>",
      subject,
      html: body,
    });
  }
}
