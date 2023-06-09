const {response, request } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async ( req , res ) => {

  const {limite = 5, desde = 0 } = req.query;
  const query = { estado: true}

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async ( req,res ) => {

  const {nombre, correo, password, rol} = req.body;

  const usuario = new Usuario({nombre, correo, password, rol});

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en la BD
  await usuario.save();

  res.json({
    usuario
  });
};

const usuariosPut = async ( req,res ) => {

  const id = req.params.id;
  const {_id, password, google, correo, ...resto} = req.body;

  // TODO validar contra base de datos
  if ( password ) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  } 

  const usuario = await Usuario.findByIdAndUpdate( id, resto );

  res.json(usuario);
};

const usuariosPatch = ( req,res ) => {
  res.json({
    msg : 'patch API - controlador'
  });
};

const usuariosDelete = async ( req,res ) => {

  const { id } = req.params;

  // fisicamente lo borramos de la base de datos
  // const usuario = await Usuario.findByIdAndDelete(id);

   // Cambiamos el estado del usuario de true a false
   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
  
  res.json({
    usuario
  });
};


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}