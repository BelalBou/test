# 🔧 Guide de dépannage - Problèmes de base de données sur Render

## 🚨 Problèmes identifiés

1. **Mot de passe de BD undefined** → Configuration des variables d'environnement
2. **Connexion refusée** → Configuration SSL et URL de base de données
3. **Tables non créées** → Synchronisation TypeORM

## ✅ Solutions appliquées

### 1. Configuration de la base de données

- ✅ Support de `DATABASE_URL` pour Render (production)
- ✅ Variables individuelles pour développement local
- ✅ Configuration SSL pour Render
- ✅ Logs améliorés pour déboguer

### 2. Variables d'environnement Render à configurer

Dans le dashboard Render, ajoutez ces variables d'environnement :

```
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://marketplace_db_qgvb_user:WToQLLnZ6wgBevVGnEvNkBBF7dRdjHDf@dpg-d15o6t8dl3ps7380bppg-a.frankfurt-postgres.render.com/marketplace_db_qgvb
JWT_SECRET=un-secret-jwt-tres-securise-changez-moi
STRIPE_SECRET_KEY=sk_test_51Qm0WHCA9knPbVsZV3Jk2uT9CwO9XxggFei9BTMt5nxi7HilISXmTsMFtGnQibrVH0XaLnsyI1uaXuW1Z9zASOqI00OmIaqEny
```

### 3. Vérifications importantes

#### Sur Render :
1. **Base de données active** : Vérifiez que votre base PostgreSQL Render est bien active
2. **Région cohérente** : Votre service web et votre BD sont en région Frankfurt
3. **URL complète** : L'URL doit finir par `/marketplace_db_qgvb` (pas `/marketplace_db_qgvby`)

#### Localement :
```bash
# Testez la connexion
./test-db-connection.sh

# Construisez et testez l'image Docker
docker build -t marketplace-test .
docker run -p 3000:3000 --env-file backend/.env marketplace-test
```

## 🔍 Diagnostic des erreurs

### "Mot de passe utilisé : undefined"
- ❌ Les variables d'environnement ne sont pas chargées
- ✅ Vérifiez que `DATABASE_URL` est définie dans Render

### "Unable to connect to the database"
- ❌ URL de base de données incorrecte ou base inactive
- ✅ Vérifiez l'URL et l'état de la base sur render.com

### "No open ports detected"
- ❌ L'application n'écoute pas sur le bon port
- ✅ Vérifiez que `process.env.PORT` est utilisé (maintenant corrigé)

## 🚀 Étapes de redéploiement

1. **Commitez les modifications** :
   ```bash
   git add .
   git commit -m "Fix database configuration for Render"
   git push
   ```

2. **Redéployez sur Render** :
   - Le déploiement automatique se déclenche
   - Surveillez les logs de build et runtime

3. **Vérifiez les logs** :
   - Recherchez "Configuration de démarrage" dans les logs
   - Vérifiez que "Database URL définie: Oui"

## 📊 Logs attendus après correction

```
=== Configuration de démarrage ===
Environment: production
Port: 10000
Database URL définie: Oui
JWT Secret défini: Oui
Utilisation de DATABASE_URL pour la connexion
[TypeOrmModule] Successfully connected to the database
🚀 Application is running on http://0.0.0.0:10000
📝 API accessible sur: http://0.0.0.0:10000/api
```

## ⚠️ Points d'attention

1. **Synchronize: true** : Crée automatiquement les tables, mais à désactiver après la première migration
2. **SSL requis** : Render PostgreSQL nécessite SSL
3. **Région** : Utilisez Frankfurt pour minimiser la latence avec votre BD
4. **Secrets** : Changez le JWT_SECRET en production

## 🆘 Si ça ne marche toujours pas

1. Vérifiez l'état de votre base de données sur render.com
2. Testez la connexion avec psql :
   ```bash
   psql "postgresql://marketplace_db_qgvb_user:WToQLLnZ6wgBevVGnEvNkBBF7dRdjHDf@dpg-d15o6t8dl3ps7380bppg-a.frankfurt-postgres.render.com/marketplace_db_qgvb"
   ```
3. Vérifiez que l'URL se termine bien par `/marketplace_db_qgvb` et non `/marketplace_db_qgvby`
