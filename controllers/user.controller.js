import express from 'express';
import { sequelize } from "../loadSequelize.js";
import {Usuario} from '../models/models.js';
import jwt from 'jsonwebtoken';
import authConfig from '../middlewares/authConfig.js';
const { secretKey, expiredAfter } = authConfig;

const controller = express.Router();

// vinculamos la ruta /api/usuarios a la función declarada

// POST Login, busca usuario en BDD para corelar los datos
controller.post('/login', async (req, res) => {
    const response = {};
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ ok: false, msg: "email o password no rebuts" });
    }

    Usuario.findOne({ where: { email } })
        .then((usuari) => {

            if (usuari && usuari.password) {
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

export default controller;
