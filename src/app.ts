import express, { NextFunction, Request, Response } from "express";
import { Provincia } from "./provincia.js";
import {tipoServicioRouter} from "./tipoServicio/tipoServicio.routes.js";

const app = express();
app.use(express.json());

//CRUD tipo de servicio
app.use("/api/tiposServicios", tipoServicioRouter);

//CRUD provincia
const provincias = [
  new Provincia(undefined, "Buenos Aires"),
  new Provincia(undefined, "Santa Fe"),
  new Provincia(undefined, "Cordoba"),
];

app.get("/api/provincias", (req, res) => {
  res.json(provincias);
});

app.get("/api/provincias/:id", (req, res) => {
  const provincia = provincias.find((p) => p.id === req.params.id);
  if (!provincia) {
    res.status(404).send({ message: "Provincia no encontrada" });
  }
  res.json(provincia);
});

app.post("/api/provincias", (req, res) => {
  const nuevaProvincia = new Provincia(undefined, req.body.nombre);
  provincias.push(nuevaProvincia);
  res.status(201).send({ message: "Provincia creada", data: nuevaProvincia });
});

app.put("/api/provincias/:id", (req, res) => {
  const provinciaIdx = provincias.findIndex((p) => p.id === req.params.id);
  if (provinciaIdx === -1) {
    res.status(404).send({ message: "Provincia no encontrada" });
  }

  provincias[provinciaIdx] = {
    ...provincias[provinciaIdx],
    nombre: req.body.nombre,
  };
  res
    .status(200)
    .send({ message: "Provincia actualizada", data: provincias[provinciaIdx] });
});

app.delete("/api/provincias/:id", (req, res) => {
  const provinciaIdx = provincias.findIndex((p) => p.id === req.params.id);
  if (provinciaIdx === -1) {
    res.status(404).send({ message: "Provincia no encontrada" });
  } else {
    provincias.splice(provinciaIdx, 1);
    res.status(200).send({ message: "Provincia eliminada" });
  }
});

app.use((_, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
