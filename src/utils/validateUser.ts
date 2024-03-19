import { DI } from "../db";

export async function validateUser(db: DI, id: number) {
	return await db.em.findOneOrFail("User", { id: id });
}
