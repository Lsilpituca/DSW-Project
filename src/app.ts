import express, { NextFunction, Request, Response } from 'express';
import { TipoServicio } from './tipoServicio.js';
import { Provincia } from './provincia.js';

const app = express();
app.use(express.json());

//CRUD tipo de servicio
const tiposServicios = [
  new TipoServicio(undefined, 'Limpieza', 'Servicio de limpieza general'),
  new TipoServicio(undefined, 'Mantenimiento', 'Servicio de mantenimiento general'),
  new TipoServicio(undefined, 'Transporte', 'Servicio de transporte de mercancías')
];

//CRUD provincia
const provincias = [
  new Provincia(undefined, 'Buenos Aires'),
  new Provincia(undefined, 'Santa Fe'),
  new Provincia(undefined, 'Cordoba')
];

function sanitizeTipoServicioInput(req: Request, res: Response, next:NextFunction){

  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  }

  next()
}

app.get('/api/tiposServicios', (req, res) => {
  res.json(tiposServicios);
});

app.get('/api/tiposServicios/:id', (req, res) => {
  const tipoServicio = tiposServicios.find(ts => ts.id === req.params.id);
  if (!tipoServicio){
    res.status(404).send({ message: 'Tipo de servicio no encontrado' });
  }
  res.json(tipoServicio);
});

app.post('/api/tiposServicios', sanitizeTipoServicioInput, (req, res) => {
const input = req.body.sanitizedInput;
const nuevoTipoServicio = new TipoServicio(undefined, input.nombre, input.descripcion);
  tiposServicios.push(nuevoTipoServicio);
  res.status(201).send({message: 'Tipo de servicio creado', data: nuevoTipoServicio});
});

app.put('/api/tiposServicios/:id', sanitizeTipoServicioInput, (req, res) => {
  const tipoServicioIdx = tiposServicios.findIndex(TipoServicio => TipoServicio.id === req.params.id);
  if (tipoServicioIdx === -1) {
  res.status(404).send({ message: 'Tipo de servicio no encontrado' });
  }

  tiposServicios[tipoServicioIdx] = { ...tiposServicios[tipoServicioIdx], ...req.body.sanitizedInput }; 
  res.status(200).send({ message: 'Tipo de servicio actualizado', data: tiposServicios[tipoServicioIdx] });
});

app.delete('/api/tiposServicios/:id', (req, res) => {
  const tipoServicioIdx = tiposServicios.findIndex(TipoServicio => TipoServicio.id === req.params.id)
  if (tipoServicioIdx === -1) {
    res.status(404).send({ message: 'Tipo de servicio no encontrado' });
  } else {
    tiposServicios.splice(tipoServicioIdx, 1);
    res.status(200).send({ message: 'Tipo de servicio eliminado' });
  }
});

app.get('/api/provincias', (req, res) => {
  res.json(provincias);
});

app.get('/api/provincias/:id', (req, res) => {
  const provincia = provincias.find(p => p.id === req.params.id);
  if (!provincia) {
    res.status(404).send({ message: 'Provincia no encontrada' });
  }
  res.json(provincia);
});

app.post('/api/provincias', (req, res) => {
  const nuevaProvincia = new Provincia(undefined, req.body.nombre);
  provincias.push(nuevaProvincia);
  res.status(201).send({ message: 'Provincia creada', data: nuevaProvincia });
});

app.put('/api/provincias/:id', (req, res) => {
  const provinciaIdx = provincias.findIndex(p => p.id === req.params.id);
  if (provinciaIdx === -1) {
    res.status(404).send({ message: 'Provincia no encontrada' });
  }

  provincias[provinciaIdx] = { ...provincias[provinciaIdx], nombre: req.body.nombre };
  res.status(200).send({ message: 'Provincia actualizada', data: provincias[provinciaIdx] });
});

app.delete('/api/provincias/:id', (req, res) => {
  const provinciaIdx = provincias.findIndex(p => p.id === req.params.id);
  if (provinciaIdx === -1) {
    res.status(404).send({ message: 'Provincia no encontrada' });
  } else {
    provincias.splice(provinciaIdx, 1);
    res.status(200).send({ message: 'Provincia eliminada' });
  }
});

app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); 