import { Entity, Property, ManyToOne, Enum, Index } from "@mikro-orm/core";

import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { UserType } from "./main.enum";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

@Entity({
  tableName: "message",
})
@Index({ properties: ["classroom"] })
@Index({ properties: ["senderId"] })
export class Message extends Details {
  @Property()
  content!: string;

  @Property()
  senderId!: string;

  @Enum(() => UserType)
  senderType!: UserType;

  @ManyToOne(() => Classroom)
  classroom!: Classroom;

  @ManyToOne(() => Student, { nullable: true })
  student?: Student;

  @ManyToOne(() => Teacher, { nullable: true })
  teacher?: Teacher;
}
