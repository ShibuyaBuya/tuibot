const path = require('path');
const fs = require('fs');
const Module = require('module');


module.exports.makedir = fs.mkdirSync(paths, { recursive: true});
module.exports.rm = fs.rmSync(paths, { recursive: true, force: true});
module.exports.ls = fs.readdirSync(paths);
module.exports.cd = process.chdir(paths);
module.exports.pwd = path.resolve(__dirname);
module.exports.cp = fs.copyFileSync(paths, paths);
module.exports.mv = fs.renameSync(paths, paths);
module.exports.cat = fs.readFileSync(paths, 'utf-8');
module.exports.touch = fs.writeFileSync(paths, 'utf-8');
module.exports.chmod = fs.chmodSync(paths, 0o777);
module.exports.chown = fs.chownSync(paths, 0o777);
module.exports.runPython = function (paths, args = []){
      const { spawnSync } = require('child_process');
      const py = spawnSync('python', [paths, ...args]);
      return py.stdout.toString();
}
module.exports.bash = function (paths, args = []){
      const { spawnSync } = require('child_process');
      const bash = spawnSync('bash', [paths, ...args]);
      return bash.stdout.toString();
}
module.exports.whoami = process.env.USER;