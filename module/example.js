<<<<<<< HEAD
module.exports.PERMISSION = function (){
    return "EXAMPLE::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg){
    return `
This is an example -> 

*${msg}*
*${client}*
*${cmsg}*
=======
module.exports.run = function (msg, client, cmsg){
    return `
This is an example ->

*${msg}*
*${client}*
*${cMsg}*
>>>>>>> bbf623001888e193dd82e0d0158b2941bb972317

`;
}
