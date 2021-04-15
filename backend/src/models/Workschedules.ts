import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Owners } from "./Owners";

@Entity("entity_workschedule")
export class Workschedule {

  @PrimaryGeneratedColumn({type:"int"})
  id_workschedule: number;

  @ManyToOne(() => Owners)
  @JoinColumn({ name: "id_owner" })
  id_owner: Owners;

  @Column({ type: "date" })
  date: String;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}