const Telegraf = require('telegraf');
const DownloadService = require('./TorrentManager');
require('dotenv').config();


   class TelegramBot {

    downloadContext = undefined;

    constructor() {
        this.bot = new Telegraf(process.env.TELEGRAM_BOT_KEY);
        this._init();
    }

    async _init() {
        this._setCommands();
        await this.bot.launch();

        DownloadService.onDownloadStart = (gid) => { this.downloadContext.reply("Your torrent download started with id: "+gid) }

        DownloadService.onDownloadComplete = (gid) => { this.downloadContext.reply("Your torrent : " + gid + " was downloaded successfully"); }

        DownloadService.onDownloadError = (gid) => { this.downloadContext.reply("Cannot download torrent: " + gid + "revise the URI"); }

    }

    _setCommands () {
        this.bot.command('help', (context) => {
            context.reply('To download a torrent you must use /download command, and provide me the URI of the torrent/magnet like the following example: \n /download https://www.miaumiau.baz/UwuUwu');
        });
        this.bot.command('start', (context) => {
            context.reply("I'm ready to download any torrent you want, write /help to show the basics");
        })
        this.bot.command('download', (context) => {
            let [ ,target, folder] = context.message.text.split(' ');

            if (!!target) {
                this.downloadContext = context;
                DownloadService.downloadTorrent(target, folder);
            } else {
                context.reply('URI is required');
            }
        });
    }

}

module.exports = TelegramBot
