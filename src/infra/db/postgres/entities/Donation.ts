import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Account from './Account'

@Entity('donations')
export default class Donation {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'text' })
    name: string

  @Column({ type: 'text', nullable: true })
    message: string

  @Column({ type: 'text' })
    slug: string

  @Column({ type: 'int' })
    price: number

  @Column({ type: 'text', default: 'pending' })
    status: string

  @ManyToOne(() => Account, account => account.donations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'creatorId' })
    creatorId: string
}
