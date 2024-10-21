import { Migration } from "@mikro-orm/migrations";

export class Migration20241018120859_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "classroom" add column "teacher_id" int not null;');
    this.addSql(
      'alter table "classroom" add constraint "classroom_teacher_id_foreign" foreign key ("teacher_id") references "user_profiles" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "classroom" drop constraint "classroom_teacher_id_foreign";');

    this.addSql('alter table "classroom" drop column "teacher_id";');
  }
}
