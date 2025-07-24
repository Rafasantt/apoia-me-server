import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('donations')
export default class Account {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'text' })
    name: string

  @Column({ type: 'text', nullable: true })
    message: string

  @Column({ type: 'text', nullable: true })
    creatorId: string

  @Column({ type: 'text' })
    slug: string

  @Column({ type: 'int' })
    price: number

  @Column({ type: 'text', default: 'pending' })
    status: string
}
