
module.exports.PERMISSION = function () {
    return "CLIENT::23; SYSTEM_MODULE; _IMPORTANT; DATA; *;";
}
module.exports.run = async (msg, client, cmsg) => {
    const message = await cmsg;
    const contact = await message.getContact();
    const chat = await message.getChat();
    const chatId = await message.getChatId;
    const chatName = await chat.name;
    //const group = await message.isGroupMsg;
    const isGroup = await chat.isGroup;
    const number = await contact.number;
    const ids = await client.info.wid;
    const ChatType = await chat.type;
    const id = await contact.id;
    const profile = await contact.profilePicUrl;
    const name = await contact.pushname;
    const sender = await message.from;
    const clientAbout = `
    # *ABOUT*
    ChatName: ${chatName}
    Group: ${isGroup}
    # *DATA*
    ID: ${id._serialized} or ${ids._serialized}
    ChatType: ${ChatType}
    Name: ${name}
    Semder: ${sender}
    ChatIsGroup: ${chat}
    ChatId: ${chatId}
    Contact: ${contact}
    Message: ${message.body}
    `;
    console.log(clientAbout);
    await cmsg.reply(clientAbout);
}