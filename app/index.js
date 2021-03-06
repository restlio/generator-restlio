'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var keygen = require('keygenerator');

module.exports = yeoman.generators.Base.extend({

	initializing: function () {
		this.pkg = require('../package.json');
	},

	prompting: function () {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log(yosay(
			'Welcome to the ' + chalk.red('Restlio') + ' generator!'
		));

		var prompts = [
			{
				type: 'input',
				name: 'appName',
				message: 'Write app name',
				default: 'My App'
			},
			{
				type: 'input',
				name: 'appSlug',
				message: 'Write app slug',
				default: 'myapp'
			},
			{
				type: 'input',
				name: 'appDesc',
				message: 'Write app description',
				default: 'My App Description'
			}
		];

		this.prompt(prompts, function (props) {
			this.appName = props.appName;
			this.appSlug = props.appSlug;
			this.appDesc = props.appDesc;

			done();
		}.bind(this));
	},

	writing: {
		dev: function () {
			this.fs.copyTpl(
				this.templatePath('config/development.js'),
				this.destinationPath('config/development.js'),
				{
					appName: this.appName,
					appSlug: this.appSlug,
					appDesc: this.appDesc,
					sessionSecret: keygen._(),
					tokenSecret: keygen._()
				}
			);
		},

		prod: function () {
			this.fs.copyTpl(
				this.templatePath('config/production.js'),
				this.destinationPath('config/production.js'),
				{
					appName: this.appName,
					appSlug: this.appSlug,
					appDesc: this.appDesc,
					sessionSecret: keygen._(),
					tokenSecret: keygen._(),
					basicSecret: keygen._(),
					adminPass: keygen._(),
					mongoPass: keygen._(),
					redisPass: keygen._()
				}
			);
		},

		app: function () {
			this.fs.copyTpl(this.templatePath('apidocs'), this.destinationPath('apidocs'));
			this.fs.copyTpl(this.templatePath('boot'), this.destinationPath('boot'));
			this.mkdir('lib');
			this.mkdir('model');
			this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
			this.mkdir('route');
			this.fs.copy(this.templatePath('view'), this.destinationPath('view'));
			this.mkdir('worker');
			this.fs.copy(this.templatePath('app.js'), this.destinationPath('app.js'));
            this.fs.copy(this.templatePath('workers.js'), this.destinationPath('workers.js'));
			this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
			this.fs.copy(this.templatePath('jshintrc'), this.destinationPath('.jshintrc'));

			this.fs.copyTpl(
				this.templatePath('package.json'),
				this.destinationPath('package.json'),
				{
					appSlug: this.appSlug,
					appDesc: this.appDesc
				}
			);
		}
	},

	install: function () {

		this.installDependencies({
			skipInstall: this.options['skip-install']
		});

	}

});
