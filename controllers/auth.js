const { response } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generaJWT } = require("../helpers/jwt");



const crearUsuario = async (req, res = response)  =>{

    const { email, password } =req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg:'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        //Generar mi token
        const token = await generaJWT(usuario.id);

        res.json({
        ok: true,
        usuario,
        token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.'
        });
        
    }

    
} 

const login = async (req, res = response)  =>{

    const { email, password } =req.body;

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if(!usuarioDB) {
            return res.status(404).json({
              ok : false,
              msg: 'Email no encontrado'  
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            });
        }
        //Generar Token
        const token = await generaJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
            });


            
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }



}
const renewToken = async(req, res = response) => {

    const { uid } =req.body;

    try {
        const token = await generaJWT(uid);
    
        const usuario = await Usuario.findOne( uid );
    
    
        res.json({
            ok: true,
            usuario,  
            token
        });
    } catch (error) {
        console.log(error);
        
    }


}



module.exports = {
    crearUsuario, login, renewToken
}