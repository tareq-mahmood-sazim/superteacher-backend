import { Entity, Property } from "@mikro-orm/core";

import { Details } from "./details.entity";

@Entity({
  tableName: "otp",
})
export class Otp extends Details {
  @Property({ type: "string", length: 8 })
  otp!: string;

  @Property({ type: "string", unique: true })
  email!: string;
}
