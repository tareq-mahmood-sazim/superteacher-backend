import { Entity, PrimaryKey, Property, OneToMany, ManyToMany, Collection } from "@mikro-orm/core";

import { v4 } from "uuid";

import { Assignment } from "./assignment.entity";
import { Attachment } from "./attachment.entity";
import { Message } from "./message.entity";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";
@Entity({
  tableName: "classroom",
})
export class Classroom {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Property()
  title!: string;

  @Property()
  subject!: string;

  @Property()
  classTime!: Date;

  @Property()
  days!: string;

  // Owning side of the relationship
  @ManyToMany(() => Student, (student) => student.classrooms, { owner: true })
  students = new Collection<Student>(this);

  @ManyToMany(() => Teacher, (teacher) => teacher.classrooms, { owner: true })
  teachers = new Collection<Teacher>(this);

  @OneToMany(() => Message, (message) => message.classroom)
  messages = new Collection<Message>(this);

  @OneToMany(() => Attachment, (attachment) => attachment.classroom)
  resources = new Collection<Attachment>(this);

  @OneToMany(() => Assignment, (assignment) => assignment.classroom)
  assignments = new Collection<Assignment>(this);
}
