module.exports.run = function (msg, client, cmsg){
    return `
This is an example ->

*${msg}*
*${client}*
*${cMsg}*

`;
}
