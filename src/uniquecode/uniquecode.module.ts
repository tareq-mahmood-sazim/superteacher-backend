import { Module } from "@nestjs/common";

import { MikroOrmModule } from "@mikro-orm/nestjs";

import { Otp } from "@/common/entities/otp.entity";

import { UniquecodeRepository } from "./uniquecode.repository";
import { UniquecodeService } from "./uniquecode.service";

@Module({
  imports: [MikroOrmModule.forFeature([Otp])],
  providers: [UniquecodeService, UniquecodeRepository],
  exports: [UniquecodeService],
})
export class UniquecodeModule {}
