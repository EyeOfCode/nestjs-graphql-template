import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class Company {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: false })
  @Column()
  name: string;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ nullable: false, name: 'created_at' })
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ nullable: false, name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [User])
  @OneToMany(
    () => User,
    user => user.company,
  )
  @JoinColumn()
  user: User[];
}
