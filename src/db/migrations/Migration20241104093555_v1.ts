import { Migration } from "@mikro-orm/migrations";

export class Migration20241104093555_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "classroom" alter column "meet_link" type varchar(255) using ("meet_link"::varchar(255));',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "classroom" alter column "meet_link" type int using ("meet_link"::int);',
    );
  }
}
