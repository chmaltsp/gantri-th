import { MikroORM, EntityManager, EntityRepository } from "@mikro-orm/sqlite";
import { Art } from "./models/art.entity.js";
import { Comment } from "./models/comments.entity.js";
import { User } from "./models/user.entity.js";

export interface DI {
	orm: MikroORM;
	em: EntityManager;
	User: EntityRepository<User>;
	Comment: EntityRepository<Comment>;
	Art: EntityRepository<Art>;
}

// Cache the DI container
let cache: DI | null = null;

export default async function initDb() {
	if (cache) {
		return cache;
	}
	const orm = await MikroORM.init();

	return (cache = {
		orm: orm,
		em: orm.em,
		User: orm.em.getRepository(User),
		Comment: orm.em.getRepository(Comment),
		Art: orm.em.getRepository(Art),
	});
}
