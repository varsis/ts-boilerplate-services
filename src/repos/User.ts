import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  sequentialId: number

  @Column({
    type: 'uuid',
    nullable: false,
  })
  @Generated('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age?: number
}
