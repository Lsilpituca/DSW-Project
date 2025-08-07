import { Request, Response, NextFunction } from 'express';
import { TipoServicioRepository } from './tipoServicio.repository.js';
import { TipoServicio } from './tipoServicio.entity.js';

const repository = new TipoServicioRepository();

function sanitizeTipoServicioInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

function findAll(req:Request, res:Response) {
  res.json({ data: repository.findAll() });
};

function findOne(req:Request, res:Response) {
  const id = req.params.id;
  const tipoServicio = repository.findOne({ id });
  if (!tipoServicio) {
    res.status(404).send({ message: "Tipo de servicio no encontrado" });
  }
  res.json(tipoServicio);
}

function add(req:Request, res:Response) {
  const input = req.body.sanitizedInput;
  const tipoServicioInput = new TipoServicio(
    undefined,
    input.nombre,
    input.descripcion
  );
  const nuevoTipoServicio = repository.add(tipoServicioInput);
  return res
    .status(201)
    .send({ message: "Tipo de servicio creado", data: nuevoTipoServicio });
};

function update(req:Request, res:Response) {
  req.body.sanitizedInput.id = req.params.id;
  const tipoServicio = repository.update(req.body.sanitizedInput);

  if (!tipoServicio) {
    res.status(404).send({ message: "Tipo de servicio no encontrado" });
  }

  return res
    .status(200)
    .send({
      message: "Tipo de servicio actualizado",
      data: tipoServicio,
    });
};

function remove(req:Request, res:Response) {
  const id = req.params.id;
  const tipoServicio = repository.delete({id});

  if (!tipoServicio) {
    res.status(404).send({ message: "Tipo de servicio no encontrado" });
  } else {
    res.status(200).send({ message: "Tipo de servicio eliminado" });
  }
};

export { sanitizeTipoServicioInput, findAll, findOne, add, update, remove };