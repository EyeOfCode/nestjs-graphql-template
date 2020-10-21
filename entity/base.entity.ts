import { Field, GraphQLISODateTime, ID, InterfaceType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Type } from 'class-transformer';

@InterfaceType()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Type()
  @CreateDateColumn({ nullable: false, name: 'created_at' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Type()
  @UpdateDateColumn({ nullable: false, name: 'updated_at' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
