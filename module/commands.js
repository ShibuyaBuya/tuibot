const os = require('os');
const fs = require('fs');
const path = require('path');

// Mendapatkan PWD (working directory)
const pwd = path.resolve(__dirname);
const platform = os.platform();
const release = os.release();
module.exports.commands = function (msg, client, clientMsg) {
    var result;
    const modul = `./${msg[1]}.js`;
    if (msg[1] == "menu") {
        result = `
# *PWD*
@ ${pwd}
# *MENU*
@ tui/menu - Menu
@ tui/whoami - Whoami, usage: tui/whoami
@ tui/set - To set something for documentation write tui/set -Doc
        `;


    }else if (msg[1] == "whoami"){
	result = `
# *WHOAMI*
Platform ${platform}
Release ${release}
_CentOS_
`;
    }else{
	if (fs.existsSync(`./module/${msg[1]}.js`)){
	    const { run } = require(modul);
	    result = run(msg, client, clientMsg);
	}else{
            result = `
${msg}: Maybe the command is not added or maintenance, Thank you :)
            `;
	}
    }
    clientMsg.reply(result);
}
