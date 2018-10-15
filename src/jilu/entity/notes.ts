import { createConnection, getRepository, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, BaseEntity } from 'typeorm/browser';
@Entity()
export class Notes {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  content: string;
  @Column()
  sort: number;
  @Column({ default: new Date().getTime() })
  createDate: number;
}
