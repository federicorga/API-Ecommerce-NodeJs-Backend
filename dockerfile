# Primero se define la imagen que se va a tomar como imagen
#primeor se va a ser un pull de docker y se descarg la imagen a nivel local
FROM node:16-bullseye

#segundo paso definir el directorio de trabajo. dentro del contenedor voy a crea una carpeta
#dentro de la carpeta app va a estar el codigo 
WORKDIR /app

#Copiamos el package y el -lock .json al poner * cualquiera que tenga ese nombre ./ es la ruta raiz
COPY package*.json ./

#Instalamos las dependencias dentor del contenedor con un comando
RUN npm install
#copiamos el resto de archivos (nuestro codigo)
COPY . .

#Cada contenedor trabaja de manera individual. Por eso quiero exponer el puerto 8080 para conectare a mi aplicacion desde mi computador
# o desde otros contenedores

EXPOSE 8080

#Levantamos la aplicacion corriendo comando. Se ejecutara al iniciar el contenedor.

CMD ["node", "src/app.js"]

#para general la imagen se pone en la consola: docker build -t operaciones-docker .
#operaciones-docker es el nombre que asignamos nosotros puede ser cualquiera (al poner el . punto toma la ruta en la que me encuentro actualmente y el archivo)
#cuando esto se ejecuta se crea la imagen con los pasos que se pusieron mas arriba


#una vez subido para levantar el servidor de docker usao
# docker run -p 8080:8080 operaciones-docker