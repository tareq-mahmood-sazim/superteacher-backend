import { Entity, Property, ManyToOne, Index } from "@mikro-orm/core";

import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { UserProfile } from "./user-profiles.entity";

@Entity({
  tableName: "attachment",
})
@Index({ properties: ["classroom"] })
@Index({ properties: ["teacher"] })
export class Attachment extends Details {
  @Property()
  url!: string;

  @Property()
  filename!: string;

  @ManyToOne(() => Classroom, { nullable: true })
  classroom?: Classroom;

  @ManyToOne(() => UserProfile, { nullable: true })
  teacher?: UserProfile;

  @Property()
  createdAt: Date = new Date();
}
