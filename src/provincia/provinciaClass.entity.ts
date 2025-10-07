import { 
  Entity, 
  Cascade,  
  OneToMany, 
  PrimaryKey, 
  Property, 
  Collection, 
} from '@mikro-orm/core';
import { Provincia } from './provincia.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class ProvinciaClass extends BaseEntity{
  
  @Property({ nullable: false, unique: true })
  nombre!: string

  @OneToMany(() => Ciudad, (ciudad) => ciudad.provinciaClass, { 
    cascade: [Cascade.ALL] 
  })
  
  ciudades = new Collection<Ciudad>(this);
}