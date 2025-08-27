import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Donation from './Donation'

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'text' })
    name: string

  @Column({ type: 'text' })
    email: string

  @Column({ type: 'text' })
    password: string

  @Column({ type: 'text' })
    role: string

  @Column({ type: 'text', nullable: true })
    accessToken: string

  @Column({ type: 'text' })
    slug: string

  @Column({ type: 'text', nullable: true })
    connectedStripeAccountId: string

  @OneToMany(() => Donation, donation => donation.creatorId)
    donations: Donation[]
}
