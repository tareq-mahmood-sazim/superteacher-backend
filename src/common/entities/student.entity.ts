import { Entity, Property, OneToMany, ManyToMany, Collection, Enum } from "@mikro-orm/core";

import { AssignmentSubmission } from "./assignment-submission.entity";
import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { Gender, EducationLevel, Medium, Degree } from "./main.enum";
import { Message } from "./message.entity";

@Entity({
  tableName: "student",
})
export class Student extends Details {
  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Enum(() => Gender)
  gender!: Gender;

  @Property({ unique: true })
  email!: string;

  @Property()
  phoneNumber!: string;

  @Property()
  address!: string;

  @Enum(() => EducationLevel)
  educationLevel!: EducationLevel;

  @Property()
  password!: string;

  @Enum(() => Medium)
  medium?: Medium;

  @Property({ nullable: true })
  classLevel?: string;

  @Enum({ items: ["BACHELORS", "MASTERS", "null"] })
  degree?: Degree;

  @Property({ nullable: true })
  major?: string;

  @Property({ nullable: true })
  semesterOrYear?: string;

  @ManyToMany(() => Classroom, (classroom) => classroom.students)
  classrooms = new Collection<Classroom>(this);

  @OneToMany(() => Message, (message) => message.student)
  messages = new Collection<Message>(this);

  @OneToMany(() => AssignmentSubmission, (submission) => submission.student)
  submissions = new Collection<AssignmentSubmission>(this);
}
