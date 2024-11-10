import {
  Entity,
  Property,
  OneToMany,
  ManyToMany,
  Collection,
  ManyToOne,
  Rel,
} from "@mikro-orm/core";

import { Assignment } from "./assignment.entity";
import { Attachment } from "./attachment.entity";
import { Details } from "./details.entity";
import { Message } from "./message.entity";
import { UserProfile } from "./user-profiles.entity";

@Entity({
  tableName: "classroom",
})
export class Classroom extends Details {
  @Property()
  title!: string;

  @Property()
  subject!: string;

  @Property()
  classTime!: Date;

  @Property()
  daysOfTheWeek!: string[];

  @ManyToOne(() => UserProfile, { nullable: false })
  teacher!: Rel<UserProfile>;

  @ManyToMany(() => UserProfile, (userProfile) => userProfile.classrooms, { owner: true })
  participants = new Collection<UserProfile>(this);

  @OneToMany(() => Message, (message) => message.classroom)
  messages = new Collection<Message>(this);

  @OneToMany(() => Attachment, (attachment) => attachment.classroom)
  resources = new Collection<Attachment>(this);

  @OneToMany(() => Assignment, (assignment) => assignment.classroom)
  assignments = new Collection<Assignment>(this);
}
