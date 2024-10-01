# Usa una imagen base de Node.js
FROM node:16 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen de Nginx para servir los archivos construidos
FROM nginx:alpine

# Copia los archivos construidos a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto en el que Nginx escucha
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
