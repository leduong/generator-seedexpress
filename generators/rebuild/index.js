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
    //   // To access props later use this.props.someAnswer;
    //   this.props = props;
    // });
  }

  install() {
    // This.installDependencies();
  }

  writing() {
    this.generatorConfig = JSON.parse(
      fs.readFileSync('generator.json', 'utf8')
    );
    // This.generatorConfig = this.dest.readJSON('generator.json');
    this.baseURL = this.generatorConfig.baseURL;
    this.baseName = this.generatorConfig.baseName;
    this.databaseType = this.generatorConfig.databaseType;
    this.hostName = this.generatorConfig.hostName;
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
      '.editorconfig',
      '.gitignore',
      '.jshintrc',
      'app.js',
      'models/index.js',
      'config/config.json',
      'package.json',
      'Procfile'
    ];

    _.each(
      files,
      function (file) {
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), {
          ...this
        });
      }.bind(this)
    );

    _.each(
      this.entities,
      function (entity) {
        this.name = entity.name;
        this.attrs = entity.attrs;

        this.fs.copyTpl(
          this.templatePath('models/_entity.js'),
          this.destinationPath(
            'models/' + _s.camelize(_.capitalize(entity.name)) + '.js'
          ),
          {
            ...this
          }
        );
        this.fs.copyTpl(
          this.templatePath('routes/_entity.js'),
          this.destinationPath(
            'routes/' + _s.camelize(_.capitalize(entity.name)) + '.js'
          ),
          {
            ...this
          }
        );
        this.fs.copyTpl(
          this.templatePath('routes/_test.js'),
          this.destinationPath(
            'routes/' + _s.camelize(_.capitalize(entity.name)) + '.spec.js'
          ),
          {
            ...this
          }
        );
      }.bind(this)
    );
  }
};
