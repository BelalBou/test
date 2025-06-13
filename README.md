Ce projet vise à développer une plateforme web de type **marketplace locale**, dédiée à la vente de produits artisanaux et locaux, dans une logique de circuits courts.

## 🌱 Objectifs

- Soutenir les producteurs locaux et les artisans de proximité
- Offrir aux clients une vitrine numérique avec un parcours d’achat simplifié
- Créer un espace de gestion pour les vendeurs
- Intégrer un système de paiement sécurisé

## ⚙️ Technologies utilisées

- **Frontend** : Angular
- **Backend** : NestJS (Node.js)
- **Base de données** : PostgreSQL
- **Paiement** : Stripe API
- **Notifications** : SendGrid (e-mail), Firebase (push notifications)

## 🚀 Lancer le projet en local

1. Cloner le dépôt :

   ```bash
   git clone https://gitlab.com/ton-nom-utilisateur/marketplace-local.git
   cd marketplace-local

   ```

2. Installer les dépendances côté frontend et backend :

   cd frontend
   npm install

   cd ../backend
   npm install

3. Lancer le frontend :

   npm run start

4. Lancer le backend :

   npm run start:dev

5. Assurez-vous d’avoir une base PostgreSQL locale configurée et un fichier .env dans le dossier backend.
