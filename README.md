ttTime - simple time management app.
====

Introduction
----
The app allows users to log in and in their personal space add multiple work entries for days they worked.
It also helps to track their daily goals in minimum working hours. 
Preferred daily working hours can be set on Settings page. (Wrench icon).
There is also a summary page which groups work by date and allows filtering.

Other features:
  - Filter work entries by date
  - Printer friendly - prints only what matters
  - Mobile friendly - app is responsive on smaller screens

Architecture
----

The app is built with MEAN stack (MongoDB, Express, AngularJS, Node.js). 
The seed project was genereated with angular-fullstack yeoman generator which is a great starting point for ensuring best coding practices held on the project and for making production ready builds with one command.

Client side uses angular.js framework for data bindings, routing, and code modularization and twitter bootstrap for layout and additional components.

Server side runs with Node.js and Express framework which makes creation of REST endpoints very easy. MongoDB mappings are handled by Mongoose framework. User authentication is backed by Passport framework using local strategy

Running the project
----
To run the app:

>1. make sure you have installed node.js
>2. run in commandline **npm install -g grunt**
>3. run in commandline **npm install -g bower**
>4. go to project folder and run **grunt serve** (in development mode) or **grunt serve:dist**

ttTime app can be accessed online at:
http://ec2-54-153-156-214.ap-southeast-2.compute.amazonaws.com/
