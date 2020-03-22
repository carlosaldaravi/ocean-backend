import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
  
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;
  
  @Column()
  phone: string;
  
  @Column({ nullable: true })
  disponibilidad: string;
  
  @Column()
  dateBorn: Date;
  
  @Column({ nullable: true })
  city: string;

//   @OneToMany(type => Task, task => task.user, { eager: true })
//   tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
