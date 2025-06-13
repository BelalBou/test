#!/bin/bash

echo "🚀 Script de test de déploiement local"
echo "=====================================\n"

# Fonction pour vérifier si une commande existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Vérifier que Docker est installé
if ! command_exists docker; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker pour continuer."
    exit 1
fi

echo "✅ Docker détecté"

# Nettoyer les images existantes (optionnel)
echo "🧹 Nettoyage des images Docker existantes..."
docker rmi -f $(docker images -q --filter "dangling=true") 2>/dev/null || true

# Construire l'image Docker
echo "🔨 Construction de l'image Docker..."
docker build -t marketplace-app .

if [ $? -eq 0 ]; then
    echo "✅ Image Docker construite avec succès"
else
    echo "❌ Erreur lors de la construction de l'image Docker"
    exit 1
fi

# Lancer le conteneur
echo "🚀 Lancement du conteneur..."
docker run -d -p 3000:3000 --name marketplace-test marketplace-app

if [ $? -eq 0 ]; then
    echo "✅ Conteneur lancé avec succès"
    echo "🌐 Application disponible sur: http://localhost:3000"
    echo ""
    echo "Pour arrêter le conteneur:"
    echo "docker stop marketplace-test && docker rm marketplace-test"
else
    echo "❌ Erreur lors du lancement du conteneur"
    exit 1
fi
