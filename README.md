
# Proyecto Hackaton Fundesplai ~ Backend

El programa es la parte backend pensada para el registro y acceso de usuarios

## Arranque
Importar SQL a base de datos.

Para iniciar el proyecto ejecutar:

```bash
  npm start
```


## Referencias a API

#### Login

```http
  POST /api/usuarios/login/:body
```

#### Registro

```http
  POST /api/usuarios/register/:body
```


## Tech Stack
**Server:** Node, Express, Sequelize, cors


**Middleware:** jwt, bcrypt

