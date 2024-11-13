import { Entity, Property, ManyToOne, OneToMany, Collection, Index } from "@mikro-orm/core";

import { MaterialsEnum } from "../enums/materials.enum";
import { AssignmentSubmission } from "./assignment-submission.entity";
import { Classroom } from "./classroom.entity";
import { Details } from "./details.entity";
import { UserProfile } from "./user-profiles.entity";

@Entity({
  tableName: "material",
})
@Index({ properties: ["classroom"] })
export class Materials extends Details {
  @Property()
  title!: string;

  @Property()
  instructions!: string;

  @Property()
  dueDate!: Date;

  @Property()
  category!: MaterialsEnum;

  @Property()
  attachments!: string[];

  @ManyToOne(() => Classroom)
  classroom!: Classroom;

  @OneToMany(() => AssignmentSubmission, (submission) => submission.materials, {
    mappedBy: "materials",
  })
  submissions = new Collection<AssignmentSubmission>(this);

  @ManyToOne(() => UserProfile, { nullable: true })
  userProfile?: UserProfile;
}
