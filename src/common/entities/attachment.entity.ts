import { Entity, PrimaryKey, Property, ManyToOne, Index } from "@mikro-orm/core";

import { v4 } from "uuid";

import { Classroom } from "./classroom.entity";
import { Teacher } from "./teacher.entity";
@Entity({
  tableName: "attachment"
})
@Index({ properties: ["classroom"] })
@Index({ properties: ["teacher"] })
export class Attachment {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

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
