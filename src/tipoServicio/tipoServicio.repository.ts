import { Repository } from "../shared/repository.js";
import { TipoServicio } from "./tipoServicio.entity.js";
import { pool } from "../shared/db/conn.mysql.js";

const tiposServicios = [
  new TipoServicio(undefined, 'Limpieza', 'Servicio de limpieza general'),
  new TipoServicio(undefined, 'Mantenimiento', 'Servicio de mantenimiento general'),
  new TipoServicio(undefined, 'Transporte', 'Servicio de transporte de mercancías')
];

export class TipoServicioRepository implements Repository<TipoServicio>{

  public findAll(): TipoServicio[] | undefined {
    return tiposServicios;
  }

  public findOne(item: { id: string }): TipoServicio | undefined {
    return tiposServicios.find(ts => ts.id === item.id);
  }

  public add(item: TipoServicio): TipoServicio | undefined {
    tiposServicios.push(item);
    return item;
  }

  public update(item: TipoServicio): TipoServicio | undefined {
    const tipoServicioIdx = tiposServicios.findIndex(TipoServicio => TipoServicio.id === item.id);

  if (tipoServicioIdx !== -1) {
    tiposServicios[tipoServicioIdx] = { ...tiposServicios[tipoServicioIdx], ...item };
  }
    return tiposServicios[tipoServicioIdx];
    }

  public delete ( item: { id: string }): TipoServicio | undefined {
    const tipoServicioIdx = tiposServicios.findIndex(TipoServicio => TipoServicio.id === item.id)

  if (tipoServicioIdx !== -1) {
    const deletedTipoServicio = tiposServicios[tipoServicioIdx]; //Guardo el item antes de borrarlo
    tiposServicios.splice(tipoServicioIdx, 1); // Elimino el item del array
    return deletedTipoServicio; // Devuelvo el item eliminado
  }
}
}