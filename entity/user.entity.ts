import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from './company.entity';
import { BaseEntity } from './base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType({ implements: [BaseEntity] })
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column({ nullable: true, unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName?: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field(() => Company)
  @ManyToOne(
    () => Company,
    company => company.user,
  )
  @JoinColumn()
  company: Company;
}
