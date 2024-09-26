import { Migration } from "@mikro-orm/migrations";

export class Migration20240924163552_v103 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "otp" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "otp" varchar(6) not null, "email" varchar(255) not null, constraint "otp_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "classroom" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;',
    );

    this.addSql(
      'alter table "student" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;',
    );

    this.addSql(
      'alter table "teacher" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;',
    );

    this.addSql('alter table "message" add column "updated_at" timestamptz not null;');

    this.addSql('alter table "attachment" add column "updated_at" timestamptz not null;');

    this.addSql(
      'alter table "assignment" add column "created_at" timestamptz not null, add column "updated_at" timestamptz not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "otp" cascade;');

    this.addSql('alter table "classroom" drop column "created_at", drop column "updated_at";');

    this.addSql('alter table "student" drop column "created_at", drop column "updated_at";');

    this.addSql('alter table "teacher" drop column "created_at", drop column "updated_at";');

    this.addSql('alter table "message" drop column "updated_at";');

    this.addSql('alter table "attachment" drop column "updated_at";');

    this.addSql('alter table "assignment" drop column "created_at", drop column "updated_at";');
  }
}
