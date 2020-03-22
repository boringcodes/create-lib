const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const pkg = require('../../package.json');

module.exports = class extends Generator {
  async prompting() {
    this.log(
      yosay(`Welcome to the astounding ${chalk.red(pkg.name)} generator!`),
    );

    const gitName = this.user.git.name() || 'organization';
    const gitEmail = this.user.git.email() || 'hi@domain.com';
    const githubUsername = await (async () => {
      try {
        const username = await this.user.github.username();

        return username;
      } catch (err) {
        return 'organization';
      }
    })();
    const prompts = [
      {
        type: 'input',
        name: 'elementName',
        message: 'What is the name of your package?',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'elementDescription',
        message: 'Description of your package?',
        default: 'My awesome package',
      },
      {
        type: 'input',
        name: 'elementHomepageUrl',
        message: 'Package homepage URL?',
        default: `https://github.com/${githubUsername}/${this.appname}`,
      },
      {
        type: 'input',
        name: 'elementBugsUrl',
        message: 'Bugs tracking site?',
        default: `https://github.com/${githubUsername}/${this.appname}/issues`,
      },
      {
        type: 'input',
        name: 'elementAuthor',
        message: 'Author of this package?',
        default: `${gitName} \<${gitEmail}\>`,
      },
      {
        type: 'input',
        name: 'elementRepositoryUrl',
        message: 'Package repository URL?',
        default: `https://github.com/${githubUsername}/${this.appname}.git`,
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      [this.templatePath('**/*.*')],
      this.destinationPath(),
      this.props,
    );
  }

  install() {
    this.yarnInstall();
  }
};
