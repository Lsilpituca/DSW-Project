import { Repository } from "../shared/repository.js";
import { Provincia } from "./provincia.entity.js";
import { pool } from "../shared/db/conn.mysql.js";

const provincias = [
  new Provincia(undefined, 'Buenos Aires'),
  new Provincia(undefined, 'Santa Fe'),
  new Provincia(undefined, 'Córdoba')
];

export class ProvinciaRepository implements Repository<Provincia> {

  public findAll(): Provincia[] | undefined {
    return provincias;
  }

  public findOne(item: { id: string }): Provincia | undefined {
    return provincias.find(p => p.id === item.id);
  }

  public add(item: Provincia): Provincia | undefined {
    provincias.push(item);
    return item;
  }

  public update(item: Provincia): Provincia | undefined {
    const provinciaIdx = provincias.findIndex(p => p.id === item.id);

    if (provinciaIdx !== -1) {
      provincias[provinciaIdx] = { ...provincias[provinciaIdx], ...item };
    }
    return provincias[provinciaIdx];
  }

  public delete(item: { id: string }): Provincia | undefined {
    const provinciaIdx = provincias.findIndex(p => p.id === item.id);

    if (provinciaIdx !== -1) {
      const deletedProvincia = provincias[provinciaIdx]; // Guardar el item antes de borrarlo
      provincias.splice(provinciaIdx, 1); // Eliminar el item del array
      return deletedProvincia; // Devolver el item eliminado
    }
  }
}


