# Usar uma imagem base do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY package*.json ./
COPY src ./src

# Instalar dependências
RUN npm install

# Expor a porta
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
