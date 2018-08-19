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
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// =============
// Vencimiento de Token
//==============
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


// =============
// Seed de autentiación
//==============
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';



// =============
// Google Client ID
//==============
process.env.CLIENT_ID = process.env.CLIENT_ID || '65348176352-au2s0lr7tmm4oqiup40hoad4coijlj0g.apps.googleusercontent.com';