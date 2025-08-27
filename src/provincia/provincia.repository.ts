import { Repository } from "../shared/repository.js";
import { Provincia } from "./provincia.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { parse } from "path";
import { RowDataPacket } from "mysql2";


export class ProvinciaRepository implements Repository<Provincia> {
  
  public async findAll(): Promise <Provincia[] | undefined> {
    const [provincias] = await pool.query('SELECT * FROM provincia');
    for (const provincia of provincias as Provincia[]) {
      const [items] = await pool.query('SELECT nombre FROM ciudad WHERE Idprovincia = ?', [provincia.id]);
      provincia.items = (items as { itemName: string }[]).map(item => item.itemName); 
    }
    return provincias as Provincia[];
  }

  public async findOne(item: { id: string }): Promise <Provincia | undefined>{
    const id = Number.parseInt(item.id);
    const [provincias] = await pool.query<RowDataPacket[]>('SELECT * FROM provincia WHERE id = ?', [id]);
    if (provincias.length === 0) {
      return undefined;
    }
    const provincia = provincias[0] as Provincia;
    const [items] = await pool.query('SELECT nombre FROM ciudad WHERE Idprovincia = ?', [provincia.id]);
    provincia.items = (items as { itemName: string }[]).map(item => item.itemName);
    return provincia;
  }

  public async add(item: Provincia): Promise <Provincia | undefined> {
    throw new Error("Method not implemented.");
  }

  public async update(id: string, item: Provincia): Promise <Provincia | undefined> {
    throw new Error("Method not implemented.");
  }

  public async delete(item: { id: string }): Promise <Provincia | undefined> {
    throw new Error("Method not implemented.");
    }
  }


