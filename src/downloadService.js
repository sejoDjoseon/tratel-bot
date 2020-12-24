const { exec } = require("child_process");

class DownloadService {
    downloadTorrent (target) {
        console.log(target, 'service');
        const filename = Math.random()
        try {
            exec(`wget -O ${filename}.torrent ${target} && transmission-remote - a -/${filename}`, (error, stdout, stderr) => {
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

        } catch (e) {

        }
    }
    downloadMagnet () {}
    download (downloadMethod, target) {
        downloadMethod === 'magnet' ?
            this.downloadMagnet(target) :
            this.downloadTorrent(target);
    }
    getStatus () {}
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new DownloadService();
        }
    }

    getInstance() {
        return Singleton.instance;
    }

}

module.exports = Singleton;
module.exports = DownloadService;
