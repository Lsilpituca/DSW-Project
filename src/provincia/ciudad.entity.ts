import { 
  Entity, 
  Cascade,  
  ManyToOne,  
  Property, 
  Collection, 
} from '@mikro-orm/core';
import { Provincia } from './provincia.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class Ciudad extends BaseEntity{
  
  @Property({ nullable: false, unique: true })
  nombre!: string;

  @ManyToOne(() => Provincia, { nullable: false } )
  provincia = Provincia

}