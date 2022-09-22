# Recipes

## About

This application is designed to show off a list of recipes. That's it really. Obviously it's possible to bookmark the recipes you like, but creating `.md` versions allows us to:

1. Skip preamble (generally required for SEO, so it's not entirely the writer's fault)
2. Modify recipes for your own tastes and needs
3. Add notes for yourself
4. Add your own photos of your completed recipes
5. Avoid the recipes disappearing, i.e. if they're from reddit or something
6. Skip ads/ auto-playing videos

## Getting Started

NOTE: Do _not_ run `npm update` as the latest version of Keystone seems to have issues around multiple installations of GraphQL between different Keystone packages.

1. Copy `.env.boilerplate` and rename the copied file to `.env`, fill in the values.
2. Install: `npm ci`
3. Run dev environment with: `npm run dev`
4. Go to the [CMS URL](http://localhost:8000)
5. Create an admin account (note, this is only for your dev environment, you'll have to do this again if you deploy somewhere since you should gitignore the db)
