import { Injectable } from "@nestjs/common";

import { EntityManager } from "@mikro-orm/core";

import { Otp } from "@/common/entities/otp.entity";

@Injectable()
export class UniquecodeRepository {
  constructor(private readonly em: EntityManager) {}

  getUniquecode(email: string) {
    return this.em.findOne(Otp, { email });
  }
  deleteUniquecode(email: string) {
    return this.em.nativeDelete(Otp, { email });
  }
}
