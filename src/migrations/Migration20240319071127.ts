import { Migration } from '@mikro-orm/migrations';

export class Migration20240319071127 extends Migration {

  async up(): Promise<void> {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter651` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, `name` text NOT NULL, `age` text NOT NULL, `location` text NOT NULL);');
    this.addSql('INSERT INTO "_knex_temp_alter651" SELECT * FROM "user";;');
    this.addSql('DROP TABLE "user";');
    this.addSql('ALTER TABLE "_knex_temp_alter651" RENAME TO "user";');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
