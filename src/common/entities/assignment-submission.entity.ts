import { Entity, Property, ManyToOne } from "@mikro-orm/core";

import { Details } from "./details.entity";
import { Materials } from "./materials.entity";
import { UserProfile } from "./user-profiles.entity";

@Entity({ tableName: "assignmentSubmission" })
export class AssignmentSubmission extends Details {
  @ManyToOne(() => UserProfile)
  userProfile!: UserProfile;

  @Property()
  attachment!: string[];

  @ManyToOne(() => Materials, { inversedBy: "submissions" })
  materials!: Materials;

  @Property()
  submittedAt: Date = new Date();

  @Property({ type: "boolean" })
  isLate: boolean = false;
}
