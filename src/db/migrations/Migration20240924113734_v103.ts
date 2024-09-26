import { Migration } from "@mikro-orm/migrations";

export class Migration20240924113734_v103 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "student" drop constraint if exists "student_degree_check";');

    this.addSql('alter table "student" alter column "degree" type text using ("degree"::text);');
    this.addSql('alter table "student" alter column "degree" set not null;');
    this.addSql(
      "alter table \"student\" add constraint \"student_degree_check\" check(\"degree\" in ('BACHELORS', 'MASTERS', 'null'));",
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "student" drop constraint if exists "student_degree_check";');

    this.addSql(
      'alter table "student" alter column "degree" type smallint using ("degree"::smallint);',
    );
    this.addSql('alter table "student" alter column "degree" drop not null;');
  }
}
