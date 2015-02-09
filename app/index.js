'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var ZyncroGenerator = yeoman.generators.Base.extend({
    init: function () {


      var welcome =
        '\n     ╔═╗┬ ┬┌┐┌┌─┐┬─┐┌─┐  ╔═╗┌─┐┌┐┌┌─┐┬─┐┌─┐┌┬┐┌─┐┬─┐' +
        '\n     ╔═╝└┬┘││││  ├┬┘│ │  ║ ╦├┤ │││├┤ ├┬┘├─┤ │ │ │├┬┘' +
        '\n     ╚═╝ ┴ ┘└┘└─┘┴└─└─┘  ╚═╝└─┘┘└┘└─┘┴└─┴ ┴ ┴ └─┘┴└─' + ' \n';
      console.log(chalk.red(welcome));


var moduleDoc =
"\n .-----------------------------------------------------."+
"\n |                   Create a Module                   |"+
"\n |             yo zyncro:module 'moduleName'           |"+
"\n |                  Create a Component                 |"+
"\n |          yo zyncro:component 'componentName'        |"+
"\n '-----------------------------------------------------'" + ' \n';
console.log(chalk.cyan(moduleDoc));




    }
});

module.exports = ZyncroGenerator;
