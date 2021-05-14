import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Workschedules } from "./Workschedules";
import { Groups } from "./Groups";


@Entity("association_groups_workschedules")
export class WorkschedulesGroups {

  @PrimaryGeneratedColumn({type:"integer"})
  id_association: number;

  @ManyToOne(() => Groups)
  @JoinColumn({name: "id_group"})
  id_group: Groups;

  @OneToOne(() => Workschedules)
  @JoinColumn({ name: "id_workschedule"})  
  id_workschedule: Workschedules;
}