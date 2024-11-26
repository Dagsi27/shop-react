FROM node:lts AS production

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package.json (jeśli masz package-lock.json, też go skopiuj)
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty aplikacji
COPY . .

# Uruchomienie aplikacji
CMD ["npm", "start"]
