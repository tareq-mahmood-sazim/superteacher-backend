import { Injectable } from "@nestjs/common";


import { EntityManager } from "@mikro-orm/postgresql";

import sendGrid from "@sendgrid/mail";

import { Classroom } from "@/common/entities/classroom.entity";
import { User } from "@/common/entities/users.entity";

import { SendMailerAppDto } from "./dto/send-mailer-app.dto";
import { TPayload, TUserProfile } from "./types/mailer-app.types";

@Injectable()
export class MailerAppService {
  constructor(private readonly em: EntityManager) {}

  async sendMail(createMailerAppDto: SendMailerAppDto) {
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
        status: (process.env.NODE_ENV as string) === "production" ? 200 : 503,
      };
    } catch (error: unknown) {
      const errorMessage = error as { status: number; message: string };
      return { error: `Failed to send email: ${errorMessage.message}` };
    }
  }
  async sendMailToParticipants(classroomId: number, payload: TPayload) {
    if (!classroomId) throw new Error("Classroom id is required");
    const classroom = await this.em.findOne(Classroom, classroomId, { populate: ["participants"] });
    if (!classroom) throw new Error("Classroom not found");
    const parsedParticipants = JSON.parse(JSON.stringify(classroom.participants));
    parsedParticipants.forEach(async (participant: TUserProfile) => {
      const user = await this.em.findOne(User, participant.user);
      const parsedUser = JSON.parse(JSON.stringify(user));
      await this.sendMail({
        email: parsedUser.email,
        subject: payload.subject,
        message: payload.message,
      });
    });
    return {
      statusCode: process.env.NODE_ENV === "production" ? 200 : 503,
      data: "Mails sent",
      message: "Emails sent successfully",
    };
  }
}
