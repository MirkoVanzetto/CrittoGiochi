# Fase 1: Costruzione dell'applicazione (Build)
FROM node:20-alpine AS builder

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia i file delle dipendenze
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

# Compila l'applicazione React/Vite per la produzione
RUN npm run build

# Fase 2: Configurazione del server web (Nginx) per servire i file statici
FROM nginx:alpine

# Rimuovi i file di default di Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia i file compilati dalla fase precedente nella cartella di Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Esponi la porta 80 (quella di default per Nginx)
EXPOSE 80

# Avvia Nginx in primo piano
CMD ["nginx", "-g", "daemon off;"]
