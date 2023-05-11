import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum PersonStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE',
}
@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id_de_caso: number;
  @Column()
  ciudad_municipio_nom: string;
  @Column()
  ciudad_municipio: number;
  @Column()
  departamento_nom: string;
  @Column()
  departamento: number;
  @Column()
  edad: number;
  @Column()
  estado: string;
  @Column()
  fecha_de_notificaci_n: string;
  @Column()
  fecha_diagnostico: string;
  @Column()
  fecha_inicio_sintomas: string;
  @Column()
  fecha_recuperado: string;
  @Column()
  fecha_reporte_web: string;
  @Column()
  fuente_tipo_contagio: string;
  @Column()
  per_etn_: string;
  @Column()
  recuperado: string;
  @Column()
  sexo: string;
  @Column()
  tipo_recuperacion: string;
  @Column()
  ubicacion: string;
  @Column()
  unidad_medida: number;
}
