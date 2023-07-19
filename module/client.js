module.exports.run = async function (msg, client, cmsg){
    const message = cmsg;
    const contact = await message.getContact();
    const chat = await message.getChat();
    const chatId = await message.getChatId();
    const chatName = await chat.name;
    const group = await message.isGroupMsg;
    const number = await contact.number;
    const id = await contact.id;
    const profile = await contact.profilePicUrl;

    const name = contact.pushname;
    const sender = await message.from;
    const clientAbout = `
    # *ABOUT*
    ChatName: ${chatName}
    Group: ${group}
    Number: ${number}
    ID: ${id}
    Profile: ${profile}
    Name: ${name}
    Semder: ${sender}
    Chat: ${chat}
    ChatId: ${chatId}
    Contact: ${contact}
    Message: ${message.body}
    `;
    return clientAbout;
}