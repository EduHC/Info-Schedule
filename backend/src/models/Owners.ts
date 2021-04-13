import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("entity_owners")
export class Owners {

  @PrimaryGeneratedColumn({type:"int"})
  id_owner: number;

  @Column({ type: "varchar", length: 200 })
  name: String;

  @Column({ type: "varchar", length: 300 })
  company_name: String;

  @Column({ type: "varchar", length: 18 })
  CNPJ: String;

  @Column({  type: "varchar", length: 25 })
  phone: String;

  @CreateDateColumn({ type: "timestamp" })
  created_at: String;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: String;
}