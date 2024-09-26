import { Entity, Property, ManyToOne, OneToMany, Collection, Index } from "@mikro-orm/core";

import { AssignmentSubmission } from "./assignment-submission.entity";
import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { Teacher } from "./teacher.entity";
@Entity({
  tableName: "assignment",
})
@Index({ properties: ["classroom"] })
export class Assignment extends Details {
  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property()
  dueDate!: Date;

  @ManyToOne(() => Classroom)
  classroom!: Classroom;

  @OneToMany(() => AssignmentSubmission, (submission) => submission.assignment)
  submissions = new Collection<AssignmentSubmission>(this);

  @ManyToOne(() => Teacher, { nullable: true })
  teacher?: Teacher;
}
