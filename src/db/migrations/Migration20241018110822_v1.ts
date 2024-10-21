import { Migration } from "@mikro-orm/migrations";

export class Migration20241018110822_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "classroom" drop column "days";');

    this.addSql('alter table "classroom" add column "days_of_the_week" text[] not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "classroom" drop column "days_of_the_week";');

    this.addSql('alter table "classroom" add column "days" varchar(255) not null;');
  }
}
