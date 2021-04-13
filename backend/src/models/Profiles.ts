import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("entity_profiles")
export class Profiles {

  @PrimaryGeneratedColumn()
  id_profile: number;

  @Column({ type: "varchar", length: 200 })
  name: String;
}