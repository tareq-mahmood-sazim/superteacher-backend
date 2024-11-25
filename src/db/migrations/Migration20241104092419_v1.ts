import { Migration } from "@mikro-orm/migrations";

export class Migration20241104092419_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "classroom" add column "meet_link" varchar(255);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "classroom" drop column "meet_link";');
  }
}
