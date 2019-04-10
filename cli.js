#!/usr/bin/env node
var exec = require('child_process').exec;
var opn = require('opn');
var _ = require('lodash');

const [,, ...args] = process.argv

var cmd = `git rev-parse --abbrev-ref HEAD`;
var target = _.trim(args);

exec(cmd, (err, stdout, stderr) => {
    var current_branch = _.trim(stdout);
    process.stdout.write(`Creating a pull request..\n`);
    process.stdout.write(`Current branch: ${current_branch}`);
    process.stdout.write(`Target branch: track/${target}\n`);
    process.stdout.write(`Please wait... Your browser will open soon\n`);

    var cmd_push = `git push --set-upstream origin ${current_branch}`;
    var url = `https://code.devsnc.com/dev/glide/compare/track/${target}...${current_branch}?expand=1`;
    console.log(`URL: ${url}`);

    exec(cmd_push, (err, stdout, stderr) => {
        opn(url);
    });
});