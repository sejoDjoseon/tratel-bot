const Aria2 = require("aria2");
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Stream = require('stream');
const { spawn } = require("child_process");
require('dotenv').config();


class TorrentManager {

    onDownloadStart = undefined;

    onDownloadComplete = undefined;

    onDownloadError = undefined;

    constructor() {
        this.logDir = process.env.TRATELBOT_LOGS_DIR || '../logs';
        this.outFile = path.join(this.logDir, 'stdOutput.log');
        this.errFile = path.join(this.logDir, 'stdErr.log');
        fs.mkdirSync(this.logDir, { recursive: true });
    }

    configureAria() {
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
        console.log('configure ', this.aria2.id());
    }

    async init () {
        this.configureAria();
        await this._execCommand('aria2c --enable-rpc --rpc-listen-all=true --rpc-allow-origin-all --seed-time=0');
        console.log('arribem');
        console.log('init ', this.aria2.id());
        await this.aria2.open();
        console.log("Aria2C RPC running");
        // console.log(await this.aria2.listMethods());
    }

    downloadTorrent (target, folder = '') {
        return this.aria2.call("addUri", [`${target}`], { dir: `${process.env.TRATELBOT_DOWNLOAD_DIR}/${folder}` });
    }

    getGlobalStat () {
        return this.aria2.call("getGlobalStat");
    }

    async shutdown () {
        // await this.aria2.call("forceShutdown");
        console.log('shutdown ', this.aria2.id());
        await this.aria2.close();
        if (this.process) {
            console.log(this.process.pid);
            this.process.stdin.pause();
            this.process.kill('SIGKILL');
        }
        while (!this.closed) {
            console.log('closed');
            await new Promise(resolve => setTimeout(resolve, 250));
        }
    }

    _execCommand (fullCommand) {
        return new Promise(((resolve, reject) => {
            const [command, ...options] = fullCommand.split(' ');
            const process = spawn(command, options);
            this.process = process;
            this.closed = false;
            console.log('PID: ', this.process.pid);

            process.on('spawn', () => resolve());
            process.stdout.on('data', (data) => {
                const lines = data.toString().split('\n').filter((line) => line.startsWith('['));
                const stdOutput = fs.createWriteStream(this.outFile, { flags: 'a' });
                stdOutput.end(lines.join('\n'));
            });
            process.stderr.on('data', (data) => {
                const stdErr = fs.createWriteStream(this.errFile);
                stdErr.end(data);
            });
            process.on('error', (error) => {
                console.log(`error: ${error.message}`);
                reject(error);
            });
            process.on('close', (code) => {
                console.log(`Closed: ${code}`);
                this.closed = true;
            });
        }))
    }

    getTorrentProgress() {
        return this._readFileLastLines(this.outFile, 5);
    }

    getErrors() {
        return this._readFileLastLines(this.errFile, 10);
    }

    _readFileLastLines(fileName, linesNumber) {
        const lines = [];
        let inStream = fs.createReadStream(fileName);
        let outStream = new Stream;

        return new Promise((resolve, reject)=> {
            let rl = readline.createInterface(inStream, outStream);

            rl.on('line', function (line) {
                if (lines.length >= linesNumber) {
                    lines.shift();
                }
                lines.push(line);
            });
            rl.on('error', reject);
            rl.on('close', function () {
                resolve(lines.join('\n'));
            });
        });
    }
}


module.exports = TorrentManager;
