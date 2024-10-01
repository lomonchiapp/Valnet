# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto en el que Vite escucha
EXPOSE 5173

# Comando por defecto
CMD ["npm", "run", "dev"]
