const qrcode = require('qrcode-terminal');
const { commands } = require('./module/commands.js');
const fs = require('fs');
const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');
const os = require('os');
const configuration = require('./configuration.json');
const platform = os.platform(); // Mendapatkan platform OS (misalnya 'win32', 'linux', 'darwin', dll.)
const release = os.release(); // Mendapatkan versi OS (misalnya '10.0.19041', '5.4.0-81-generic', '20.6.0', dll.)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox']
    }
});
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    const database = require('./firebase_module/connect.js').database;
    console.log('Connectimg to firebase...')
    database.ref('users_wa').once('value', (snapshot) => {
       console.log("Connected to firebase");

        return;
    });
});

client.on('message', async (message) => {
    var msg = await message.body.split('/');
    const contact = await message.getContact();
    const chat = await message.getChat();
    const chatId = await message.getChatId;
    const chatName = await chat.name;
    const group = await message.isGroupMsg;
    const number = await contact.number;
    const id = await contact.id;
    const profile = await contact.profilePicUrl;

    const name = contact.pushname;
    const sender = await message.from;
    const timestamp = message.timestamp;
    const formatTime = new Date(timestamp * 1000);
    const formatDate = formatTime.toLocaleDateString();
    const time = formatTime.toLocaleTimeString();
    if (msg[0].startsWith("!")) {
        msg[0] = msg[0].replace("!", "");
        msg = moveArrayToRightAndAdd(msg,"msg[0]"+"!");
        await message.reply(`Hello ${name}!`);
        try {
            await commands(msg, client, message);
        }catch (err){
            for (var dev in configuration.developer_number){
                await client.sendMessage(`${dev}@c.us`, `
An error reported by system:
Tag: @${contact.id.user}
Number: ${id._serialized.replace("@c.us", "")}
Username: ${name} (not username game)
Group: ${group} (${chatName})
Message: ${message.body}, ${msg}
Timestamp: ${timestamp}
FormatTime: ${formatTime}
Time: ${time}
TimeDate: ${formatDate}
Error: 
[START]
${err}
[END]
                `, {mentions: [contact]});
                await message.reply("An error has been reported to the developer, please wait for the fix");
            }
        }

    }
});
function moveArrayToRightAndAdd(array, value){
    for (let i = array.length; i > 0; i--){
        array[i] = array[i-1];
    }
    array[0] = value;
    return array;
}

    

client.initialize();
const tes = 0;

