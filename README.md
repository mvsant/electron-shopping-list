# Electron shopping list

A project based on original Traversy tutorial, By the time it was made, this project will try to use the modern bundler creator for Electron.

## Dependencies
- Node
- Materialize CDN (or any styleing tool if you want)
- Electron (Duh!?)
- Electron-packager (better than default electron-forge)

## Creation Command

    npx create-electron-app app-name

## Build process

To start after clone:

    npm i 
To run the app:

    npm start
__Note:__ You need to change the environment variable to development inside index.js file, in the line below:

    process.env.NODE_ENV = 'production';
To create the application outputs:

    npm run package-mac

    npm run package-win

    npm run package-linux

*Watch carefully the package.json to change the windows app name and app description before make the build*

## Original source

[Build an Electron App in Under 60 Minutes](https://www.youtube.com/watch?v=kN1Czs0m1SU&t=302s)