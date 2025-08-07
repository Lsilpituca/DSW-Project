import crypto from 'crypto';


export class Provincia {
  constructor(
    public id= crypto.randomUUID(), // Temporal, despues la vamos a crear en la BD
    public nombre: string,
  ) {}
}