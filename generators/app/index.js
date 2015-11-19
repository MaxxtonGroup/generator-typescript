'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    var createAppName = function(str) {
      str = str.replace(new RegExp('-|_', 'g'), ' ');

      var partsOfStr = str.split(' ');
      var result = '';
      partsOfStr.forEach(function(word) {
        result += word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      });

      return result;
    };

    this.log(
      yosay() + '\n\n' +
      '=============================================\n' +
      chalk.green('Maxxton Angular2 + Typescript generator\n\n') +
      'Version: 2.0\n' +
      'Author : R. Hermans (r.hermans@maxxton.com)\n' +
      '=============================================\n\n' +
      'Lets get started with some questions!\n'
    );

    var maxPrompts = 3;

    var prompts = [
      {
        type: 'string',
        name: 'projectName',
        message: '(1/' + maxPrompts + ') What is the name of your project?',
        default: "awesome-project"
      },
      {
        type: 'string',
        name: 'authorName',
        message: '(2/' + maxPrompts + ') What is your name?',
        default: "M. Maxxton",
        store: true
      },
      {
        type: 'string',
        name: 'authorEmail',
        message: '(3/' + maxPrompts + ') What is your email?',
        default: "m.maxxton@maxxton.com",
        store: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.className = createAppName(this.props.projectName);
      this.props.currentYear = (new Date()).getFullYear();
      done();
    }.bind(this));
  },

  writing: function () {
    this.matcher = { 'interpolate': /<%=([\s\S]+?)%>/g }

    // Copy the project files
    this.fs.copyTpl(
      this.templatePath('project/_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('project/_gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    this.fs.copyTpl(
      this.templatePath('project/_license'),
      this.destinationPath('LICENSE'),
      this.props,
      this.matcher
    );

    this.fs.copyTpl(
      this.templatePath('project/_package.json'),
      this.destinationPath('package.json'),
      this.props,
      this.matcher
    );

    this.fs.copyTpl(
      this.templatePath('project/_readme.md'),
      this.destinationPath('README.md'),
      this.props,
      this.matcher
    );

    this.fs.copyTpl(
      this.templatePath('project/_tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    // Copy the source files
    this.fs.copyTpl(
      this.templatePath('source/_projectname.ts'),
      this.destinationPath('src/' + this.props.projectName + '.ts'),
      this.props,
      this.matcher
    );

    this.fs.copyTpl(
      this.templatePath('source/_projectname.tpl.html'),
      this.destinationPath('src/' + this.props.projectName + '.tpl.html'),
      this.props,
      this.matcher
    );

    this.fs.copyTpl(
      this.templatePath('source/_index.html'),
      this.destinationPath('src/index.html'),
      this.props,
      this.matcher
    );

    // Copy the source component files
    this.fs.copyTpl(
      this.templatePath('source/components/mycomponent/_mycomponent.scss'),
      this.destinationPath('src/components/mycomponent/mycomponent.scss')
    );

    this.fs.copyTpl(
      this.templatePath('source/components/mycomponent/_mycomponent.tpl.html'),
      this.destinationPath('src/components/mycomponent/mycomponent.tpl.html')
    );

    this.fs.copyTpl(
      this.templatePath('source/components/mycomponent/_mycomponent.ts'),
      this.destinationPath('src/components/mycomponent/mycomponent.ts')
    );

    // Copy the source filter files
    this.fs.copyTpl(
      this.templatePath('source/filters/_myfilter.ts'),
      this.destinationPath('src/filters/myfilter.ts')
    );

    // Copy the source services files
    this.fs.copyTpl(
      this.templatePath('source/services/myservice/_mymodel.ts'),
      this.destinationPath('src/services/myservice/mymodel.ts')
    );

    this.fs.copyTpl(
      this.templatePath('source/services/myservice/_myservice.ts'),
      this.destinationPath('src/services/myservice/myservice.ts')
    );

    // Copy the source assets files
    this.fs.copyTpl(
      this.templatePath('source/assets/scss/_settings.scss'),
      this.destinationPath('src/assets/scss/_settings.scss')
    );

    this.fs.copyTpl(
      this.templatePath('source/assets/scss/_style.scss'),
      this.destinationPath('src/assets/scss/style.scss')
    );

    this.fs.copyTpl(
      this.templatePath('source/assets/fonts/_placeholder.txt'),
      this.destinationPath('src/assets/fonts/_placeholder.txt')
    );

    this.fs.copyTpl(
      this.templatePath('source/assets/images/_placeholder.txt'),
      this.destinationPath('src/assets/images/_placeholder.txt')
    );
  },

  install: function () {
    this.npmInstall();
  }
});
