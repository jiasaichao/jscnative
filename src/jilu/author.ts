import { createConnection, getRepository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm/browser';
@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  birthdate: string;
}
