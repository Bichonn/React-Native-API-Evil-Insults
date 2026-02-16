# 😈 Evil Insult Generator

## Thème de l'application

Une application mobile humoristique permettant de générer, consulter et gérer des insultes aléatoires. L'application utilise l'API **Evil Insult** pour récupérer des insultes générées aléatoirement et offre la possibilité de sauvegarder ses favorites ou de créer ses propres insultes personnalisées.

## Objectif de l'application

L'objectif est de proposer une expérience divertissante autour de l'humour noir et des insultes créatives. L'application permet de :

- 🎲 **Générer** des insultes aléatoires via l'API Evil Insult
- 📜 **Parcourir** une liste d'insultes avec chargement infini (infinite scroll)
- 🔍 **Consulter** les détails d'une insulte (auteur, date de création, nombre de vues)
- ⭐ **Sauvegarder** ses insultes favorites dans Firebase
- 🔃 **Trier** ses favoris par nombre de vues (croissant/décroissant)
- ✏️ **Créer, modifier et supprimer** ses propres insultes personnalisées

## Technologies utilisées

| Technologie | Utilisation |
|-------------|-------------|
| **React Native** | Framework mobile cross-platform |
| **Expo** | SDK et outils de développement |
| **Firebase Firestore** | Base de données NoSQL pour la persistence |
| **React Navigation** | Navigation entre les écrans (Stack Navigator) |
| **Expo Haptics** | Retour haptique pour améliorer l'UX |
| **Evil Insult API** | Source des insultes aléatoires |

## Choix UI / UX

### 🎨 Palette de couleurs sombre
- **Fond principal** : `#2c3e50` (bleu-gris foncé) - Réduit la fatigue oculaire et donne un aspect "mischievous"
- **Éléments secondaires** : `#34495e` - Crée de la profondeur avec les cards
- **Accent rouge** : `#e74c3c` - Évoque le danger/malice, cohérent avec le thème "evil"
- **Texte clair** : `#ecf0f1` - Contraste pour la lisibilité

### 📱 Expérience utilisateur
- **Retour haptique (Haptics)** : Feedback tactile lors des actions importantes (ajout/suppression de favoris) pour confirmer les interactions
- **Infinite scroll** : Chargement progressif des insultes pour éviter d'attendre
- **Tri par vues** : Possibilité de trier les favoris par nombre de vues (croissant/décroissant)
- **Indicateurs de chargement** : ActivityIndicator visible pendant les requêtes API
- **Alertes de confirmation** : Demande de validation avant les suppressions pour éviter les erreurs
- **Bouton de retour personnalisé** : Navigation cohérente et accessible

### 🏗️ Architecture des composants
- **Composants réutilisables** : `CustomButton`, `BackButton`, `InsultItem`, `InsultModal` pour éviter la duplication
- **Séparation des responsabilités** : Services API isolés, configuration Firebase centralisée

## Structure du projet

```
├── App.js                    # Point d'entrée, configuration navigation
├── fire.js                   # Configuration Firebase et fonctions CRUD
├── services/
│   └── api.js                # Appels à l'API Evil Insult
├── screens/
│   ├── HomeScreen.js         # Écran d'accueil
│   ├── ListScreen.js         # Liste des insultes avec infinite scroll
│   ├── DetailScreen.js       # Détails d'une insulte
│   ├── FavorisScreen.js      # Gestion des favoris
│   └── MyInsultsScreen.js    # CRUD insultes personnelles
├── components/
│   ├── BackButton.js         # Bouton de retour
│   ├── CustomButton.js       # Bouton stylisé réutilisable
│   ├── InsultItem.js         # Affichage d'une insulte en liste
│   ├── InsultModal.js        # Modal création/édition
│   └── RandomInsultGenerator.js  # Générateur d'insulte aléatoire
```

## Difficultés rencontrées

### 🔄 Gestion du chargement infini
- **Problème** : Éviter les doublons lors du chargement de nouvelles insultes et gérer les appels multiples simultanés
- **Solution** : Utilisation d'un `useRef` pour suivre l'état de chargement et filtrage des insultes déjà présentes

### ⏱️ Temps de réponse API
- **Problème** : L'API Evil Insult peut parfois renvoyer des insultes en double
- **Solution** : Implémentation d'une boucle avec maximum d'essais et vérification des doublons

## Pistes d'évolution

### 📱 Fonctionnalités
- [ ] **Multi-langue** : Supporter d'autres langues disponibles dans l'API (fr, de, es...)
- [ ] **Partage** : Permettre de partager une insulte sur les réseaux sociaux
- [ ] **Notifications** : Insulte du jour en notification push
- [ ] **Authentification** : Login pour synchroniser les favoris entre appareils

### 🎨 UI/UX
- [ ] **Mode clair** : Option de thème clair pour les utilisateurs qui préfèrent
- [ ] **Catégories** : Organiser les insultes en thématiques

### 🔧 Technique
- [ ] **Tests unitaires** : Couverture avec Jest
- [ ] **TypeScript** : Migration pour un typage statique
- [ ] **Cache local** : AsyncStorage pour mode offline
- [ ] **CI/CD** : Déploiement automatisé avec EAS Build

## Installation et lancement

```bash
# Cloner le projet
git clone <https://github.com/Bichonn/React-Native-API-Evil-Insults>

# Installer les dépendances
npm install

# Lancer l'application
npx expo start
```

## API utilisée

**Evil Insult API** : https://evilinsult.com/api/

Endpoint principal :
```
GET https://evilinsult.com/generate_insult.php?lang=fr&type=json
```

## Auteur

Projet réalisé dans le cadre du module React Native - B3