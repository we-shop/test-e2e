FROM node:14
WORKDIR /app
COPY package*.json* ./
RUN npm install 
RUN mkdir logs
RUN mkdir shared 
COPY . .