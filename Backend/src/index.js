const express = require ('express');
const morgan = require ('morgan');


//Configuracion inicial
const app = express ();
app.set('port',4000);
app.listen (app.get('port'));
console.log ('Escuchando comunicaciones al puerto', app.get('port'));

//Middleware
app.use (morgan ('dev'));


//Rutas
app.get ('/productos', (req, res) => {
  res.send ('Lista de productos');
})