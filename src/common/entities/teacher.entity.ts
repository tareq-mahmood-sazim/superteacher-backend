import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  ManyToMany,
  Collection,
  Enum,
} from "@mikro-orm/core";

import { v4 } from "uuid";

import { Assignment } from "./assignment.entity";
import { Attachment } from "./attachment.entity";
import { Classroom } from "./classroom.entity";
import { EducationLevel } from "./main.enum";
import { Message } from "./message.entity";

@Entity({
  tableName: "teacher",
})
export class Teacher {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Property({ unique: true })
  uniqueCode!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property({ unique: true })
  email!: string;

  @Enum(() => EducationLevel)
  highestEducationLevel!: EducationLevel;

  @Property()
  majorSubject!: string;

  @Property()
  subjectToTeach!: string;

  @ManyToMany(() => Classroom, (classroom) => classroom.teachers)
  classrooms = new Collection<Classroom>(this);

  @OneToMany(() => Message, (message) => message.teacher)
  messages = new Collection<Message>(this);

  @OneToMany(() => Attachment, (attachment) => attachment.teacher)
  resources = new Collection<Attachment>(this);

  @OneToMany(() => Assignment, (assignment) => assignment.teacher)
  assignments = new Collection<Assignment>(this);
}
