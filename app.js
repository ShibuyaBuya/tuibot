const qrcode = require('qrcode-terminal');
const commands = require('module/commands.js');
const fs = require('fs');
const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const os = require('os');

const platform = os.platform(); // Mendapatkan platform OS (misalnya 'win32', 'linux', 'darwin', dll.)
const release = os.release(); // Mendapatkan versi OS (misalnya '10.0.19041', '5.4.0-81-generic', '20.6.0', dll.)
const client = new Client({
    authStrategy: new LocalAuth(),
        puppeteer: {
                args: ['--no-sandbox']
                    }
});
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});
client.on('message', async (message) => {
    const msg = await message.body.split('/');
    const contact = await message.getContact();
    const name = contact.pushname;
    const sender = await message.from;
    const timestamp = message.timestamp;
    if (msg[0] == "tui"){
        

        await message.reply(`Hello ${name}!`);
        await commands(msg, client, message);
    }else if (msg[0] == "whoami"){
        message.reply(`
# *WHOAMI*
Platform ${platform}
Release ${release}
_CentOS_
`);
    }
});
client.initialize();
const tes = 0;
          
