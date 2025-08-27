import crypto from 'crypto';


export class Provincia {
  constructor(
    public nombre: string,
    public items: string[],
    public id?: string
  ) {}
}

  