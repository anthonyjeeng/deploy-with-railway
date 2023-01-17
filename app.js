const express = require('express');
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;



//Conexion a Base de Datos
const mongoose = require('mongoose');

const uri = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}:${process.env.MONGOPORT}`

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))


//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(express.static(__dirname + "/public"));

//rutas web
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Titulo del sitio web"
    })
})


app.listen(port, () => {
    console.log('servidor a su servicio en el puerto', port)
})