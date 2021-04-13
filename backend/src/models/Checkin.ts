import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Column } from "typeorm";
import { Users } from "./Users";

@Entity("entity_checkins")
export class Checkins {

  @PrimaryGeneratedColumn({type:"int"})
  id_checkin: number;

  @OneToOne(() => Users)
  @JoinColumn()
  id_user: Users;

  @CreateDateColumn({ type: "timestamp" })
  start_hour: String;

  @CreateDateColumn({ type: "timestamp" })
  final_hour: String;
  
  @Column({ type: "boolean" })
  valid_location: Boolean
  
  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}