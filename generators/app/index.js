'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
    var maxPrompts = 6;

    this.log(
      yosay() + '\n\n' +
      '=============================================\n' +
      chalk.green('Maxxton Typescript project generator\n\n') +
      'Version: 1.0\n' +
      'Author : R. Hermans (r.hermans@maxxton.com)\n' +
      '=============================================\n\n' +
      'Lets get started with some questions!\n'
    );

    var prompts = [
      {
        type: 'string',
        name: 'projectname',
        message: '(1/' + maxPrompts + ') What is the name of your project?',
        default: 'awesome-project'
      },
      {
        type: 'string',
        name: 'packagename',
        message: '(2/' + maxPrompts + ') What is the name of your package?',
        default: 'mxt.aws'
      },
      {
        type: 'list',
        name: 'projecttype',
        message: '(2/' + maxPrompts + ') What kind of project will it be?',
        choices: [
          {
            name: 'Application',
            value: 'app'
          },
          {
            name: 'Module / Library',
            value: 'module'
          }
        ]
      },
      {
        type: 'string',
        name: 'authorname',
        message: '(3/'+ maxPrompts +') What is your name?',
        default: 'M. Axxton'
        
      },
      {
        type: 'string',
        name: 'email',
        message: '(4/'+ maxPrompts +') What is your email?',
        default: 'm.axxton@maxxton.com'
      },
      {
        type: 'confirm',
        name: 'isangular',
        message: '(5/' + maxPrompts + ') Will your project include AngularJs?',
        default: true
      },
      {
        type: 'confirm',
        name: 'issass',
        message: '(6/' + maxPrompts + ') Will your project include SASS/CSS?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.currentyear = (new Date()).getFullYear();
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      
      this.variables = {
        projectname: this.props.projectname,
        packagename: this.props.packagename,
        projecttype: this.props.projecttype,
        authorname: this.props.authorname,
        authoremail: this.props.authoremail,
        isangular: this.props.isangular,
        issass: this.props.issass,
        currentyear: this.props.currentyear
      };
      
      this.matcher = { 
        'interpolate': /<%=([\s\S]+?)%>/g 
      };
      

      // Copy the project base files
      
      this.fs.copyTpl(
        this.templatePath('global/_bower.json'),
        this.destinationPath('bower.json'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_bowerrc'),
        this.destinationPath('.bowerrc')
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_gitignore'),
        this.destinationPath('.gitignore')
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_gulp.conf.json'),
        this.destinationPath('gulp.conf.json'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_license'),
        this.destinationPath('LICENSE'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_package.json'),
        this.destinationPath('package.json'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_readme.md'),
        this.destinationPath('README.md'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_tsconfig.json'),
        this.destinationPath('tsconfig.json'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('global/_tsdconfig.json'),
        this.destinationPath('tsdconfig.json'),
        this.variables,
        this.matcher
      );
      
      this.fs.copyTpl(
        this.templatePath('source/_main.d.ts'),
        this.destinationPath('src/' + this.props.projectname + '.d.ts')
      );
      
      if(this.props.issass) {
      
        this.fs.copyTpl(
          this.templatePath('source/_main.scss'),
          this.destinationPath('src/sass/' + this.props.projectname + '.scss')
        );
        
      }
      
      if(this.props.isangular) {
        
        this.fs.copyTpl(
          this.templatePath('source/_app_angular.ts'),
          this.destinationPath('src/app/app.ts'),
          this.variables,
          this.matcher
        );
        
        this.fs.copyTpl(
          this.templatePath('test/_app-test_angular.ts'),
          this.destinationPath('test/' + this.props.projectname + '-test.ts'),
          this.variables,
          this.matcher
        );
                
      } else {
        
        this.fs.copyTpl(
          this.templatePath('source/_app_normal.ts'),
          this.destinationPath('src/app/app.ts'),
          this.variables,
          this.matcher
        );
        
        this.fs.copyTpl(
          this.templatePath('test/_app-test_normal.ts'),
          this.destinationPath('test/' + this.props.projectname + '-test.ts'),
          this.variables,
          this.matcher
        );
        
      }
       
      if(this.props.projecttype === "app") {
        
        this.fs.copyTpl(
          this.templatePath('global/_server.js'),
          this.destinationPath('server.js')
        );
         
        this.fs.copyTpl(
          this.templatePath('public/_index.html'),
          this.destinationPath('public/index.html'),
          this.variables,
          this.matcher
        );
        
        this.fs.copyTpl(
          this.templatePath('public/_home.html'),
          this.destinationPath('public/templates/home.html')
        );
         
      }
    }
  },

  install: function () {
    this.installDependencies();
  }
});
