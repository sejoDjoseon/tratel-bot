const Telegraf = require('telegraf');
const DownloadService = require('./TorrentManager');
require('dotenv').config();


   class TelegramBot {
    constructor() {
        this.bot = new Telegraf(process.env.TELEGRAM_BOT_KEY);
        this.downloadService = new DownloadService();
        this._init();
    }

    async _init() {
        this._setCommands();
        await this.bot.launch();
    }

    _setCommands () {
        this.bot.command('help', (context) => {
            context.reply('To download a torrent you must use /download command, and provide me the URI of the torrent/magnet like the following example: \n /download https://www.miaumiau.baz/UwuUwu');
        });
        this.bot.command('start', (context) => {
            context.reply("I'm ready to download any torrent you want, write /help to show the basics");
        })
        this.bot.command('download', (context) => {
            let [ ,target] = context.message.text.split(' ');
            !!target ?
                this.downloadService.downloadTorrent(target, context) :
                context.reply('URI is required');
        });
    }

}

module.exports = TelegramBot
