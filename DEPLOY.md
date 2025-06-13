# Guide de déploiement sur Render

Ce guide vous explique comment déployer votre application full-stack (Angular + NestJS) sur Render.

## 📋 Prérequis

1. Compte GitHub avec votre code pushé
2. Compte Render (gratuit pour commencer)
3. Base de données PostgreSQL (Render propose un service PostgreSQL gratuit)

## 🚀 Étapes de déploiement

### 1. Configuration de la base de données

1. Connectez-vous à [Render](https://render.com)
2. Cliquez sur "New +" → "PostgreSQL"
3. Donnez un nom à votre base de données
4. Choisissez la région (Oregon recommandé)
5. Sélectionnez le plan gratuit
6. Cliquez sur "Create Database"
7. Notez l'URL de connexion fournie

### 2. Configuration du service web

1. Cliquez sur "New +" → "Web Service"
2. Connectez votre repository GitHub
3. Sélectionnez votre repository
4. Configurez le service :
   - **Name**: `votre-app-name`
   - **Runtime**: `Docker`
   - **Region**: Oregon (ou votre préférence)
   - **Branch**: `main` (ou votre branche de production)
   - **Dockerfile Path**: `./Dockerfile`

### 3. Variables d'environnement

Dans l'onglet "Environment", ajoutez ces variables :

```
NODE_ENV=production
PORT=10000
DATABASE_URL=<votre-url-de-db-depuis-render>
JWT_SECRET=<votre-secret-jwt-secure>
```

Ajoutez aussi vos autres variables selon `.env.example`.

### 4. Déploiement

1. Cliquez sur "Create Web Service"
2. Render va automatiquement construire et déployer votre application
3. Le processus peut prendre 5-10 minutes

## 🔧 Configuration automatique

Le fichier `render.yaml` à la racine permet un déploiement automatique :

1. Modifiez le `repo` dans `render.yaml` avec votre URL GitHub
2. Commitez et pushez le fichier
3. Dans Render, utilisez "New +" → "Blueprint" et sélectionnez votre repo

## 🧪 Test local

Avant de déployer, testez localement avec Docker :

```bash
./deploy-test.sh
```

Ou manuellement :

```bash
docker build -t marketplace-app .
docker run -p 3000:3000 marketplace-app
```

## 📊 Monitoring

- Les logs sont disponibles dans l'onglet "Logs" de votre service Render
- Les métriques sont dans l'onglet "Metrics" 
- Configurez des alertes si nécessaire

## 🔄 Déploiement automatique

Render redéploie automatiquement à chaque push sur votre branche configurée.

## 🆘 Dépannage

### Erreurs communes :

1. **Build fails** : Vérifiez les logs de build, souvent des dépendances manquantes
2. **Database connection** : Vérifiez l'URL de la base de données
3. **Port issues** : Render utilise la variable `PORT`, pas un port fixe
4. **CORS errors** : Configurez CORS pour votre domaine Render

### Commandes utiles :

```bash
# Voir les logs de build
docker build -t test-app .

# Tester localement avec les mêmes variables d'environnement
docker run -p 3000:3000 -e NODE_ENV=production test-app
```

## 📝 Notes importantes

- Le plan gratuit de Render a des limitations (750h/mois, sleep après inactivité)
- La base de données gratuite expire après 90 jours
- Pour la production, considérez les plans payants pour de meilleures performances
