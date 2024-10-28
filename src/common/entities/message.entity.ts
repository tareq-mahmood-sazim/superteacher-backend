import { Entity, Property, ManyToOne, Enum, Index } from "@mikro-orm/core";

import { UserType } from "@/common/enums/main.enum";

import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { UserProfile } from "./user-profiles.entity";

@Entity({
  tableName: "message",
})
@Index({ properties: ["classroom"] })
@Index({ properties: ["sender"] })
export class Message extends Details {
  @Property()
  content!: string;

  @Enum(() => UserType)
  senderType!: UserType;

  @ManyToOne(() => Classroom)
  classroom!: Classroom;

  @ManyToOne(() => UserProfile, { nullable: true })
  sender?: UserProfile;
}
