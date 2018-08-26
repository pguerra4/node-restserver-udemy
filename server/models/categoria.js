const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de categoria es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    creado_por: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe conocerse el usuario que crea el registro']
    },
    fecha_creacion: {
        type: Date,
        required: true
    },
    modificado_por: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    ultima_modificacion: {
        type: Date
    }
});


categoriaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Categoria', categoriaSchema);