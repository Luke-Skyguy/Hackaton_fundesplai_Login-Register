import { sequelize, dataTypes } from "../loadSequelize.js";
//Parametros del usuario en la BBDD
export const Usuario = sequelize.define('Usuario', {
           nombre:     dataTypes.STRING,
            email:     dataTypes.STRING,
            fecha:     dataTypes.DATE,
         password:     dataTypes.STRING,

}, { tableName: 'usuarios', timestamps: false });

