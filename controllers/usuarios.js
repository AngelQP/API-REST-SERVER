const {response, request } = require('express')


const usuariosGet = ( req , res ) => {

  const {q, name= 'No name', apikey, page= '1', limit} = req.query;

  res.json({
    msg : 'get API - controlador',
    q,
    name,
    apikey,
    page,
    limit
  });
};

const usuariosPost = ( req,res ) => {

  const body = req.body;

  res.json({
    msg : 'post API - controlador',
    body,
  });
};

const usuariosPut = ( req,res ) => {

  const id = req.params.id;

  res.json({
    msg : 'put API - controlador',
    id,
  });
};

const usuariosPatch = ( req,res ) => {
  res.json({
    msg : 'patch API - controlador'
  });
};

const usuariosDelete = ( req,res ) => {
  res.json({
    msg : 'delete API - controlador'
  });
};


module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}