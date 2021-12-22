const jwt = require('jsonwebtoken');

const generaJWT = (uid)=> {
   
return new Promise((resolve, reject)=>{

    const payload = { uid };

    jwt.sign( payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    }, (err, token )=>{
        if(err){
            //no se pudo crear el token
            reject('No se pudo generar el token');
        }else{
            //tenemos el token
            resolve(token);
        }

    })


});


}


module.exports = {
    generaJWT
}