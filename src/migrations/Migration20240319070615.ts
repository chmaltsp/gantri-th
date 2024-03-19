import { Migration } from '@mikro-orm/migrations';

export class Migration20240319070615 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `art` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `title` text not null, `artist` text not null, `year` text not null);');

    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null, `age` text not null, `location` text not null);');

    this.addSql('create table `comment` (`id` integer not null primary key autoincrement, `updated_at` datetime not null, `content` text not null, `created_at` date not null, `user_id` integer not null, constraint `comment_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade);');
    this.addSql('create index `comment_user_id_index` on `comment` (`user_id`);');
  }

}
