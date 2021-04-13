import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Profiles } from "./Profiles";
import { Users } from "./Users";

@Entity("association_users_profiles")
export class UsersProfiles {

  @PrimaryGeneratedColumn({type:"int"})
  id_association: number;

  @OneToOne(() => Users)
  @JoinColumn()
  id_owner: Users;

  @OneToOne(() => Profiles)
  @JoinColumn()  
  id_profile: Profiles;
}