<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

Backend-Gestion-locative-Mada est un projet backend de gestion locative conçu pour faciliter la gestion des biens immobiliers à Madagascar.

## Fonctionnalités

1. **Gestion des Biens Immobiliers** :
   * Ajout de Biens
   * Édition de Biens
   * Suppression de Biens
2. **Gestion des Locataires** :
   * Ajout de Locataires
   * Édition de Locataires
   * Suppression de Locataires
3. **Envoi de Factures Mensuelles** :
   * Envoi automatique des factures de loyer aux Locataires
   * Envoi automatique des factures de loyer aux Propriétaires

## Technologies

1. **Nest.js** : Il s'agit d'un framework de développement d'applications Node.js, construit avec TypeScript. Il est basé sur des principes de modularité et de réutilisabilité de code.
2. **PostgreSQL** : C'est un système de gestion de base de données relationnelle (SGBDR) open source très puissant et robuste
3. **Nodemailer** : C'est une bibliothèque Node.js permettant d'envoyer des e-mails depuis une application Node.

## Voici le MCD et le MLD du projet

![UML](image/1697399332332.png)

![MLD](image/1697399589860.png)

## Installations

```
$ yarn install
```

## Running the app

```
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

[circleci-url]: https://circleci.com/gh/nestjs/nest
