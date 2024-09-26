import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";

import { v4 } from "uuid";

import { Assignment } from "./assignment.entity";
import { Student } from "./student.entity";

@Entity({
  tableName: "assignmentSubmission",
})
export class AssignmentSubmission {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @ManyToOne(() => Student)
  student!: Student;

  @ManyToOne(() => Assignment)
  assignment!: Assignment;

  @Property()
  submittedAt: Date = new Date();

  @Property({ type: "boolean" })
  isLate: boolean = false;
}
