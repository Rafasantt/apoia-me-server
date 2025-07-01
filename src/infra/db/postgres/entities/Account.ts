import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
