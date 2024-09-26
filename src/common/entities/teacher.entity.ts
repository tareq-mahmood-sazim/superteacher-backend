import { Entity, Property, OneToMany, ManyToMany, Collection, Enum } from "@mikro-orm/core";

import { Assignment } from "./assignment.entity";
import { Attachment } from "./attachment.entity";
import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { Degree, Gender } from "./main.enum";
import { Message } from "./message.entity";

@Entity({
  tableName: "teacher",
})
export class Teacher extends Details {
  @Property({ type: "string" })
  firstName!: string;

  @Property({ type: "string" })
  lastName!: string;

  @Property({ type: "string", unique: true })
  email!: string;

  @Enum(() => Degree)
  highestEducationLevel!: Degree;

  @Property({ type: "string" })
  majorSubject!: string;

  @Property({ type: "json" })
  subjectsToTeach!: string[];

  @Enum(() => Gender)
  gender!: Gender;

  @ManyToMany(() => Classroom, (classroom) => classroom.teachers)
  classrooms = new Collection<Classroom>(this);

  @OneToMany(() => Message, (message) => message.teacher)
  messages = new Collection<Message>(this);

  @OneToMany(() => Attachment, (attachment) => attachment.teacher)
  resources = new Collection<Attachment>(this);

  @OneToMany(() => Assignment, (assignment) => assignment.teacher)
  assignments = new Collection<Assignment>(this);
}
