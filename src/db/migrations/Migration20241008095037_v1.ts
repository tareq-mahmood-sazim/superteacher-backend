import { Migration } from "@mikro-orm/migrations";

export class Migration20241008095037_v1 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "otp" drop constraint "otp_wrong_attempts_unique";');
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "otp" add constraint "otp_wrong_attempts_unique" unique ("wrong_attempts");',
    );
  }
}
