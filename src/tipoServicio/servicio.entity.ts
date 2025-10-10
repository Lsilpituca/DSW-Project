import { 
  Entity, 
  Cascade,  
  ManyToOne,  
  Property, 
  Collection, 
} from '@mikro-orm/core';
import { TipoServicio } from './tipoServicio.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class Servicio extends BaseEntity{
  
  @Property({ nullable: false, unique: true })
  descripcion!: string;
  
  @ManyToOne(() => TipoServicio, { nullable: false })
  tipoServicio = TipoServicio;
  

}