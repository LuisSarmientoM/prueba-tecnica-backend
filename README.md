<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

This project has ben generate with Nestjs in NodeJS

Para ejecutar localmente se deben realizar los siguientes pasos:

- Instalar node en su version LTS.
- Instalar el cli de NestJS `npm i -g @nestjs/cli`
- Instalar las dependencias del projecto `npm install`
- Modificar el archivo .env para las conexiones con la base de datos y el puerto.
  - PORT: Puerto donde se ejecuta el servidor local
  - HOST: Host de la base de datos MySQL
  - USERNAME: Nombre de usuario para la conexion con la base de datos
  - PASSWORD: Contraseña del usuario, dejar vacio si no se requiere
  - DATABASE_PORT: puerto de la base de datos
  - DATABASE: Nombre de la base de datos
- crear la base de datos con el nombre indicado en el archivo .env
- ejecutar el comando `npm run migration:run` para creaer las tablas de la base de datos
- ejecutar en modo desarrollo `npm run start:dev`

## Dependencias

- typeorm: Orm para NodeJS que facilita la manipulacion de la base de datos
- NestJS: Framework de NodeJS para crear api robustas y altamente escalables
- dotenv: orquestador de variables de entorno
- class-transformer: Manipular los objetos para asegurar que se recibe lo que se necesita y no devolver informacion sensible.
