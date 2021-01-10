#!/usr/bin/env node
var chalk = require('chalk'),
axios = require('axios'),
options = require('minimist')(process.argv.slice(2)),
figlet = require('figlet');
(async () => {
figlet('Thanks To Contributors',(err,data) =>console.log(chalk.yellow(data) + '\nNames : '))
if(options.t || options.token) axios.defaults.headers.common['Authorization'] = `bearer ${options.t || options.token}`;
var data = await axios.get(`https://api.github.com/repos/${options.u || options.username || 'github'}/${options.r || options.repo || 'docs'}/contributors`)
data.data.forEach(async names =>{
var uname = await axios.get(names.url)
console.log(chalk.green(uname.data.name || names.login))
})
})();