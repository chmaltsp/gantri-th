import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		em.create("User", {
			name: "John Doe",
			age: 30,
			location: "London",
			comments: [
				{
					content: "This is a comment",
					createdAt: new Date(),
					name: "John Doe",
					art: 3,
				},
				{
					content: "This is a comment 2",
					createdAt: new Date(),
					name: "John Doe",
					art: 3,
				},
				{
					content: "This is a comment 2",
					createdAt: new Date(),
					name: "John Doe",
					art: 3,
				},
			],
		});
	}
}
