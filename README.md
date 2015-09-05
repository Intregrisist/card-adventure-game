
Adventure Card Game
===================


----------


**Author:** Daniel Flores


# Overview #

This project was started as a fun exercise to display and practice a wide arrange of skills and at the same time build a fun entertaining game.  Adventure Card game will make use of **AngularJS**  for the client app and **NodeJS** for the server app.

# Progress #

This project will develop over time, check periodically for updates to follow the project's development. 

# Stack #
----------
 - [AngularJS](http://www.angularjs.org/)
 - [Twitter's Bootstrap 4](http://v4-alpha.getbootstrap.com/) - yup, that's right!
 - [NodeJS](http://nodejs.org/) - Coming Soon
 - [MySQL](https://www.mysql.com/) - Coming Soon

## Build ##
 - powered by [Grunt](http://gruntjs.com/)
 - dependencies managed by [Bower](http://bower.io/)
 - build supports JS, [Sass](http://sass-lang.com/), and Angular JS template minification.
 - tests - Coming Soon

# Installation #
----------
# Tools #
In order to get started, you will need a few tools.  First you will need to install [NodeJS](http://nodejs.org/) and then the development tool required to build the application.  We will use NodeJS's [npm](http://npmjs.org/) to install the development tools.

 1. Install [NodeJS](http://nodejs.org/)
 2. Install Grunt-CLI and Bower as global npm modules:

```
$ npm install -g grunt-cli bower
```

# Client App #

The client app will be using **AngularJS** and a custom framework.  The goal here will be to figure out an easy to manage structure for this growing application.

## Dependencies ##
Before we build our application, we must first download the application dependencies by using [Bower](http://bower.io/).  To do so, run the following commands from the root folder of the application:

```
$ cd client
$ bower install
$ cd ../
```

## Build ##
To build the client application you must use [Grunt](http://gruntjs.com/) to build the application.  Open your terminal and navigate to the root of folder of the application.  Then run the following commands:

```
$ cd client
$ grunt build
$ cd ../
```

# Server App #

We eventually want to make this game be an online multiplayer game, so we will be creating a **NodeJS** server and making use of **Socket.IO** to make our game rooms.
