# 🚀 Configuration rapide pour Render

## 🎯 Variables d'environnement à configurer dans le dashboard Render

Allez dans votre service Render → **Environment** et ajoutez :

```bash
# Base de données
DATABASE_URL=postgresql://marketplace_db_qgvb_user:WToQLLnZ6wgBevVGnEvNkBBF7dRdjHDf@dpg-d15o6t8dl3ps7380bppg-a.frankfurt-postgres.render.com/marketplace_db_qgvb

# Application
NODE_ENV=production
PORT=10000

# Sécurité
JWT_SECRET=changez-moi-par-un-secret-tres-securise-en-production

# Stripe
STRIPE_SECRET_KEY=sk_test_51Qm0WHCA9knPbVsZV3Jk2uT9CwO9XxggFei9BTMt5nxi7HilISXmTsMFtGnQibrVH0XaLnsyI1uaXuW1Z9zASOqI00OmIaqEny

# URLs (remplacez "marketplace-fullstack" par le nom de votre service Render)
FRONTEND_URL=https://test-hjc1.onrender.com
CORS_ORIGIN=https://test-hjc1.onrender.com
```

## 🌍 Architecture de déploiement

```
https://votre-app.onrender.com
├── / → Frontend Angular (fichiers statiques)
├── /api/* → Backend NestJS (API REST)
└── /api → Health check Render
```

## ✅ Avantages de cette configuration

1. **Simplicité** : Un seul domaine pour tout
2. **Sécurité** : Pas de problèmes CORS complexes
3. **Performance** : Moins de latence réseau
4. **Coût** : Un seul service Render à payer

## 🔧 Notes importantes

- Le frontend Angular est servi en tant que fichiers statiques
- L'API est accessible via `/api/*`
- Toutes les routes non-API redirigent vers `index.html` (SPA routing)
- CORS configuré pour accepter uniquement votre domaine Render

## 🚨 N'oubliez pas

1. Remplacez `marketplace-fullstack` par le vrai nom de votre service Render
2. Changez le `JWT_SECRET` en production
3. Vérifiez que votre base PostgreSQL est active sur Render
