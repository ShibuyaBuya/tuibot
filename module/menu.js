module.exports.run = async (msg, client, cmsg) => {
    const database = require('../firebase_module/connect.js').database;
    let user_registered;
    await database.ref('users_wa').once('value', (snapshot) => {
        const keys = Object.keys(snapshot.val());
        user_registered = keys.length;
        return;
    });
    const contact = await cmsg.getContact();
    const name = contact.pushname;
    const config = require('../configuration.json');
    cmsg.reply(`
Hi ${name},
My name is ${config.botname} and I am a bot created by Tekroid, inc.

Developer : "Tekroid, inc."
Developer Email : ${config.email} (for business, questions, feedback, and critic only and DO NOT SPAM)
Version : 1
Release Version : 1
Beta Version : 1.1
User: ${user_registered}

# To register, please type !register/<username>
# This bot is still in development, so there are still many bugs in it
# If you find a bug, please report it to the developer
# If you want to contribute to this project, please contact the developer

# BASIC COMMANDS
# *!menu* - Show all commands
# *!module* - Show all modules
# *!client* - Show client information
# *!whoami* - Show bot server information
# *!ping* - Just ping
# *!rules* - Show rules
# *!balance* - Show your balance and other information

# ACCOUNT COMMANDS
# *!register* - Register

# GAME COMMANDS
# Coming as soon as possible

# STAFF COMMANDS
# *!topup* - Topup balance
# *!ban* - Ban user 
# *!unban* - Unban user (coming soon)
# *!suspend* - Suspend user (coming soon)
# *!unsuspend* - Unsuspend user (coming soon)

# Thank you for using this bot. If you have any questions, please contact the developer
# Rules
# 1. Do not spam
# 2. If you cheat, you will be banned or suspended forever
# 3. Do not use this bot for illegal activities (e.g. scamming people and other), developer and founder will not responsible for your actions and you will be banned, suspended forever, or your account will be deleted and you can be reported to the authorities
# 4. Do not use this bot for commercial purposes like:
# - Selling this bot
# - Selling this bot's source code
# - Selling items, coin, and other things that related to this bot for real money
# - Selling items, coin, and other things that related to this bot for virtual money
# - and other things that related to this bot
# 5. Do not use this bot for commercial purposes without permission from the developer
# - If you want to use this bot for commercial purposes, please contact the developer
# 6. If you are a staff, do not abuse your power
# 7. If you are a staff, do not use this bot for commercial purposes without permission from the developer
# 8. Founder will not participate in any criminal action unless proven guilty
# 9. Faking this bot is prohibited
# 10. Faking transaction
# 11. User can only have one or two accounts (one for main account and one for testing account)
# 12. User, staff, founder, developer not allowed to scamming people
# 13. Do not pretend to be a staff or founder or developer
# 14. Only trust people that have a verified role with valid verified key
# 15. Only Founder can accept or reject a staff application
# 16. Only Founder can accept or reject a developer application
# 17. Only Founder can accept or reject a verified key application
# 18. Only Founder can give a verified key, role

# If you break the rules, you will be banned, suspended forever, or your account will be deleted and if i can sue you, i will sue you. im not joking!!!!!

    `);
    
}