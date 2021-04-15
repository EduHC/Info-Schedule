import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Owners } from "./Owners";

@Entity("entity_groups")
export class Groups {

  @PrimaryGeneratedColumn({ type: "int" })
  id_group: number;

  @ManyToOne(() => Owners, owner => owner.id_owner)
  @JoinColumn({ name: "id_owner" })
  id_owner: Owners;

  @Column({ type: "varchar", length: "100" })
  name: String;

  @Column({ type: "time" })
  start_hour: String;

  @Column({ type: "time" })
  end_hour: String;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}