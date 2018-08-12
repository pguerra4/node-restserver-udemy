// =============
// Puerto
//==============

process.env.PORT = process.env.PORT || 3000;

// =============
// Entorno
//==============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============
// URL Base de datos
//==============

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://mongoUser:123456a@ds151662.mlab.com:51662/cafe-paul-udemy';
}


process.env.URLDB = urlDB;