const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado } = require ('../controllers/socket');


//mensajes io de socket.io
io.on("connection", (client) => { 
    console.log('Cliente conectado :D'); 
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);
    
    // Verificar autenticacion con el token
    if( !valido ) return client.disconnect();
    
    // Cliente autenticado
    usuarioConectado( uid );

    //Ingresar al usuario a una sala especifica
    //Sala global, client.id, 61c2301015bb5e238b218c7c
    client.join(uid);

    // Escuchar del cliente el mensaje personal
    client.on('mensaje-personal',(payload)=> {
        console.log(payload);

        io.to(payload.para).emit('mensaje-personal',payload);
    });
    


    client.on('disconnect', () => { 
    console.log('Cliente desconectado :(');
    usuarioDesconectado(uid);
     });

    // client.on('mensaje',(payload)=>{
    // console.log('Mensaje!!!',payload)
    // io.emit('mensaje',{ admin:'Nuevo Mensaje'})

    // });   

 });
