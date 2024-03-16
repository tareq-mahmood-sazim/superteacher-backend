import { Injectable } from "@nestjs/common";

import { serialize } from "@mikro-orm/core";

import { UserProfile } from "@/common/entities/user-profiles.entity";
import { User } from "@/common/entities/users.entity";

import { TUserSerializationOptions } from "./users.types";

@Injectable()
export class UsersSerializer {
  defaultSerializationOptions: TUserSerializationOptions = {
    includePassword: false,
    includeRole: true,
  };

  private patchSerializationOptions(serializationOptions: TUserSerializationOptions = {}) {
    return {
      ...this.defaultSerializationOptions,
      ...serializationOptions,
    };
  }

  serializeUser(user: User, serializationOptions: TUserSerializationOptions) {
    const options = this.patchSerializationOptions(serializationOptions);

    return serialize(user, {
      forceObject: true,
      ...(options.includeRole ? { populate: ["userProfile", "userProfile.role"] } : {}),
      ...(options.includePassword ? {} : { exclude: ["password"] }),
    });
  }

  serializeUserProfile(userProfile: UserProfile, serializationOptions: TUserSerializationOptions) {
    const options = this.patchSerializationOptions(serializationOptions);

    return serialize(userProfile, {
      forceObject: true,
      ...(options.includeRole ? { populate: ["role"] } : {}),
      ...(options.includePassword ? {} : { exclude: ["user.password"] }),
    });
  }
}
