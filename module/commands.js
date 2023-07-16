const os = require('os');

const platform = os.platform();
const release = os.release();
module.exports.commands = function (msg, client, clientMsg) {
    var result;

    if (msg[1] == "menu") {
        result = `
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
        result = `
${msg}: Maybe the command is not added or maintenance
        `;
    }
    clientMsg.reply(result);

}
