import jwt from 'jsonwebtoken';
import authConfig from './authConfig';

const { secretKey } = authConfig;
//Verifica token en la ruta con el asignado
export const autentica = (req, res, next) => {
    let token = req.headers.authorization || '';
    //Capta si falta el token para la request
    if (!token) {
        res.status(400).json({ ok: false, error: 'token absent' });
    }
    //Verifica el token
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            res.status(400).json({ ok: false, error: 'token invalid' });
        } else {
            const { expiredAt } = decoded;
            if (expiredAt > new Date().getTime()) {
                next();
            } else {
                res.status(400).json({ ok: false, error: 'token caducat' });
            }
        }
    });
};



