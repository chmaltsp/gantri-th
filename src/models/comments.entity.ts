import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./baseEntity.entity";
import { User } from "./user.entity";
import { Art } from "./art.entity";

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
