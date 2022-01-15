# API REST - Administrador de contraseñas


### Acerca de:
- Backend implementado con Express/Node.js, y JavaScript como lenguaje.


### Dependencias:
- mysql
- express
- nodemon [desarrollo]

## Funcionamiento:
Esta API rest es el nexo entre el usuario y sus datos.  
Se engarga de realizar un CRUD de los datos del usuario, y sus registros de contraseñas.  
En la base de datos, se guarda información de cada usuario (username y contraseña) y cada uno de los registros de contraseñas.  
Con respecto a los registros de contraseñas, se guarda el nombre de sitio o red social, el usuario, el correo asociado (no obligatorio), y la contraseña encriptada.  
Es importante destacar que los datos anteriores son públicos, y que la contraseña se guarda de forma encriptada, de la misma forma que la envía el cliente a través de una petición http.  
Es decir, el proceso de encriptado y des-encriptado de la contraseña de cada registro, se realiza completamente del lado de la aplicación del cliente. Esto hace que la API sea segura y que no hayan filtraciónes de datos ante ataques o cualquier amenaza.  La misma aplicación de cliente (movil) guarda internamente un tóken para encriptado y des-encriptado de los datos.