module.exports.PERMISSION = function (){
    return "LS::23; SYSTEM_MODULE; _IMPORTANT; *;";
}
module.exports.run = function (msg, client, cmsg){
    const fs = require('fs');
    var ls = `module list: \n`;
    var lengthM = 0;
    // Nama direktori yang ingin Anda periksa
    const directoryPath = './module'; // Ganti dengan nama direktori yang sesuai
    
    // Membaca isi direktori
    fs.readdir(directoryPath, (err, files) => {
	if (err) {
	    cmsg.reply('error reading module:' + err);
	}
    
    // Menampilkan daftar file dalam direktor

	files.forEach((file) => {
	    if (file.endsWith(".js")){
		lengthM++;
		
		var fileExt = file.substring(0, file.lastIndexOf('.')) || file;
		var fileUp = fileExt.toUpperCase();
		ls += `${lengthM}. *${fileUp}*.\n\n`;
	    }
	});
//	cmsg.reply(`${files}`);
	cmsg.reply(`

${ls}


Total module: *${lengthM}*



`);
    });

}
