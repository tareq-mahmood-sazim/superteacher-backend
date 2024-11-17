import { Module } from "@nestjs/common";

import { MailerAppService } from "@/mailer-app/mailer-app.service";

import { SubmissionsController } from "./submissions.controller";
import { SubmissionsRepository } from "./submissions.repository";
import { SubmissionsService } from "./submissions.service";

@Module({
  controllers: [SubmissionsController],
  providers: [SubmissionsService, SubmissionsRepository, MailerAppService],
})
export class SubmissionsModule {}
