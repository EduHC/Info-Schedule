import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Groups } from "./Groups";
import { Users } from "./Users";

@Entity("inf_association_groups_users")
export class GroupsUsers {

  @PrimaryGeneratedColumn({type:"integer"})
  id_association: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "id_user" })
  id_user: Users;

  @ManyToOne(() => Groups)
  @JoinColumn({ name: "id_group" })  
  id_group: Groups;
}