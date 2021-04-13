import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Owners } from "./Owners";

@Entity("entity_users")
export class Users {

  @PrimaryGeneratedColumn({type:"int"})
  id_user: number;

  @ManyToOne(() => Owners, owner => owner.id_owner)
  id_owner: Owners;

  @Column({ type: "varchar", length: 200 })
  name: String;

  @Column({ type: "varchar", length: 100 })
  login: String;

  @Column({ type: "varchar", length: 100 })
  password: String;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}