import { Migration } from "@mikro-orm/migrations";

export class Migration20240924191255_v103 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "otp" alter column "otp" type varchar(8) using ("otp"::varchar(8));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "otp" alter column "otp" type varchar(6) using ("otp"::varchar(6));');
  }
}
