import { Injectable } from "@nestjs/common";

import sendGrid from "@sendgrid/mail";

import { SendMailerAppDto } from "./dto/send-mailer-app.dto";

@Injectable()
export class MailerAppService {
  constructor() {}

  async sendMail(createMailerAppDto: SendMailerAppDto) {
    const { email, subject, message } = createMailerAppDto;
    sendGrid.setApiKey(process.env.SENDGRID_API_KEY ?? "");
    const msg = {
      to: email,
      from: process.env.SENDGRID_VERIFIED_SENDER ?? "",
      subject,
      html: `<p>${message}</p>`,
    };
    try {
      if (process.env.NODE_ENV === "production") {
        await sendGrid.send(msg);
      }
      return {
        message: `Email sent to ${email}`,
        status: process.env.NODE_ENV === "production" ? 200 : 503,
      };
    } catch (error: unknown) {
      const errorMessage = error as { status: number; message: string };
      return { error: `Failed to send email: ${errorMessage.message}` };
    }
  }
}
