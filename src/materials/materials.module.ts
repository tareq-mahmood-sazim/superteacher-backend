import { Module } from "@nestjs/common";

import { MailerAppService } from "@/mailer-app/mailer-app.service";

import { MaterialsController } from "./materials.controller";
import { MaterialsRepository } from "./materials.repository";
import { MaterialsService } from "./materials.service";

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository, MailerAppService],
})
export class MaterialsModule {}
