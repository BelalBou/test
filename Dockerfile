# Multi-stage Dockerfile pour déploiement full-stack sur Render
FROM node:20-alpine AS frontend-builder

# Set working directory pour le frontend
WORKDIR /app/frontend

# Copie les fichiers de dépendances du frontend
COPY frontend/package*.json ./

# Installe toutes les dépendances (y compris devDependencies pour le build)
RUN npm ci

# Copie le code source du frontend
COPY frontend/ ./

# Build le frontend Angular pour la production
RUN npm run build

# Stage 2: Backend avec fichiers statiques du frontend
FROM node:20-alpine AS backend

# Set working directory
WORKDIR /app

# Copie les fichiers de dépendances du backend
COPY backend/package*.json ./

# Installe toutes les dépendances (y compris devDependencies pour le build)
RUN npm ci

# Copie le code source du backend
COPY backend/ ./

# Build le backend NestJS
RUN npm run build

# Nettoyage - supprime les devDependencies après le build
RUN npm prune --production

# Copie les fichiers statiques du frontend buildé
COPY --from=frontend-builder /app/frontend/dist/frontend ./public

# Expose le port (Render utilise la variable d'environnement PORT)
EXPOSE $PORT

# Lance l'application
CMD ["npm", "run", "start:prod"]
