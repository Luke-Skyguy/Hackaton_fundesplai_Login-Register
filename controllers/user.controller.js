import express from 'express';
import { sequelize } from "../loadSequelize.js";
import { Usuario, Objeto } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../middlewares/authConfig.js';
const { secretKey, expiredAfter } = authConfig;

const controller = express.Router();

// vinculamos la ruta /api/usuarios a la función declarada
// GET lista de todos los usuarios
controller.get("/", function (req, res, next) {

    sequelize.sync().then(() => {

        Usuario.findAll({
            include: {
                model: Objeto
            }
        })
            //.then(alumnes => res.json(alumnes))
            .then(usuarios => res.json({
                ok: true,
                data: usuarios
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});
// GET busca unico usuario
controller.get('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Usuario.findOne({
            where: { id: req.params.id },
            include: {
                model: Objeto
            }
        })
            .then(al => res.json({
                ok: true,
                data: al
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });
});

// POST Login, busca usuario en BDD para corelar los datos
controller.post('/login', async (req, res) => {
    const response = {};
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ ok: false, msg: "email o password no rebuts" });
    }

    Usuario.findOne({ where: { email } })
        .then((usuari) => {

            if (usuari && bcrypt.compareSync(password, usuari.password)) {
                return usuari;
            } else {
                throw "email/password invalids";
            }
        })
        .then(usuari => {
            response.token = jwt.sign(
                {
                    expiredAt: new Date().getTime() + expiredAfter,
                    email,
                    nom: usuari.nom,
                    id: usuari.id,
                },
                secretKey
            );
            response.ok = true;
            res.json(response);
        })
        .catch(err => res.status(400).json({ ok: false, msg: err }))

});

// POST Register añade usuario
controller.post('/register', (req, res, next) => {
    sequelize.sync().then(() => {

        upload(req, res, function (err) {
            if (err) {
                return res.status(500).json(err)
            };
            const hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hash;

            Usuario.create(req.body)
                .then((item) => res.json({ ok: true, data: item }))
                .catch((error) => res.json({ ok: false, error: error.message }))

        })
    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
});

// PUT actualiza datos usuario
controller.put('/:id', function (req, res, next) {
    sequelize.sync().then(() => {

        Usuario.findOne({ where: { id: req.params.id } })
            .then(usuario_trobat =>
                usuario_trobat.update(req.body)
            )
            .then(usuario_modificat => res.json({
                ok: true,
                data: usuario_modificat
            }))
            .catch(error => res.json({
                ok: false,
                error: error.message
            }));

    }).catch((error) => {
        res.json({
            ok: false,
            error: error.message
        })
    });
});



// DELETE elimina usuario
controller.delete('/:id', function (req, res, next) {

    sequelize.sync().then(() => {

        Usuario.destroy({ where: { id: req.params.id } })
            .then((data) => res.json({ ok: true, data }))
            .catch((error) => res.json({ ok: false, error }))

    }).catch((error) => {
        res.json({
            ok: false,
            error: error
        })
    });

});


export default controller;
