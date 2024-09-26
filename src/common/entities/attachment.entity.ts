import { Entity, Property, ManyToOne, Index } from "@mikro-orm/core";

import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { Teacher } from "./teacher.entity";
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

  @ManyToOne(() => Teacher, { nullable: true })
  teacher?: Teacher;

  @Property()
  createdAt: Date = new Date();
}
