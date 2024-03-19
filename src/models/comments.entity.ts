import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./baseEntity.entity.js";
import { User } from "./user.entity.js";
import { Art } from "./art.entity.js";

@Entity()
export class Comment extends BaseEntity {
	@Property()
	content!: string;

	@Property({ type: "date" })
	createdAt = new Date();

	@Property()
	name!: string;

	@ManyToOne(() => Art)
	art!: Art;

	@ManyToOne(() => User)
	user!: User;
}
