# Shopify App Exploration for Error Handling

This app is for exploration and is initially based on the boilerplate provided [here](https://github.com/kinngh/shopify-node-express-mongodb-app) by [kinngh](https://twitter.com/kinngh). kinngh has also been invaluable with advice and guidance as I've sought to understand this space a bit more. Give him a follow!

# Aim

The aim of this repo is to provide a working Shopify application that you can add to your own development store to help explore error handling in JavaScript.

There are lots of ways that errors may occur and some may not be down to your code. They may instead be down to configuration problems. 

# Architecture

This app is made up of two parts:
- An Express server which can carry out authenticated operations with the Shopify API 
- A React application that will be embedded into a Shopify store

During development, you will run the Express server locally and serve your React application locally. This will be exposed to the world through ngrok.

## Tech Stack

- React.js
  - `raviger` for routing.
- Express.js
- MongoDB
- Vite
- Ngrok

## Setup

- Add all of the .env variables you can
- Run `ngrok http 5173`
- Copy the url that ngrok provides and add it to .env
- Run `npm run update:url`
- Start the app 