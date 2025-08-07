import crypto from 'crypto';

export class TipoServicio {
  constructor(
    public id= crypto.randomUUID(), //Temporal, despues la vamos a crear en la BD
    public nombre: string,
    public descripcion: string
  ) {}
}
