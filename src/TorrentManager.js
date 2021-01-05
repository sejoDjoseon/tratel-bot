const Aria2 = require("aria2");
const { exec } = require("child_process");
require('dotenv').config();


class TorrentManager {

    onDownloadStart = undefined;

    onDownloadComplete = undefined;

    onDownloadError = undefined;

    constructor() {
        this.aria2 = new Aria2();

        this.aria2.on("onDownloadStart", ([{gid}]) => {
            this.onDownloadStart && this.onDownloadStart(gid);
        });
        this.aria2.on("onDownloadComplete", ([{gid}]) => {
            this.onDownloadComplete && this.onDownloadComplete(gid);
        });
        this.aria2.on("onDownloadError", ([{gid}]) => {
            this.onDownloadError && this.onDownloadError(gid);
        });

        this._init();
    }
    downloadTorrent (target, context) {
        this.aria2.call("addUri", [`${target}`], { dir: `${process.env.DOWNLOAD_DIR}` });
    }
     _init () {
        this._execCommand('aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --seed-time=0');
         this.aria2
             .open()
             .then(() => console.log("Aria2C RPC running"))
             .catch(err => console.log("Aria2C RPC fails", err));
    }
    _execCommand (command) {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
}


module.exports = new TorrentManager();
