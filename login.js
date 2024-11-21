const connection = require("./conexion");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const login = async (req, res) => {
    const datos = req.query
    try {
      const [results, fields] = await connection.query(
        "SELECT * FROM `usuarios` WHERE `usuario` = ?",
        [datos.usuario]  
      );
      console.log(bcrypt.hashSync(datos.clave, saltRounds))
      if (results.length > 0 && bcrypt.compareSync(datos.clave, results[0].clave)) {
        req.session.usuario = datos.usuario
        res.status(200).send('Inicio de sesión correcto')
      } else {
        res.status(401).send('Datos Incorrectos')
      }  
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
      console.log(err);
      res.status(500).send('Error del servidor')
    }
  }
  module.exports = login;