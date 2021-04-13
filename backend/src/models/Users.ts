import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("entity_users")
export class Users {

  @PrimaryGeneratedColumn({type:"int"})
  id_user: number;

  @Column({ type: "varchar", length: 200 })
  name: String;

  @Column({ type: "varchar", length: 100 })
  login: String;

  @Column({ type: "varchar", length: 100 })
  password: String;

  @Column({ type: "varchar", length: 150 })
  email: String;

  @Column({ type: "varchar", length: 18 })
  phone: String;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}