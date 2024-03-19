import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ArtSeeder } from "./ArtSeeder.js";
import { UserSeeder } from "./UserSeeder.js";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		return this.call(em, [ArtSeeder, UserSeeder]);
	}
}
