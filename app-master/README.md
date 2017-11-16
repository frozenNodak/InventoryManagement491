# UND Inventory Management System

### Working with Mobile App
Global packages required:
* [NodeJS](http://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Cordova](https://cordova.apache.org/)
* [Ionic](http://ionicframework.com/)
* [Bower](http://bower.io/)
* [Grunt](http://gruntjs.com/)
* [grunt-cli](https://github.com/gruntjs/grunt-cli)
```
npm install -g cordova ionic grunt grunt-cli
```
Clone the repository
```
git clone git@github.com:UND-CSCI-Capstone-EC-RD-LT/app.git
cd app
```
### Building the Mobile App
Run mobile app in web browser
```
npm run web
```
You will want to have two bashes open, one for grunt watch and another for npm run web.

Run grunt watch to watch the js and css files for changes to rebuild
```
grunt watch
```
Build production version

**Windows can only build Android and Mac can build Android and iOS**
```
npm run build-production-windows
or
npm run build-production-mac
```
Build development version

**Windows can only build Android and Mac can build Android and iOS**
```
npm run build-dev-windows
or
npm run build-dev-mac
```
