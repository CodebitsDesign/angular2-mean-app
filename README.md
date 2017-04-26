# Setting up a MEAN App with Angular 2 and the Angular CLI
<https://scotch.io/tutorials/mean-app-with-angular-2-and-the-angular-cli>

> MEAN simply stands for MongoDB, ExpressJS, Angular and NodeJS

To explain the different parts,

- [MongoDB](https://www.mongodb.com/) usually acts as the database for your application, in case you need to persist data. It's where we store records.
- [ExpressJS](http://expressjs.com/) is a web framework for nodejs, usually used as a backend for web apps in the MEAN stack.
- [Angular](https://angular.io/) is usually the client side MVC web framework. In this case, we will be using Angular 2.*.
- [NodeJS](https://nodejs.org/en/) powers express, and will be the layer our server run on.

## Prerequisites
```bash
$ sudo npm install -g angular-cli
or, 
$ sudo yarn global add angular-cli
```

## Creating the Angular App
```bash
$ ng new angular2-mean-app --skip-npm
$ cd angular2-mean-app
$ yarn
```

To serve the app, simply run
```bash
$ ng serve
```
And open <http://localhost:4200> in your browser.

## Adding Angular Material
Material Design components for Angular apps
<https://material.angular.io/guide/getting-started>

Step 1: Install Angular Material
```bash
$ yarn add @angular/material
```
Step 2: Animations
Install the `@angular/animations` module and include the `BrowserAnimationsModule` in your app.
```bash
$ yarn add @angular/animations
```

```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

Step 3: Import the component modules
Import the NgModule for each component you want to use:
```typescript
import {MdButtonModule, MdCheckboxModule} from '@angular/material';

@NgModule({
  ...
  imports: [MdButtonModule, MdCheckboxModule],
  ...
})
export class PizzaPartyAppModule { }
```

Step 4: Include a theme
Including a theme is required to apply all of the core and theme styles to your application.

To get started with a prebuilt theme, include the following in your app's index.html:

```html
<link href="../node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet">
```

Step 5: Gesture Support
Some components (md-slide-toggle, md-slider, mdTooltip) rely on `HammerJS` for gestures. In order to get the full feature-set of these components, HammerJS must be loaded into the application.
```bash
$ yarn add hammerjs
```
After installing, import it on your app's root module.
```typescript
import 'hammerjs';
```

Step 6 (Optional): Add Material Icons
If you want to use the md-icon component with the official Material Design Icons, load the icon font in your index.html.
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```
[Material Icons Guide](https://google.github.io/material-design-icons/)


## Adding Express
> Angular CLI comes with a command `ng build`, which bundles your angular app into a dist folder, or a folder that you may specify in the `angular-cli.json` file. This is what our express app will point to.

Install `express` and `body-parser` as dependecies.
```bash
$ yarn add express body-parser
```

Then create a file `server.js` and a folder `server` in the root of our angular project.

in `~/Projects/angular2-mean-app/`
```bash
$ mkdir server
```
$ vim server.js
```javascript
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

```
> with an `/api` route and all other routes are directed towards the `dist/index.html` page. This catch all route, denoted with `*`, MUST come last after all other API routes have been defined.


The `/api` route points to a file `./server/routes/api.js`.
$ vim server/routes/api.js
```javascript
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;

```

Since the _catch all_ route is pointing to `dist/index.html`, we need to do a `build` of the angular app.
```bash
$ ng build
```
> This creates the `dist` folder with the angular 2 app built files. 

Now we can `serve` the app with express.
```bash
$ node server.js
```
> Going to `http://localhost:3000` should load the app, and `http://localhost:3000/api`

## Server data
[Easily Develop Node.js and MongoDB Apps with Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications)
> [mongoose](http://mongoosejs.com/) is an object modeling package for Node that essentially works like an ORM and allows us to have access to the MongoDB commands for CRUD simply and easily.

```bash
$ yarn add mongoose
```




## Using Git-Credentials Helper - providing usernames and passwords to Git
```bash
$ git config --global credential.helper store
$ git config --global credential.username <YOUR_GIT_NAME>
$ git config --global credential.useHttpPath true
```

$ vim ~/.git_credential_helper.rb
```
#!/usr/bin/env ruby
require 'open3'

USERNAME = 'computer_user_name'
ACCOUNTNAME = 'github_account_name'

command = "sudo -u #{USERNAME} /usr/bin/security -v find-internet-password -g -a #{ACCOUNTNAME} /Users/#{USERNAME}/Library/Keychains/login.keychain"

stdout_and_err = Open3.capture2e(command)
password =
 Array(stdout_and_err)
   .first
   .split("\n")
   .select { |x| x.start_with?("password") }
   .first
puts password.match(/\Apassword\: "(.*)"/).captures.first

```

```bash
$ chmod +x ~/.git_credential_helper.rb
$ git config --global core.askPass ~/.git_credential_helper.rb

$ git config --global \
  credential.https://github.com/CodebitsDesign/angular2-mean-app.username \
  <Github_Username>
```

## Publish this local project on GitHub using command line
Step 1. [Create a new repository](https://help.github.com/articles/creating-a-new-repository/) on GitHub. To avoid errors, do not initialize the new repository with `README`, `license`, or `gitignore` files. 
```
Repository name: angular4-material-frontend
```

Step 2. Open Terminal and change the current working directory to your local project. 
Then process git commands:

```bash
$ echo "# angular2-mean-app" >> README.md
$ git init
$ git add README.md
$ git commit -m "first commit"
$ git remote add origin https://github.com/CodebitsDesign/angular2-mean-app.git
$ git push -u origin master
```

…or push an existing repository from the command line
```bash
$ git remote add origin https://github.com/CodebitsDesign/angular2-mean-app.git
$ git push -u origin master
```
> If you use `-u` in the command, it will remember your preferences for remote and branch and you can simply use the command `git push` next time.


-----------------------------

# Angular2MeanApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
