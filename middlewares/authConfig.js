/**
 * Parametros
 *  secretKey:    la clave unica de esta API, cualquier peticion debe portar esta llave
 *  expiredAfter: tiempo de respuesta de la peticion
 */
const secretKey = '¡recicla-melón!';
const expiredAfter = 60 * 10 * 1000; //milisegundos

export default {
  secretKey,
  expiredAfter
};
