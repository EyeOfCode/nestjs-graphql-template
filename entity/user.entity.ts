import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { Company } from './company.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Field()
  @Column({ nullable: true })
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({ nullable: false, name: 'created_at' })
  readonly createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({ nullable: false, name: 'updated_at' })
  readonly updatedAt: Date;

  @Field(() => Company)
  @ManyToOne(
    () => Company,
    company => company.user,
  )
  @JoinColumn()
  company: Company;
}

@ObjectType()
export class OneUser {
  @Field({ nullable: true })
  data?: User;
}
