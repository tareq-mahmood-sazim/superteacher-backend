import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  Index,
} from "@mikro-orm/core";

import { v4 } from "uuid";

import { AssignmentSubmission } from "./assignment-submission.entity";
import { Classroom } from "./classroom.entity";
import { Teacher } from "./teacher.entity";
@Entity({
  tableName: "assignment",
})
@Index({ properties: ["classroom"] })
export class Assignment {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

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
