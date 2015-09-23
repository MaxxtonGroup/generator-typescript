'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

/**
 * Maxxton Typescript project generator
 * 
 * @Author: R. Hermans (r.hermans@maxxton.com)
 * @Copyright: Maxxton Group 2015
 */

var createAppName = function(str) {
  str = str.replace(new RegExp('-|_', 'g'), ' ');
  
  var partsOfStr = str.split(' ');
  var result = '';
  partsOfStr.forEach(function(word) {
    result += word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
  
  return result;
};

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    var maxPrompt = 7;

    this.log(
      yosay() + '\n\n' +
      '=============================================\n' +
      chalk.green('Maxxton Typescript project generator\n\n') +
      'Version: 1.0\n' +
      'Author : R. Hermans (r.hermans@maxxton.com)\n' +
      '=============================================\n\n' +
      'Lets get started with some questions!\n'
    );

    var prompts = 
    [
      {
        type: 'string',
        name: 'baseName',
        message: '(1/'+ maxPrompt +') What is the name of your Typescript project?',
        default: 'awesome-module'
      },
      {
        type: 'string',
        name: 'package',
        message: '(2/'+ maxPrompt +') What is your default package? (TIP: keep it short)',
        default: 'mxt.util'
      },
      {
        type: 'string',
        name: 'userName',
        message: '(3/'+ maxPrompt +') What is your name?',
        default: 'M. Axxton'
      },
      {
        type: 'string',
        name: 'userEmail',
        message: '(4/'+ maxPrompt +') What is your email?',
        default: 'm.axxton@maxxton.com'
      },
      {
        type: 'list',
        name: 'projectType',
        message: '(5/'+ maxPrompt +') What kind of project will you be working on?',
        choices: [
          {
            name: 'Application (This project will be some kind of (web) application)',
            value: 'application'
          },
          {
            name: 'Module (Kinda like a library to be used in an application)',
            value: 'module'
          }
        ]
      },
      {
        type: 'confirm',
        name: 'angularApp',
        message: '(6/'+ maxPrompt +') Will this be used as an Angular project?',
        default: true
      },
      {
        type: 'confirm',
        name: 'callNpm',
        message: '(7/'+ maxPrompt +') Shall I fetch the dependencies for your project?',
        default: true
      },
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      
      this.props.author = this.props.userName + ' (' + this.props.userEmail + ')';
      this.props.currentYear = (new Date()).getFullYear();
      this.props.appName = createAppName(this.props.baseName);
      
      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function () {
      
      this.variables =
      {
        author: this.props.auhtor,
        lcBaseName: this.props.appName.toLowerCase(),
        hcBaseName: this.props.appName,
        isAngular: this.props.angularApp
      };
      
      this.matcher =
      { 
        'interpolate': /<%=([\s\S]+?)%>/g 
      };
      
      // Copy the .gitignore file.
      this.fs.copyTpl(
        this.templatePath('project/.gitignore'),
        this.destinationPath('.gitignore')
      );
      
      // Copy the LICENSE file.
      this.fs.copyTpl(
        this.templatePath('project/LICENSE'),
        this.destinationPath('LICENSE')
      );
 
      // Copy the README.md file
      this.fs.copyTpl(
        this.templatePath('project/README.md'),
        this.destinationPath('README.md'),
        this.variables,
        this.matcher
      );
      
      // Copy the .editorsconfig file
      this.fs.copyTpl(
        this.templatePath('project/.editorconfig'),
        this.destinationPath('.editorconfig')
      );
      
      // Copy the gulpfile.js file
      this.fs.copyTpl(
        this.templatePath('project/gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
     
      // Copy the package.json file
      this.fs.copyTpl(
        this.templatePath('project/package.json'),
        this.destinationPath('package.json'),
        this.variables,
        this.matcher
      );
      
    },
    publicfiles: function() {
      
      this.variables =
      {
        author: this.props.auhtor,
        lcBaseName: this.props.appName.toLowerCase(),
        hcBaseName: this.props.appName,
        isAngular: this.props.angularApp
      };
      
      this.matcher =
      { 
        'interpolate': /<%=([\s\S]+?)%>/g 
      };
      
      //Copy the bower.json file
      this.fs.copyTpl(
        this.templatePath('public/bower.json'),
        this.destinationPath('public/bower.json'),
        this.variables,
        this.matcher
      );
      
      //Copy the .bowerrc file
      this.fs.copyTpl(
        this.templatePath('public/.bowerrc'),
        this.destinationPath('public/.bowerrc')
      );
      
    },
    sourcefiles: function() {
      
      this.variables =
      {
        author: this.props.auhtor,
        lcBaseName: this.props.appName.toLowerCase(),
        hcBaseName: this.props.appName,
        packageName: this.props.package,
        isAngular: this.props.angularApp,
        isApp: this.props.projectType === "application",
        isModule: this.props.projectType === "module"
      };
      
      this.matcher =
      { 
        'interpolate': /<%=([\s\S]+?)%>/g 
      };
      
      // Copy the main.scss file.
      this.fs.copyTpl(
        this.templatePath('source/sass/src/main.scss'),
        this.destinationPath('src/sass/src/main.scss')
      );
      
      // Copy the index.html file.
      this.fs.copyTpl(
        this.templatePath('source/web/src/index.html'),
        this.destinationPath('src/web/src/index.html')
      );
      
      // Copy the app.ts file.
      this.fs.copyTpl(
        this.templatePath('source/typescript/src/app.ts'),
        this.destinationPath('src/typescript/src/app.ts'),
        this.variables,
        this.matcher
      );
      
      // Copy the tsd.json file.
      this.fs.copyTpl(
        this.templatePath('source/typescript/tsd.json'),
        this.destinationPath('src/typescript/tsd.json'),
        this.variables,
        this.matcher
      );
      
      // Copy the tsd.config.json file.
      this.fs.copyTpl(
        this.templatePath('source/typescript/tsd.conf.json'),
        this.destinationPath('src/typescript/tsd.conf.json'),
        this.variables,
        this.matcher
      );
      
    },
    testfiles: function () {
      this.variables =
      {
        author: this.props.auhtor,
        lcBaseName: this.props.appName.toLowerCase(),
        hcBaseName: this.props.appName,
        packageName: this.props.package,
        isAngular: this.props.angularApp,
        isApp: this.props.projectType === "application",
        isModule: this.props.projectType === "module"
      };
      
       this.matcher =
      { 
        'interpolate': /<%=([\s\S]+?)%>/g 
      };
      
      // Copy the bower.json file.
      this.fs.copyTpl(
        this.templatePath('test/bower.json'),
        this.destinationPath('test/bower.json'),
        this.variables,
        this.matcher
      );
      
      // Copy the .bowerrc file.
      this.fs.copyTpl(
        this.templatePath('test/.bowerrc'),
        this.destinationPath('test/.bowerrc')
      );
      
      // Copy the karma.conf.js file.
      this.fs.copyTpl(
        this.templatePath('test/karma.conf.js'),
        this.destinationPath('test/karma.conf.js'),
        this.variables,
        this.matcher
      );
      
      // Copy the tsd.json file.
      this.fs.copyTpl(
        this.templatePath('test/tsd.json'),
        this.destinationPath('test/tsd.json')
      );
      
      // Copy the tsd.json file.
      this.fs.copyTpl(
        this.templatePath('test/tsd.conf.json'),
        this.destinationPath('test/tsd.conf.json'),
        this.variables,
        this.matcher
      );
      
      // Copy the app.test.js file.
      this.fs.copyTpl(
        this.templatePath('test/src/app.test.ts'),
        this.destinationPath('test/src/app.test.ts'),
        this.variables,
        this.matcher
      );
      
    }
  },

  install: function () {
  }
});
