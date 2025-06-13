#!/bin/bash

echo "🔗 Test de connexion à la base de données"
echo "========================================"

# Source le fichier .env
if [ -f backend/.env ]; then
    export $(grep -v '^#' backend/.env | xargs)
    echo "✅ Variables d'environnement chargées depuis backend/.env"
else
    echo "❌ Fichier backend/.env non trouvé"
    exit 1
fi

echo ""
echo "📊 Configuration détectée:"
echo "NODE_ENV: ${NODE_ENV:-'non défini'}"
echo "DATABASE_URL: $([ -n "$DATABASE_URL" ] && echo "Défini (${#DATABASE_URL} caractères)" || echo "Non défini")"
echo "DB_HOST: ${DB_HOST:-'non défini'}"
echo "DB_PORT: ${DB_PORT:-'non défini'}"
echo "DB_USERNAME: ${DB_USERNAME:-'non défini'}"
echo "DB_NAME: ${DB_NAME:-'non défini'}"
echo ""

# Test de connexion avec psql si DATABASE_URL est définie
if [ -n "$DATABASE_URL" ]; then
    echo "🔍 Test de connexion avec DATABASE_URL..."
    
    # Vérifier si psql est installé
    if command -v psql &> /dev/null; then
        echo "Tentative de connexion à la base de données..."
        
        # Test de connexion simple
        if psql "$DATABASE_URL" -c "SELECT version();" 2>/dev/null; then
            echo "✅ Connexion réussie avec DATABASE_URL!"
            
            # Lister les tables existantes
            echo ""
            echo "📋 Tables existantes dans la base de données:"
            psql "$DATABASE_URL" -c "\dt" 2>/dev/null || echo "Aucune table trouvée ou erreur lors de la lecture des tables"
            
        else
            echo "❌ Échec de la connexion avec DATABASE_URL"
            echo "Vérifiez que:"
            echo "1. L'URL de la base de données est correcte"
            echo "2. La base de données est accessible depuis votre réseau"
            echo "3. Les informations d'authentification sont valides"
        fi
    else
        echo "⚠️  psql n'est pas installé. Installation recommandée pour tester la connexion:"
        echo "   Ubuntu/Debian: sudo apt-get install postgresql-client"
        echo "   macOS: brew install postgresql"
    fi
else
    echo "⚠️  DATABASE_URL non définie. Utilisation des variables individuelles."
    echo "DB_HOST: $DB_HOST"
    echo "DB_PORT: $DB_PORT"
    echo "DB_USERNAME: $DB_USERNAME"
    echo "DB_NAME: $DB_NAME"
fi

echo ""
echo "🔧 Pour résoudre les problèmes de connexion sur Render:"
echo "1. Vérifiez que DATABASE_URL est bien configurée dans les variables d'environnement Render"
echo "2. Assurez-vous que la base de données Render est active et accessible"
echo "3. Vérifiez que l'URL contient bien le bon nom de base de données à la fin"
echo "4. Testez avec ce script en local avant de déployer"
