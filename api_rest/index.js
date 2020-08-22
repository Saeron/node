const express = require("express");
const app = express();
app.use(express.json()); //importante para que use json

let usuarios = [];

app.get('/usuarios', function (req, res){
    res.json(usuarios);
});

app.post('/usuarios', function (req, res){
    user = req.body;
    usuarios.push(user);
    res.json(user);
});


app.listen(5000, () => {
    console.log("El servidor esta iniciado en el puerto 5000")
});