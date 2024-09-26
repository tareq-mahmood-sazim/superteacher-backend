import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Otp } from "@/common/entities/otp.entity";

import { UniquecodeController } from "./uniquecode.controller";
import { UniquecodeRepository } from "./uniquecode.repository";
import { UniquecodeService } from "./uniquecode.service";

@Module({
  imports: [MikroOrmModule.forFeature([Otp])],
  controllers: [UniquecodeController],
  providers: [UniquecodeService, UniquecodeRepository],
  exports: [UniquecodeService],
})
export class UniquecodeModule {}
