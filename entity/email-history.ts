import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
@ObjectType({ implements: [BaseEntity] })
export class EmailHistory extends BaseEntity {
    @Field()
    @Column()
    send_email: string;

    @Field()
    @Column()
    form: string;

    @Field()
    @Column()
    token: string

    @Field()
    @Column()
    type: string
}
