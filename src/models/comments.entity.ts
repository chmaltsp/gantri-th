import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "./baseEntity.entity";
import { User } from "./user.entity";

@Entity()
export class Comment extends BaseEntity {
	@Property()
	content!: string;

	@Property({ type: "date" })
	createdAt = new Date();

	@ManyToOne()
	user!: User;
}
