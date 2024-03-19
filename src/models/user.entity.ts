import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "./baseEntity.entity";
import { Comment } from "./comments.entity";

@Entity()
export class User extends BaseEntity {
	@Property({
		unique: true,
	})
	name!: string;

	@Property({
		type: "int",
	})
	age!: number;

	@Property()
	location!: string;

	@OneToMany(() => Comment, (comment) => comment.user)
	comments!: Comment;
}
