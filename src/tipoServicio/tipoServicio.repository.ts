import { Repository } from "../shared/repository.js";
import { TipoServicio } from "./tipoServicio.entity.js";
import { pool } from "../shared/db/conn.mysql.js";


export class TipoServicioRepository implements Repository<TipoServicio>{

  public findAll(): Promise <TipoServicio[] | undefined> {
    throw new Error("Method not implemented.");
  }

  public findOne(item: { id: string }): Promise <TipoServicio | undefined> {
    throw new Error("Method not implemented.");
  }

  public add(item: TipoServicio): Promise <TipoServicio | undefined> {
    throw new Error("Method not implemented.");
  }

  public update(id: string, item: TipoServicio): Promise <TipoServicio | undefined> {
    throw new Error("Method not implemented.");
    }

  public delete ( item: { id: string }): Promise <TipoServicio | undefined> {
    throw new Error("Method not implemented.");
  }
}
