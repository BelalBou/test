#!/bin/bash

echo "🚀 Script de déploiement automatique sur Render"
echo "==============================================="

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher des messages colorés
log_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier si on est dans un repo git
if [ ! -d ".git" ]; then
    log_error "Ce n'est pas un repository Git. Initialisez d'abord avec 'git init'."
    exit 1
fi

log_info "Vérification du statut Git..."

# Afficher le statut
git status --short

echo ""
read -p "❓ Voulez-vous commiter et pousser ces changements? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    
    # Ajouter tous les fichiers
    log_info "Ajout de tous les fichiers modifiés..."
    git add .
    
    # Message de commit avec timestamp
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    COMMIT_MSG="🔧 Fix path-to-regexp error and optimize deployment - $TIMESTAMP"
    
    # Commiter
    log_info "Commit avec le message: $COMMIT_MSG"
    git commit -m "$COMMIT_MSG"
    
    if [ $? -eq 0 ]; then
        log_info "Commit réussi!"
        
        # Pousser vers la branche courante
        CURRENT_BRANCH=$(git branch --show-current)
        log_info "Push vers la branche: $CURRENT_BRANCH"
        
        git push origin $CURRENT_BRANCH
        
        if [ $? -eq 0 ]; then
            log_info "Push réussi!"
            echo ""
            log_info "🎉 Déploiement lancé sur Render!"
            log_warning "Surveillez les logs sur: https://dashboard.render.com"
            log_warning "Votre app sera disponible sur: https://test-hjc1.onrender.com"
        else
            log_error "Erreur lors du push. Vérifiez votre configuration Git."
        fi
    else
        log_error "Erreur lors du commit."
    fi
else
    log_warning "Déploiement annulé."
fi

echo ""
echo "✨ Script terminé!"
