import { Module } from "@nestjs/common";

import { UserProfilesRepository } from "./user-profiles.repository";
import { UserProfilesSerializer } from "./user-profiles.serializer";
import { UserProfilesService } from "./user-profiles.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserProfilesService, UserProfilesRepository, UserProfilesSerializer],
  exports: [UserProfilesService, UserProfilesRepository, UserProfilesSerializer],
})
export class UserProfilesModule {}
