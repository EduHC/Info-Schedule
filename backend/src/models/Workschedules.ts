import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Owners } from "./Owners";

@Entity("entity_workschedules")
export class Workschedules {

  @PrimaryGeneratedColumn({type:"int"})
  id_workschedule: number;

  @ManyToOne(() => Owners, owner => owner.id_owner)
  @JoinColumn({ name: "id_owner" })
  id_owner: Owners;

  @Column({ type: "date" })
  date: String;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}