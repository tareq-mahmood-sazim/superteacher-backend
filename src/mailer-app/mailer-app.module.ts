import { Module } from "@nestjs/common";

import { MailerAppController } from "./mailer-app.controller";
import { MailerAppService } from "./mailer-app.service";

@Module({
  controllers: [MailerAppController],
  providers: [MailerAppService],
})
export class MailerAppModule {}
