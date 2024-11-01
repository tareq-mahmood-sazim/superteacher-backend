import { Injectable } from "@nestjs/common";

import sendGrid from "@sendgrid/mail";

import { SendMailerAppDto } from "./dto/send-mailer-app.dto";

@Injectable()
export class MailerAppService {
  constructor() {}

  async SendMail(createMailerAppDto: SendMailerAppDto) {
    const { email, subject, message } = createMailerAppDto;
    sendGrid.setApiKey((process.env.SENDGRID_API_KEY as string) ?? "");
    const msg = {
      to: email,
      from: (process.env.SENDGRID_VERIFIED_SENDER as string) ?? "",
      subject,
      html: `<p>${message}</p>`,
    };
    try {
      if ((process.env.NODE_ENV as string) === "PRODUCTION") {
        await sendGrid.send(msg);
      }
      return {
        message: `Email sent to ${email}`,
        status: (process.env.NODE_ENV as string) === "PRODUCTION" ? 200 : 503,
      };
    } catch (error: unknown) {
      const errorMessage = error as { status: number; message: string };
      return { error: `Failed to send email: ${errorMessage.message}` };
    }
  }
}
