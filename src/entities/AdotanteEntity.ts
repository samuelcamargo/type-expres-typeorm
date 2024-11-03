// AdotanteEntity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";

@Entity()
export default class AdotanteEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column({ nullable: true })
  celular?: string;
  @Column({ nullable: true })
  foto?: string;
  @OneToOne(() => EnderecoEntity, {
    nullable: true,
    cascade: true,
    eager: true
  })
  @JoinColumn()
  endereco?: EnderecoEntity;
  @OneToMany(() => PetEntity, (pet) => pet.adotante)
  pets!: PetEntity[];

  constructor(
    nome: string,
    senha: string,
    celular?: string,
    foto?: string,
    endereco?: EnderecoEntity
  ) {
    this.nome = nome;
    this.senha = senha;
    this.foto = foto;
    this.celular = celular;
    this.endereco = endereco;
  }
}

function manyToOne(arg0: () => typeof AdotanteEntity, arg1: (adotante: any) => any): (target: AdotanteEntity, propertyKey: "adotante") => void {
  throw new Error("Function not implemented.");
}
