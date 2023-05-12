import { sequelize, dataTypes } from "../loadSequelize.js";

export const Usuario = sequelize.define('Usuario', {
           nombre:     dataTypes.STRING,
            email:     dataTypes.STRING,
            fecha:     dataTypes.DATE,
           imagen:     dataTypes.STRING,
         password:     dataTypes.STRING,


}, { tableName: 'usuarios', timestamps: false });
