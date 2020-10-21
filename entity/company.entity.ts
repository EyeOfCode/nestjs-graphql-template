import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import {
  Entity,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType({ implements: [BaseEntity] })
export class Company extends BaseEntity {
  @Field({ nullable: false })
  @Column()
  name: string;

  @Field(() => [User])
  @OneToMany(
    () => User,
    user => user.company,
  )
  @JoinColumn()
  user: User[];
}
