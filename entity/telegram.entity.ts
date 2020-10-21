import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';

@ObjectType()
@Entity()
export class Telegram {
  @Field()
  @Column({ nullable: true, unique: true })
  email: string;

  @Field()
  @Exclude()
  @Column()
  password: string;

  @Field()
  @Column()
  username: string;

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

  @Type()
  @CreateDateColumn({ nullable: false, name: 'created_at' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Type()
  @UpdateDateColumn({ nullable: false, name: 'updated_at' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
