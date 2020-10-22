import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Column,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from './base.entity';

@ObjectType()
@Entity()
export class Telegram extends BaseEntity {
  @Field()
  @Column()
  id_telegram: string

  @Field()
  @Column({ nullable: true, unique: true })
  email: string;

  @Field()
  @Exclude()
  @Column()
  password: string;

  @Field()
  @Column({nullable: true})
  username?: string;

  @Field()
  @Column()
  firs_name: string;

  @Field()
  @Column()
  auth_date: number

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  hash: string;

  constructor(partial: Partial<Telegram>) {
    super()
    Object.assign(this, partial);
  }
}
