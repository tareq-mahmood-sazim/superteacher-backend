import {
  Entity,
  OneToOne,
  OneToMany,
  ManyToMany,
  Enum,
  PrimaryKey,
  Property,
  Collection,
  Rel,
  ManyToOne,
  EntityRepositoryType,
} from "@mikro-orm/core";

import { Gender, Degree, EducationLevel, Medium } from "@/common/enums/main.enum";
import { UserProfilesRepository } from "@/user-profiles/user-profiles.repository";

import { AssignmentSubmission } from "./assignment-submission.entity";
import { Assignment } from "./assignment.entity";
import { Classroom } from "./classroom.entity";
import { CustomBaseEntity } from "./custom-base.entity";
import { Message } from "./message.entity";
import { Role } from "./roles.entity";
import { User } from "./users.entity";

@Entity({
  tableName: "user_profiles",
  repository: () => UserProfilesRepository,
})
export class UserProfile extends CustomBaseEntity {
  [EntityRepositoryType]?: UserProfilesRepository;

  constructor(firstName: string, lastName: string, role: Role) {
    super();

    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }

  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ fieldName: "first_name" })
  firstName!: string;

  @Property({ fieldName: "last_name" })
  lastName!: string;

  @Enum(() => Gender)
  gender!: Gender;

  @ManyToOne(() => Role)
  role!: Rel<Role>;

  @Enum({ nullable: true })
  highestEducationLevel?: Degree;

  @Property({ nullable: true })
  majorSubject?: string;

  @Property({ type: "json", nullable: true })
  subjectsToTeach?: string[];

  @Enum({ nullable: true })
  educationLevel?: EducationLevel;

  @Enum({ nullable: true })
  medium?: Medium;

  @Property({ nullable: true })
  classLevel?: string;

  @Enum({ items: ["BACHELORS", "MASTERS", "PHD", "null"], nullable: true })
  degree?: Degree;

  @Property({ nullable: true })
  major?: string;

  @Property({ nullable: true })
  semesterOrYear?: string;

  @ManyToMany(() => Classroom, (classroom) => classroom.participants)
  classrooms = new Collection<Classroom>(this);

  @OneToOne(() => User, { inversedBy: (user) => user.userProfile })
  user!: Rel<User>;

  @OneToMany(() => Message, (message) => message.sender)
  messages = new Collection<Message>(this);

  @OneToMany(() => AssignmentSubmission, (submission) => submission.userProfile)
  submissions = new Collection<AssignmentSubmission>(this);

  @OneToMany(() => Assignment, (assignment) => assignment.userProfile)
  assignments = new Collection<Assignment>(this);
}
