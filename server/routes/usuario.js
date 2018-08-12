const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Ususario = require('../models/usuario')


const app = express();




app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // let filtro = { status: true }

    Ususario.find({ status: true }, 'nombre email status role google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Ususario.count({ status: true }, (err, conteo) => {


                res.json({
                    ok: true,
                    usuarios,
                    cantidadUsuarios: conteo
                })
            })


        })

    // res.json('get usuario')
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Ususario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'El nombre es necesario'
    //     });
    // } else {
    //     res.json({ persona: body });
    // }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'status']);

    Ususario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    // Ususario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Ususario.findByIdAndUpdate(id, { status: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });


});


module.exports = app;