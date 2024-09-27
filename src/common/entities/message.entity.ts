import { Entity, PrimaryKey, Property, ManyToOne, Enum, Index } from "@mikro-orm/core";

import { v4 } from "uuid";

import { Classroom } from "./classroom.entity";
import { UserType } from "./main.enum";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

@Entity({
  tableName: "message",
})
@Index({ properties: ["classroom"] })
@Index({ properties: ["senderId"] })
export class Message {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Property()
  content!: string;

  @Property()
  senderId!: string;

  @Enum(() => UserType)
  senderType!: UserType;

  @ManyToOne(() => Classroom)
  classroom!: Classroom;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Student, { nullable: true })
  student?: Student;

  @ManyToOne(() => Teacher, { nullable: true })
  teacher?: Teacher;
}
