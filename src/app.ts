import express, { NextFunction, Request, Response } from 'express';
import { TipoServicio } from './tipoServicio.js';

const app = express();
app.use(express.json());

//CRUD tipo de servicio
const tiposServicios = [
  new TipoServicio(undefined, 'Limpieza', 'Servicio de limpieza general'),
  new TipoServicio(undefined, 'Mantenimiento', 'Servicio de mantenimiento general'),
  new TipoServicio(undefined, 'Transporte', 'Servicio de transporte de mercancías')
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

app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}); 