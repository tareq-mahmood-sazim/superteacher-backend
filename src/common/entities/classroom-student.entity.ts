import { Entity, PrimaryKey, ManyToOne, Unique } from "@mikro-orm/core";

import { Classroom } from "./classroom.entity";
import { Student } from "./student.entity";
@Entity({
  tableName: "classroomStudent"
})
@Unique({ properties: ["classroom", "student"] })
export class ClassroomStudent {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ updateRule: "set null", deleteRule: "cascade" })
  classroom!: Classroom;

  @ManyToOne({ updateRule: "set null", deleteRule: "cascade" })
  student!: Student;
}
