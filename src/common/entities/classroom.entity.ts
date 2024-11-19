import {
  Entity,
  Property,
  OneToMany,
  ManyToMany,
  Collection,
  ManyToOne,
  Rel,
} from "@mikro-orm/core";

import { Details } from "./details.entity";
import { Materials } from "./materials.entity";
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

  @Property({ nullable: true })
  meetLink!: string;

  @Property()
  daysOfTheWeek!: string[];

  @ManyToOne(() => UserProfile, { nullable: false })
  teacher!: Rel<UserProfile>;

  @ManyToMany(() => UserProfile, (userProfile) => userProfile.classrooms, { owner: true })
  participants = new Collection<UserProfile>(this);

  @OneToMany(() => Message, (message) => message.classroom)
  messages = new Collection<Message>(this);

  @OneToMany(() => Materials, (materials) => materials.classroom)
  materials = new Collection<Materials>(this);
}
