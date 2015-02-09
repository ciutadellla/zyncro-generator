'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var rootFolderSplit, insert, injectPath;
var file;
var moduleDoc =
"\n .-----------------------------------------------------."+
"\n |               Create a component                    |"+
"\n '-----------------------------------------------------'" + ' \n';
console.log(chalk.cyan(moduleDoc));


var ModuleGenerator = yeoman.generators.NamedBase.extend({
//    camelModuleName: '',
//    capitalModuleName: '',
//    lowerModuleName: '',
init: function () {
  console.log('Creando componente - ' + this.name);
},
askFor: function () {
  var done = this.async();
    //PROMTS
    var prompts = [
    {
      name: 'rootFolder',
      message: '¿Donde quieres crear el '+ chalk.bold.red('Componente') + ' - cual es la ruta?',
      default: 'app/components'
    },
    {
      type: 'confirm',
      name: 'includeView',
      message: '¿Una ' + chalk.bold.red('View') + ' para el Componente?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeFilter',
      message: '¿Un ' + chalk.bold.red('Filtro') + ' para el Componente?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeDirective',
      message: '¿Una ' + chalk.bold.red('Directive') + ' para el Componente?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeService',
      message: '¿Un ' + chalk.bold.red('Service') + ' para el Componente?',
      default: true
    },
    // {
    //   type: 'confirm',
    //   name: 'includeController',
    //   message: '¿Un ' + chalk.bold.red('Controlador') + ' para el Componente?',
    //   default: true
    // },
    {
      type: 'confirm',
      name: 'includeUnit',
      message: '¿Un '+ chalk.bold.red('Unit Test') + ' para el Componente?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeDependencies',
      message: '¿Inyectar '+ chalk.bold.red('dependencia en app.js') + ' para el Componente?',
      default: true
    }



    ];
    //Register PROMTS
    this.prompt(prompts, function (props) {
      this.rootFolder = props.rootFolder;

      this.includeUnit = props.includeUnit;
      this.includeFilter = props.includeFilter;
      // this.includeController = props.includeController;
      this.includeView = props.includeView;
      this.includeDirective = props.includeDirective;
      this.includeDependencies = props.includeDependencies;
      this.includeService = props.includeService;


      done();
    }.bind(this));

  },

  files: function () {
    this.projectName = this.config.get('projectName');
    this.camelModuleName = this._.camelize(this.name);
    this.capitalModuleName = this._.capitalize(this.name);
    this.lowerModuleName = this.name.toLowerCase();



    var modulePath = path.join(this.rootFolder, this.camelModuleName);
    this.mkdir(modulePath);


    this.rootFolderSplit = this.rootFolder.split("/");

    this.rootFolderSlash = this.rootFolder.split('/').join('.');

    this.statePath = this.rootFolderSlash.split('app.').join('');

    this.count = this.rootFolderSplit.length-1;

    this.caca = false;

    if(this.count == 0){
      insert = ",\n    '" + this.projectName + "." + this.camelModuleName + "'\n";
      this.insertDep = this.projectName + "." + this.camelModuleName ;
      this.stateUrl =  this.lowerModuleName;
      this.insertDepSlash = this.camelModuleName;

    }else{
      insert = ",\n    '" + this.projectName + "." + this.camelModuleName + "'\n";
      this.insertDep = this.projectName + "." + this.statePath + "." + this.camelModuleName;
      this.stateUrl =  this.statePath.split('.').join('/') + "/" + this.camelModuleName;
      this.insertDepSlash = this.camelModuleName ;
    };



    //Module
    injectPath = path.join(modulePath, this.camelModuleName + '.js');
    this.template('_module.js', injectPath);

    //Test
    if (this.includeUnit) {
      this.template('_moduleSpec.js', path.join(modulePath, this.camelModuleName + '.spec.js'));
    }
   //View
   if (this.includeView) {
    this.template('_moduleHtml.tpl.html', path.join(modulePath, this.camelModuleName + '.tpl.html'));
    this.template('_module.scss', path.join(modulePath, this.camelModuleName + '.scss'));
  }

   //Inject dependencies
   if (this.includeDependencies) {
      this._addModuleToAppJs(this.projectName, this.camelModuleName, this.lowerModuleName);
  }


},

touchIndexHtml: function() {
        // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new module to the scripts)
        var indexHtmlFilePath = 'app/index.html';
        touch(indexHtmlFilePath, {mtime: true});



      },



    _addModuleToAppJs: function app(projectName, camelModuleName, lowerModuleName) {
        var hook   = '\n])));',
            hook2   = '])));',
            path   = 'app/app.js';
        var file   = this.readFileAsString(path);
        if (file.indexOf(insert) === -1) {
            this.write(path, file.replace(hook, insert + hook2));
        }
    }


      // _addModuleToAppJs: function app(projectName, camelModuleName, lowerModuleName, insertDep, insertDepSlash, stateUrl, includeFilter, includeDirective) {
      //   // var file  = this.readFileAsString(injectPath);
      //   // if (file.indexOf(insert) === -1) {
      //   //   this.write(injectPath, file.replace('@@hook@@', 'hookReplaced'));
      //   // }
      // }

    });

module.exports = ModuleGenerator;
