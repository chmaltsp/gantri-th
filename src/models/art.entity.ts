import {
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryKey,
	Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./baseEntity.entity";
import { Comment } from "./comments.entity";

@Entity()
export class Art extends BaseEntity {
	@Property()
	title!: string;

	@Property()
	artist!: string;

	@Property()
	year!: string;

	@OneToMany("Comment", "art")
	comments?: Comment;
}
