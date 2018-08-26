const express = require('express');
const _ = require('underscore');
const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

const app = express();

const Categoria = require('../models/categoria');

app.get('/categoria', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // let filtro = { status: true }

    Categoria.find({ status: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('creado_por', 'nombre email')
        .populate('modificado_por', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.countDocuments({ status: true }, (err, conteo) => {


                res.json({
                    ok: true,
                    categorias,
                    cantidadCategorias: conteo
                })
            })


        })

});

app.get('/categoria/:id', [verificaToken], (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});



app.post('/categoria', [verificaToken], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion,
        status: true,
        creado_por: req.usuario._id,
        fecha_creacion: new Date()
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
});

app.put('/categoria/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'descripcion']);


    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        categoriaDB.modificado_por = req.usuario._id;
        categoriaDB.ultima_modificacion = new Date();
        categoriaDB.nombre = body.nombre;
        categoriaDB.descripcion = body.descripcion;

        categoriaDB.save((err, categoriaDB2) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB2
            })
        })
    });

    // Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }
    //     res.json({
    //         ok: true,
    //         categoria: categoriaDB
    //     });
    // });

});

app.delete('/categoria/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;
    // Ususario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Categoria.findByIdAndDelete(id, (err, categoriaBorrada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrada'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaBorrada
        });
    });


});


module.exports = app;