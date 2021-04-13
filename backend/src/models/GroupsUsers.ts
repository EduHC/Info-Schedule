import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Groups } from "./Groups";
import { Users } from "./Users";

@Entity("association_groups_users")
export class GroupsUsers {

  @PrimaryGeneratedColumn({type:"int"})
  id_association: number;

  @OneToOne(() => Users)
  @JoinColumn()
  id_owner: Users;

  @OneToOne(() => Groups)
  @JoinColumn()  
  id_profile: Groups;
}