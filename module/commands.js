const os = require('os');
const fs = require('fs');
const path = require('path');
const busybox = require('../js_busybox/busybox.js');
const { run } = require('./autoreply.js');
// Mendatopatkan PWD (working directory)
const pwd = path.resolve(__dirname);
const platform = os.platform();
const release = os.release();
module.exports.PERMISSION = function (){
    return "COMMANDS::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg){
    return "don't use this";
}
module.exports.commands = function (msg, client, clientMsg) {
    var result = "";
    const modul = `./${msg[1]}.js`;
	if (msg[1] == "whoami"){
	clientMsg.reply(`
# *WHOAMI*
Platform ${platform}
Release ${release}
_CentOS_
User ${busybox.whoami}
This command is built-in, not a module. :)
`);
    }else{
	if (fs.existsSync(`./module/${msg[1]}.js`)){
	    const { run } = require(modul);
	    run(msg, client, clientMsg);
	}else{
            clientMsg.reply(`
${msg}: Maybe the command is not added or maintenance, Thank you :)
            `);
	}
    }
 


}
