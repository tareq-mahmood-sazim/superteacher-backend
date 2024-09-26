import { Migration } from "@mikro-orm/migrations";

export class Migration20240926102429_v103 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "teacher" drop constraint if exists "teacher_highest_education_level_check";',
    );

    this.addSql('alter table "otp" add constraint "otp_email_unique" unique ("email");');

    this.addSql('alter table "teacher" drop constraint "teacher_unique_code_unique";');
    this.addSql('alter table "teacher" drop column "unique_code", drop column "subject_to_teach";');

    this.addSql(
      'alter table "teacher" add column "subjects_to_teach" jsonb not null, add column "gender" text check ("gender" in (\'MALE\', \'FEMALE\', \'OTHERS\')) not null;',
    );
    this.addSql(
      'alter table "teacher" add constraint "teacher_highest_education_level_check" check("highest_education_level" in (\'BACHELORS\', \'MASTERS\'));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "teacher" drop constraint if exists "teacher_highest_education_level_check";',
    );

    this.addSql('alter table "otp" drop constraint "otp_email_unique";');

    this.addSql('alter table "teacher" drop column "subjects_to_teach", drop column "gender";');

    this.addSql(
      'alter table "teacher" add column "unique_code" varchar(255) not null, add column "subject_to_teach" varchar(255) not null;',
    );
    this.addSql(
      "alter table \"teacher\" add constraint \"teacher_highest_education_level_check\" check(\"highest_education_level\" in ('SCHOOL', 'COLLEGE', 'UNIVERSITY'));",
    );
    this.addSql(
      'alter table "teacher" add constraint "teacher_unique_code_unique" unique ("unique_code");',
    );
  }
}
