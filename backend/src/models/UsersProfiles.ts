import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Profiles } from "./Profiles";
import { Users } from "./Users";

@Entity("association_users_profiles")
export class UsersProfiles {

  @PrimaryGeneratedColumn({type:"int", unsigned: true})
  id_association: number;

  @OneToOne(() => Users, { eager: true })
  @JoinColumn({ name:"id_user" })
  id_user: Users;

  @OneToOne(() => Profiles, { eager: true })
  @JoinColumn({ name:"id_profile" })  
  id_profile: Profiles;
}