
module.exports.PERMISSION = function (){
    return "EXAMPLE::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg){
    return `
This is an example -> 

*${msg}*
*${client}*
*${cmsg}*
}
