'use strict';

const path    = require('path');
const assert  = require('yeoman-generator').assert;
const helpers = require('yeoman-generator').test;
const os      = require('os');

describe('restlio:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({'skip-install': true})
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
