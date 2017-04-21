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
```bash
$ yarn add @angular/material
```

## Adding Express
> Angular CLI comes with a command `ng build`, which bundles your angular app into a dist folder, or a folder that you may specify in the `angular-cli.json` file. This is what our express app will point to.

Install express and body-parser as dependecies.
```bash
$ yarn add express body-parser
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


## Create a new repository on the command line
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
