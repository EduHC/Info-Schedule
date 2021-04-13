import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./Users";

@Entity("entity_groups")
export class Groups {

  @PrimaryGeneratedColumn({type:"int"})
  id_group: number;

  @OneToOne(() => Users)
  @JoinColumn()
  id_user: Users;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;

  @Column({ type: "boolean" })
  valid_location: Boolean
}