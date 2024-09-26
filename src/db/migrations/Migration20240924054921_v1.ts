import { Migration } from "@mikro-orm/migrations";

export class Migration20240924054921_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "classroom" ("id" uuid not null, "title" varchar(255) not null, "subject" varchar(255) not null, "class_time" timestamptz not null, "days" varchar(255) not null, constraint "classroom_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "student" ("id" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "gender" text check ("gender" in (\'MALE\', \'FEMALE\', \'OTHERS\')) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "address" varchar(255) not null, "education_level" text check ("education_level" in (\'SCHOOL\', \'COLLEGE\', \'UNIVERSITY\')) not null, "password" varchar(255) not null, "medium" text check ("medium" in (\'ENGLISH\', \'BANGLA\')) not null, "class_level" varchar(255) null, "degree" text check ("degree" in (\'BACHELORS\', \'MASTERS\')) not null, "major" varchar(255) null, "semester_or_year" varchar(255) null, constraint "student_pkey" primary key ("id"));',
    );
    this.addSql('alter table "student" add constraint "student_email_unique" unique ("email");');

    this.addSql(
      'create table "classroomStudent" ("id" serial primary key, "classroom_id" uuid not null, "student_id" uuid not null);',
    );
    this.addSql(
      'alter table "classroomStudent" add constraint "classroomStudent_classroom_id_student_id_unique" unique ("classroom_id", "student_id");',
    );

    this.addSql(
      'create table "classroom_students" ("classroom_id" uuid not null, "student_id" uuid not null, constraint "classroom_students_pkey" primary key ("classroom_id", "student_id"));',
    );

    this.addSql(
      'create table "teacher" ("id" uuid not null, "unique_code" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "highest_education_level" text check ("highest_education_level" in (\'SCHOOL\', \'COLLEGE\', \'UNIVERSITY\')) not null, "major_subject" varchar(255) not null, "subject_to_teach" varchar(255) not null, constraint "teacher_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "teacher" add constraint "teacher_unique_code_unique" unique ("unique_code");',
    );
    this.addSql('alter table "teacher" add constraint "teacher_email_unique" unique ("email");');

    this.addSql(
      'create table "message" ("id" uuid not null, "content" varchar(255) not null, "sender_id" varchar(255) not null, "sender_type" text check ("sender_type" in (\'STUDENT\', \'TEACHER\')) not null, "classroom_id" uuid not null, "created_at" timestamptz not null, "student_id" uuid null, "teacher_id" uuid null, constraint "message_pkey" primary key ("id"));',
    );
    this.addSql('create index "message_sender_id_index" on "message" ("sender_id");');
    this.addSql('create index "message_classroom_id_index" on "message" ("classroom_id");');

    this.addSql(
      'create table "classroomTeacher" ("id" serial primary key, "classroom_id" uuid not null, "teacher_id" uuid not null);',
    );
    this.addSql(
      'alter table "classroomTeacher" add constraint "classroomTeacher_classroom_id_teacher_id_unique" unique ("classroom_id", "teacher_id");',
    );

    this.addSql(
      'create table "classroom_teachers" ("classroom_id" uuid not null, "teacher_id" uuid not null, constraint "classroom_teachers_pkey" primary key ("classroom_id", "teacher_id"));',
    );

    this.addSql(
      'create table "attachment" ("id" uuid not null, "url" varchar(255) not null, "filename" varchar(255) not null, "classroom_id" uuid null, "teacher_id" uuid null, "created_at" timestamptz not null, constraint "attachment_pkey" primary key ("id"));',
    );
    this.addSql('create index "attachment_teacher_id_index" on "attachment" ("teacher_id");');
    this.addSql('create index "attachment_classroom_id_index" on "attachment" ("classroom_id");');

    this.addSql(
      'create table "assignment" ("id" uuid not null, "title" varchar(255) not null, "description" varchar(255) not null, "due_date" timestamptz not null, "classroom_id" uuid not null, "teacher_id" uuid null, constraint "assignment_pkey" primary key ("id"));',
    );
    this.addSql('create index "assignment_classroom_id_index" on "assignment" ("classroom_id");');

    this.addSql(
      'create table "assignmentSubmission" ("id" uuid not null, "student_id" uuid not null, "assignment_id" uuid not null, "submitted_at" timestamptz not null, "is_late" boolean not null default false, constraint "assignmentSubmission_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "classroomStudent" add constraint "classroomStudent_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update set null on delete cascade;',
    );
    this.addSql(
      'alter table "classroomStudent" add constraint "classroomStudent_student_id_foreign" foreign key ("student_id") references "student" ("id") on update set null on delete cascade;',
    );

    this.addSql(
      'alter table "classroom_students" add constraint "classroom_students_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "classroom_students" add constraint "classroom_students_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "message" add constraint "message_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "message" add constraint "message_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "message" add constraint "message_teacher_id_foreign" foreign key ("teacher_id") references "teacher" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "classroomTeacher" add constraint "classroomTeacher_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update set null on delete cascade;',
    );
    this.addSql(
      'alter table "classroomTeacher" add constraint "classroomTeacher_teacher_id_foreign" foreign key ("teacher_id") references "teacher" ("id") on update set null on delete cascade;',
    );

    this.addSql(
      'alter table "classroom_teachers" add constraint "classroom_teachers_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "classroom_teachers" add constraint "classroom_teachers_teacher_id_foreign" foreign key ("teacher_id") references "teacher" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "attachment" add constraint "attachment_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "attachment" add constraint "attachment_teacher_id_foreign" foreign key ("teacher_id") references "teacher" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "assignment" add constraint "assignment_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "assignment" add constraint "assignment_teacher_id_foreign" foreign key ("teacher_id") references "teacher" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "assignmentSubmission" add constraint "assignmentSubmission_student_id_foreign" foreign key ("student_id") references "student" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "assignmentSubmission" add constraint "assignmentSubmission_assignment_id_foreign" foreign key ("assignment_id") references "assignment" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "classroomStudent" drop constraint "classroomStudent_classroom_id_foreign";',
    );

    this.addSql(
      'alter table "classroom_students" drop constraint "classroom_students_classroom_id_foreign";',
    );

    this.addSql('alter table "message" drop constraint "message_classroom_id_foreign";');

    this.addSql(
      'alter table "classroomTeacher" drop constraint "classroomTeacher_classroom_id_foreign";',
    );

    this.addSql(
      'alter table "classroom_teachers" drop constraint "classroom_teachers_classroom_id_foreign";',
    );

    this.addSql('alter table "attachment" drop constraint "attachment_classroom_id_foreign";');

    this.addSql('alter table "assignment" drop constraint "assignment_classroom_id_foreign";');

    this.addSql(
      'alter table "classroomStudent" drop constraint "classroomStudent_student_id_foreign";',
    );

    this.addSql(
      'alter table "classroom_students" drop constraint "classroom_students_student_id_foreign";',
    );

    this.addSql('alter table "message" drop constraint "message_student_id_foreign";');

    this.addSql(
      'alter table "assignmentSubmission" drop constraint "assignmentSubmission_student_id_foreign";',
    );

    this.addSql('alter table "message" drop constraint "message_teacher_id_foreign";');

    this.addSql(
      'alter table "classroomTeacher" drop constraint "classroomTeacher_teacher_id_foreign";',
    );

    this.addSql(
      'alter table "classroom_teachers" drop constraint "classroom_teachers_teacher_id_foreign";',
    );

    this.addSql('alter table "attachment" drop constraint "attachment_teacher_id_foreign";');

    this.addSql('alter table "assignment" drop constraint "assignment_teacher_id_foreign";');

    this.addSql(
      'alter table "assignmentSubmission" drop constraint "assignmentSubmission_assignment_id_foreign";',
    );

    this.addSql('drop table if exists "classroom" cascade;');

    this.addSql('drop table if exists "student" cascade;');

    this.addSql('drop table if exists "classroomStudent" cascade;');

    this.addSql('drop table if exists "classroom_students" cascade;');

    this.addSql('drop table if exists "teacher" cascade;');

    this.addSql('drop table if exists "message" cascade;');

    this.addSql('drop table if exists "classroomTeacher" cascade;');

    this.addSql('drop table if exists "classroom_teachers" cascade;');

    this.addSql('drop table if exists "attachment" cascade;');

    this.addSql('drop table if exists "assignment" cascade;');

    this.addSql('drop table if exists "assignmentSubmission" cascade;');
  }
}
