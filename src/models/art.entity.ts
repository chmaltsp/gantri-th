import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity.entity';

@Entity()
export class Art extends BaseEntity {
   
    @Property()
    title!: string;

    @Property()
    artist!: string;

    @Property()
    year!: string;


}