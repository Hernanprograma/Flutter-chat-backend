/*

path: api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),

    check('email','El email es obligatorio').not().isEmpty(),
    check('email','El formato del email no es correcto').isEmail(),

    check('password','El password es obligatorio').not().isEmpty(),
    check('password','El password debe contener como minimo 6 carácteres').isLength({ min: 6 }),
    
    
    validarCampos
], crearUsuario );


router.post('/', [
    check('email','El email es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    

    validarCampos
],login);


router.get('/renew',validarJWT, renewToken);


module.exports = router;