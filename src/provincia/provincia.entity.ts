import { Entity, Property, OneToMany, Collection, Cascade } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Ciudad } from './ciudad.entity.js';

@Entity()
export class Provincia extends BaseEntity {
    
  @Property({ nullable: false })
  nombre!: string
  
  @OneToMany(() => Ciudad, ciudad => ciudad.provincia, { cascade: [Cascade.ALL] })
  ciudades = new Collection<Ciudad>(this);
  

}

  