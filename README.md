# Ory Marketing Website

https://github.com/ory-corp/marketing/projects/10

## Aim and goal

Provide a website and CMS for the marketing purposes of Ory Corp.

## Architecture

* NextJS compiles the code to a static website
* Vercel is used for hosting
* Tina CMS is used to edit the content and some site wide settings

When using Tina, a GraphQL server is spawned on port `4001` and NextJS can use it to query the data (e.g. create pages).

In order for the CMS to work correctly with the cloud interface / API, the content of the
[`.tina/__generated__`](./.tina/__generated__/) must be managed by Git and up-to-date (`npm run build:tina`). 

## CMS users

The managment of the user can be done on https://app.tina.io/users.

## Scripts

When you use the `npm start` command, the following scripts are run (in parallel):

* Tina CMS for local development, which starts
  * NextJS dev (`npx next dev`)
* Storybook in development mode (`npm run start:storybook`)

## Development

In local development, credentials are not needed to access the local CMS server.

The https://tina-gql-playground.vercel.app/ has a lot of useful examples for the Tina GraphQL API and their usage.

## Environment variables

See [`.env.example`](./.env.example)