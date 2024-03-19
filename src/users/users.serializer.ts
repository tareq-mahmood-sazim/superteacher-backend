import { Injectable } from "@nestjs/common";

import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";
import { AbstractBaseSerializer } from "@/common/serializers";
import { TSerializationOptions } from "@/common/serializers/abstract-base-serializer.types";

@Injectable()
export class UsersSerializer extends AbstractBaseSerializer<User> {
  protected serializeOneOptions: TSerializationOptions = {
    skipNull: true,
    forceObject: true,
    exclude: ["password"],
    populate: ["userProfile.role"],
  };

  protected serializeManyOptions: TSerializationOptions = {
    skipNull: true,
    forceObject: true,
    exclude: ["password"],
    populate: ["userProfile.role"],
  };
}

@Injectable()
export class UserProfilesSerializer extends AbstractBaseSerializer<UserProfile> {
  protected serializeOneOptions: TSerializationOptions = {
    skipNull: true,
    forceObject: true,
    exclude: ["user.password"],
    populate: ["role"],
  };

  protected serializeManyOptions: TSerializationOptions = {
    skipNull: true,
    forceObject: true,
    exclude: ["user.password"],
    populate: ["role"],
  };
}
