import { Migration } from "@mikro-orm/migrations";

export class Migration20241112130726_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "otp" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "otp" varchar(8) not null, "email" varchar(255) not null, "wrong_attempts" int not null);',
    );
    this.addSql('alter table "otp" add constraint "otp_email_unique" unique ("email");');

    this.addSql(
      'create table "permissions" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in (\'CREATE_USER\', \'READ_USER\', \'UPDATE_USER\', \'DELETE_USER\')) not null);',
    );

    this.addSql(
      'create table "roles" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" text check ("name" in (\'TEACHER\', \'STUDENT\')) not null);',
    );

    this.addSql(
      'create table "roles_permissions" ("role_id" int not null, "permission_id" int not null, constraint "roles_permissions_pkey" primary key ("role_id", "permission_id"));',
    );

    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(255) not null, "password" varchar(255) null);',
    );
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql(
      'create table "user_profiles" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "gender" text check ("gender" in (\'MALE\', \'FEMALE\', \'OTHERS\')) not null, "role_id" int not null, "highest_education_level" smallint null, "major_subject" varchar(255) null, "subjects_to_teach" jsonb null, "education_level" smallint null, "medium" smallint null, "class_level" varchar(255) null, "degree" text check ("degree" in (\'BACHELORS\', \'MASTERS\', \'PHD\', \'null\')) null, "major" varchar(255) null, "semester_or_year" varchar(255) null, "user_id" int not null);',
    );
    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_user_id_unique" unique ("user_id");',
    );

    this.addSql(
      'create table "classroom" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "subject" varchar(255) not null, "class_time" timestamptz not null, "meet_link" varchar(255) null, "days_of_the_week" text[] not null, "teacher_id" int not null);',
    );

    this.addSql(
      'create table "message" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "content" varchar(255) not null, "sender_type" text check ("sender_type" in (\'STUDENT\', \'TEACHER\')) not null, "classroom_id" int not null, "sender_id" int null);',
    );
    this.addSql('create index "message_sender_id_index" on "message" ("sender_id");');
    this.addSql('create index "message_classroom_id_index" on "message" ("classroom_id");');

    this.addSql(
      'create table "material" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "instructions" varchar(255) not null, "due_date" timestamptz not null, "category" varchar(255) not null, "attachments" text[] not null, "classroom_id" int not null, "user_profile_id" int null);',
    );
    this.addSql('create index "material_classroom_id_index" on "material" ("classroom_id");');

    this.addSql(
      'create table "classroom_participants" ("classroom_id" int not null, "user_profile_id" int not null, constraint "classroom_participants_pkey" primary key ("classroom_id", "user_profile_id"));',
    );

    this.addSql(
      'create table "assignmentSubmission" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_profile_id" int not null, "attachment" text[] not null, "materials_id" int not null, "submitted_at" timestamptz not null, "is_late" boolean not null default false);',
    );

    this.addSql(
      'alter table "roles_permissions" add constraint "roles_permissions_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "roles_permissions" add constraint "roles_permissions_permission_id_foreign" foreign key ("permission_id") references "permissions" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "user_profiles" add constraint "user_profiles_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "classroom" add constraint "classroom_teacher_id_foreign" foreign key ("teacher_id") references "user_profiles" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "message" add constraint "message_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "user_profiles" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "material" add constraint "material_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "material" add constraint "material_user_profile_id_foreign" foreign key ("user_profile_id") references "user_profiles" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "classroom_participants" add constraint "classroom_participants_classroom_id_foreign" foreign key ("classroom_id") references "classroom" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "classroom_participants" add constraint "classroom_participants_user_profile_id_foreign" foreign key ("user_profile_id") references "user_profiles" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "assignmentSubmission" add constraint "assignmentSubmission_user_profile_id_foreign" foreign key ("user_profile_id") references "user_profiles" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "assignmentSubmission" add constraint "assignmentSubmission_materials_id_foreign" foreign key ("materials_id") references "material" ("id") on update cascade;',
    );
  }
}
