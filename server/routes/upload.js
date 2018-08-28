const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.put('/upload', function(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha subido ningun archivo.'
            }

        });
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    //Extensiones permitidas
    let extensionesValidas = ['jpg', 'png', 'jpeg'];


    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones válidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        })
    }

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${ archivo.name }`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        res.json({
            ok: true,
            message: 'Archivo cargado'
        });
    });


});

module.exports = app;