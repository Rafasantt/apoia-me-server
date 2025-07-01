import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('errors')
export default class Account {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column({ type: 'text' })
    stack: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date
}
