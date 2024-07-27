import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: 'varchar', nullable: true })
  service: string;

  @Column({ type: 'varchar', nullable: true })
  serviceURL: string;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({ nullable: true })
  reachedEnergyPerTap: number;

  @Column({ nullable: true })
  maxEnergy: number;

  @Column({ type: 'timestamp', nullable: true })
  nextTapTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
