'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs');

const _ = require('lodash');

const _s = require('underscore.string');

const pluralize = require('pluralize');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    // this.log(
    //   yosay(`Welcome to the majestic ${chalk.red('generator-seedexpress')} generator!`)
    // );
    // const prompts = [{
    //   type: 'confirm',
    //   name: 'someAnswer',
    //   message: 'Are you want to rebuild?',
    //   default: true
    // }];
    // return this.prompt(prompts).then(props => {
    //    To access props later use this.props.someAnswer;
    //   this.props = props;
    // });
  }

  install() {
    // This.installDependencies();
  }

  writing() {
    this.generatorConfig = JSON.parse(fs.readFileSync('generator.json', 'utf8'));
    // This.generatorConfig = this.dest.readJSON('generator.json');
    this.baseURL = this.generatorConfig.baseURL;
    this.baseName = this.generatorConfig.baseName;
    this.databaseType = this.generatorConfig.databaseType;
    this.hostName = this.generatorConfig.hostName;
    this.port = this.generatorConfig.port;
    this.databaseName = this.generatorConfig.databaseName;
    this.userName = this.generatorConfig.userName;
    this.password = this.generatorConfig.password;
    this.entities = this.generatorConfig.entities;
    this.authenticate = this.generatorConfig.authenticate;
    this.composer = this.generatorConfig.composer;
    this.pluralize = pluralize;
    // This.fs = fs;
    this._s = _s;
    this._ = _;

    var files = [
      '_editorconfig',
      '_gitignore',
      'app.js',
      'models/index.js',
      'config/config.json',
      'package.json',
      'Procfile'
    ];

    _.each(files, function (file) {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath('Server/' + file), {
        ...this
      });
    }.bind(this));

    var pages = ['pages-menu.ts', 'pages.module.ts', 'pages-routing.module.ts'];
    _.each(pages, function (file) {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath('Client/Admin/src/app/pages/' + file), {
        ...this
      });
    }.bind(this));

    _.each(this.entities, function (entity) {
      this.name = entity.name;
      this.attrs = entity.attrs;

      this.fs.copyTpl(this.templatePath('models/_entity.js'), this.destinationPath('Server/models/' + _s.camelize(_.capitalize(entity.name)) + '.js'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('routes/_entity.js'), this.destinationPath('Server/routes/' + _s.camelize(_.capitalize(entity.name)) + '.js'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('routes/_test.js'), this.destinationPath('Server/routes/' + _s.camelize(_.capitalize(entity.name)) + '.spec.js'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-editcmp.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/edit-' + _.toLower(_s.classify(entity.name)) + '.component.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-addcmp.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/add-' + _.toLower(_s.classify(entity.name)) + '.component.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-listcmp.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/list-' + _.toLower(_s.classify(entity.name)) + '.component.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-list-spec.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/list-' + _.toLower(_s.classify(entity.name)) + '.spec.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-add-spec.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/add-' + _.toLower(_s.classify(entity.name)) + '.spec.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-edit-spec.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/edit-' + _.toLower(_s.classify(entity.name)) + '.spec.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-edit.html'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/edit-' + _.toLower(_s.classify(entity.name)) + '.html'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-list.html'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/list-' + _.toLower(_s.classify(entity.name)) + '.html'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-add.html'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/add-' + _.toLower(_s.classify(entity.name)) + '.html'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-model.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/' + _.toLower(_s.classify(entity.name)) + '.model.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-service.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/' + _.toLower(_s.classify(entity.name)) + '.service.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-router.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/' + _.toLower(_s.classify(entity.name)) + '-router.module.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-module.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/' + _.toLower(_s.classify(entity.name)) + '.module.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular-cmp.ts'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/' + _.toLower(_s.classify(entity.name)) + '.component.ts'), {
        ...this
      });
      this.fs.copyTpl(this.templatePath('angular.scss'), this.destinationPath('Client/Admin/src/app/pages/' + _.toLower(_s.classify(entity.name)) + '/' + _.toLower(_s.classify(entity.name)) + '.scss'), {
        ...this
      });
    }.bind(this));
  }
};
