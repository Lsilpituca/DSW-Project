import { Request, Response, NextFunction } from "express";
import { Provincia } from "./provincia.entity.js";

const repository = new ProvinciaRepository();

function sanitizeProvinciaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const provincia = repository.findOne({ id });
  if (!provincia) {
    res.status(404).send({ message: "Provincia no encontrada" });
  }
  res.json(provincia);
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const provinciaInput = new Provincia(input.nombre, input.cuidades ?? [], input.id);
  const nuevaProvincia = repository.add(provinciaInput);
  return res
    .status(201)
    .send({ message: "Provincia creada", data: nuevaProvincia });
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = req.params.id;
  const provincia = repository.update(req.params.id, req.body.sanitizedInput);

  if (!provincia) {
    res.status(404).send({ message: "Provincia no encontrada" });
  }

  return res
    .status(200)
    .send({ message: "Provincia actualizada", data: provincia });
}

function remove(req: Request, res: Response) {
  const id = req.params.id;
  const provincia = repository.delete({ id });

  if (!provincia) {
    res.status(404).send({ message: "Provincia no encontrada" });
  }

  return res.status(200).send({ message: "Provincia eliminada" });
};

export {sanitizeProvinciaInput, findAll, findOne, add, update, remove};

  
