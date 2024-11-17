import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Classroom } from "@/common/entities/classroom.entity";

import { MailerAppController } from "./mailer-app.controller";
import { MailerAppService } from "./mailer-app.service";

@Module({
  imports: [MikroOrmModule.forFeature([Classroom])],
  controllers: [MailerAppController],
  providers: [MailerAppService],
})
export class MailerAppModule {}
