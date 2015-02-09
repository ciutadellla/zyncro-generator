'use strict';
var util = require('util');
var path = require('path');
var touch = require("touch");
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var rootFolderSplit, insert, injectPath;

var moduleDoc =
"\n .-----------------------------------------------------."+
"\n |                 Create a Module                     |"+
"\n |                 app/parentModule                    |"+
"\n |               Create a childModule                  |"+
"\n |                 app/parentModule                    |"+
"\n '-----------------------------------------------------'" + ' \n';
console.log(chalk.cyan(moduleDoc));


var ModuleGenerator = yeoman.generators.NamedBase.extend({
//    camelModuleName: '',
//    capitalModuleName: '',
//    lowerModuleName: '',
init: function () {
  console.log('Creando módulo - ' + this.name);
},
askFor: function () {
  var done = this.async();
    //PROMTS
    var prompts = [
    {
      name: 'rootFolder',
      message: '¿Donde quieres crear el '+ chalk.bold.red('Módulo') + ' - cual es la ruta?',
      default: 'app'
    },
    {
      type: 'confirm',
      name: 'includeRest',
      message: '¿Quieres incluir un '+ chalk.bold.red('Servicio') + ' para el módulo?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeView',
      message: '¿Una ' + chalk.bold.red('View') + ' para el módulo?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeUnit',
      message: '¿Un '+ chalk.bold.red('Unit Test') + ' para el módulo?',
      default: true
    }
    ];
    //Register PROMTS
    this.prompt(prompts, function (props) {
      this.rootFolder = props.rootFolder;
      this.includeUnit = props.includeUnit;
      this.includeRest = props.includeRest;
      this.includeFilter = props.includeFilter;
      this.includeController = props.includeController;
      this.includeView = props.includeView;
      this.includeDirective = props.includeDirective;

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



    if(this.count == 0){

      injectPath   = 'app/app.js',
      insert = ",\n    '" + this.projectName + "." + this.camelModuleName + "'\n";

      this.insertDep = this.projectName + "." + this.camelModuleName ;
      this.stateUrl =  this.lowerModuleName; 
      this.insertDepSlash = this.camelModuleName;

    }else{

      injectPath = this.rootFolder + "/" + this.rootFolderSplit[this.rootFolderSplit.length-1] + '.js';
      insert = ",\n    '" + this.projectName + "." + this.statePath + "." + this.camelModuleName + "'\n";

      this.insertDep = this.projectName + "." + this.statePath + "." + this.camelModuleName;
      this.stateUrl =  this.statePath.split('.').join('/') + "/" + this.camelModuleName;
      this.insertDepSlash = this.camelModuleName ;
    };


/*        this.log(chalk.magenta("this.insertDepSlash::" + this.insertDepSlash));
        this.log(chalk.red('this.count::'+ this.count ));
        this.log(chalk.red('Split::'+ this.rootFolderSplit));
        this.log(chalk.red('last item ::'+ this.rootFolderSplit[this.count] ));
        this.log(chalk.cyan('this.camelModuleName ::'+ this.camelModuleName ));


        this.log(chalk.red('this.rootFolder::'+ this.rootFolder));
        this.log(chalk.cyan('this.statePath ::'+ this.statePath ));
        this.log(chalk.cyan('this.stateUrl ::'+ this.stateUrl ));*/

        
    //Module
    this.template('_module.js', path.join(modulePath, this.camelModuleName + '.js'));
    //Test
    if (this.includeUnit) {
      //Spec
      this.template('_moduleSpec.js', path.join(modulePath, this.camelModuleName + '.spec.js'));
    }
    //View
    if (this.includeView) {
      this.template('_moduleHtml.tpl.html', path.join(modulePath, this.camelModuleName + '.tpl.html'));
      this.template('_module.scss', path.join(modulePath, this.camelModuleName + '.scss'));
    }


    this._addModuleToAppJs(this.projectName, this.camelModuleName, this.lowerModuleName, this.insertDep, this.insertDepSlash, this.stateUrl);


//        if (this.includeRestfulService) {
//            // Add RESTful service stuff here
//        }
},

touchIndexHtml: function() {
        // Touch the index.html file to force the index grunt task to rebuild it (that task adds the new module to the scripts)
        var indexHtmlFilePath = 'app/index.html';
        touch(indexHtmlFilePath, {mtime: true});
      },

      _addModuleToAppJs: function app(projectName, camelModuleName, lowerModuleName, insertDep, insertDepSlash, stateUrl) {

        var hook   = '\n])));';
        var hook2   = '])));';
        var file   = this.readFileAsString(injectPath);
        if (file.indexOf(insert) === -1) {
          this.write(injectPath, file.replace(hook, insert + hook2));
        }
}

});

module.exports = ModuleGenerator;