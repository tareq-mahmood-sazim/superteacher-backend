import { Migration } from "@mikro-orm/migrations";

export class Migration20241008092810_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "otp" add column "wrong_attempts" int not null;');
    this.addSql(
      'alter table "otp" add constraint "otp_wrong_attempts_unique" unique ("wrong_attempts");',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "otp" drop constraint "otp_wrong_attempts_unique";');
    this.addSql('alter table "otp" drop column "wrong_attempts";');
  }
}
