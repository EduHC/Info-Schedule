import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Profiles } from "./Profiles";
import { Users } from "./Users";

@Entity("association_groups_workschedules")
export class GroupsWorkschedules {

  @PrimaryGeneratedColumn({type:"int"})
  id_association: number;

  @OneToOne(() => Users)
  @JoinColumn()
  id_owner: Users;

  @OneToOne(() => Profiles)
  @JoinColumn()  
  id_profile: Profiles;
}