# Notes

Single page app for managing daily notes. Built with [Angular](https://angular.io/) and [Firebase](https://firebase.google.com/)

## Get started

Install all required packages with `npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

Include `--port= ` to use different port number. Include `--liveReload=false` to disable live-reload the page on change. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deployment

Firebase Hosting uses for hosting the app.

### Building the Production Code

Run `ng build --prod`

### Deploying to Firebase

First, make sure you have the firebase tools package installed.

`npm install -g firebase-tools`

Second, log into your existing firebase account

`firebase login`

Third, initialize the project

`firebase init`

For the most part, you can stick with the default settings, except for the following questions:
 1. Choose hosting on the first question.
 2. Change public folder to dist/notes when asked (it defaults to public).
 3. Configure as single page app? - Yes
 4. If firebase asks to overwrite your index.html file, just say NO.

### Deploy

`firebase deploy`

### Continuous integration

Auto deploy to Firebase Hosting is enabled for `master` branch.
After each pull request `travis` executes build and deploy
