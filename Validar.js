const validar =(req, res) => {
    if (req.session.usuario) {
      res.status(200).send('sesion validada')
    } else {
      res.status(401).send('No autoriado')
    }
  }
  module.exports = validar;