#!/bin/bash

echo "🧹 Nettoyage des fichiers Zone.Identifier"
echo "========================================"

# Compter le nombre de fichiers Zone.Identifier
count=$(find . -name "*:Zone.Identifier" -type f | wc -l)

if [ $count -eq 0 ]; then
    echo "✅ Aucun fichier Zone.Identifier trouvé."
    exit 0
fi

echo "📊 Nombre de fichiers Zone.Identifier trouvés: $count"
echo ""
echo "📝 Liste des fichiers qui seront supprimés:"
find . -name "*:Zone.Identifier" -type f

echo ""
read -p "❓ Voulez-vous supprimer ces fichiers? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Suppression en cours..."
    
    # Supprimer tous les fichiers Zone.Identifier
    find . -name "*:Zone.Identifier" -type f -delete
    
    # Vérifier que la suppression a réussi
    remaining=$(find . -name "*:Zone.Identifier" -type f | wc -l)
    
    if [ $remaining -eq 0 ]; then
        echo "✅ Tous les fichiers Zone.Identifier ont été supprimés avec succès!"
    else
        echo "⚠️  $remaining fichiers n'ont pas pu être supprimés."
        echo "📝 Fichiers restants:"
        find . -name "*:Zone.Identifier" -type f
    fi
else
    echo "❌ Suppression annulée."
fi

echo ""
echo "✨ Nettoyage terminé!"
