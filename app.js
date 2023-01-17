const express = require('express');
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;



//Conexion a Base de Datos
const mongoose = require('mongoose');

const user = 'student_vet'
const password = 'kdA9VhT6ZEkYWhdG'
const dbname = 'veterinaria'

const uri = `mongodb+srv://${user}:${password}@cluster0.mmv2wfi.mongodb.net/${dbname}?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.mmv2wfi.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri)
}



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