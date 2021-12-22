const mongoose = require('mongoose');

const dbConnection = async( ) => {

    try {
        mongoose.connect( process.env.DB_CNN)
        console.log('Db Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hble cone el admin');
    }
}
module.exports = {
    dbConnection
}