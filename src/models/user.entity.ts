import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "./baseEntity.entity";

@Entity()
export class User extends BaseEntity {
	@Property()
	name!: string;

	@Property()
	age!: string;

	@Property()
	location!: string;
}
