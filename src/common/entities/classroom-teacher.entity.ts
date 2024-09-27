import { Entity, PrimaryKey, ManyToOne, Unique } from "@mikro-orm/core";

import { Classroom } from "./classroom.entity";
import { Teacher } from "./teacher.entity";
@Entity({
  tableName: "classroomTeacher",
})
@Unique({ properties: ["classroom", "teacher"] })
export class ClassroomTeacher {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ updateRule: "set null", deleteRule: "cascade" })
  classroom!: Classroom;

  @ManyToOne({ updateRule: "set null", deleteRule: "cascade" })
  teacher!: Teacher;
}
