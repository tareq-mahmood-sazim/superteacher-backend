import { Module } from "@nestjs/common";

import { MaterialsController } from "./materials.controller";
import { MaterialsRepository } from "./materials.repository";
import { MaterialsService } from "./materials.service";

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, MaterialsRepository],
})
export class MaterialsModule {}
