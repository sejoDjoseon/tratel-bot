const Telegraf = require('telegraf');
const TorrentManager = require('./TorrentManager');
require('dotenv').config();


   class TelegramBot {

    downloadContext = undefined;

    constructor() {
        this.bot = new Telegraf(process.env.TELEGRAM_BOT_KEY);
        this.torrentManager = new TorrentManager();
    }

    async init() {
        this._setCommands();
        console.log('Launching bot...');
        await this.bot.launch();

        this.torrentManager.onDownloadStart = (gid) => { this.downloadContext.reply("Your torrent download started with id: #"+ gid.substr(0, 6)) }

        this.torrentManager.onDownloadComplete = (gid) => { this.downloadContext.reply("Your torrent : #" + gid.substr(0, 6) + " was downloaded successfully"); }

        this.torrentManager.onDownloadError = (gid) => { this.downloadContext.reply("Cannot download torrent: #" + gid.substr(0, 6) + " revise the URI"); }

        console.log('Initializing torrent manager...');
        await this.torrentManager.init();
    }

    _setCommands () {
        this.bot.command('help', async (context) => {
            await context.reply('To download a torrent you must use /download command, and provide me the URI of the torrent/magnet like the following example: \n /download https://www.miaumiau.baz/UwuUwu');
        });
        this.bot.command('start', async (context) => {
            await context.reply("I'm ready to download any torrent you want, write /help to show the basics");
        })
        this.bot.command('progress', async (context) => {
            const progress = await this.torrentManager.getTorrentProgress();
            await context.reply(progress.toString());
        })
        this.bot.command('errors', async (context) => {
            const errors = await this.torrentManager.getErrors();
            await context.reply(`Errors:\n${JSON.stringify(errors)}`);
        })
        this.bot.command('status', async (context) => {
            const stat = await this.torrentManager.getGlobalStat();
            await context.reply(`Status:\n${JSON.stringify(stat)}`);
        })
        this.bot.command('restart', async (context) => {
            await context.reply(`Restarting torrent manager...`);
            await this.torrentManager.shutdown();
            await this.torrentManager.init();
            await context.reply(`Torrent manager restarted`);
        })
        this.bot.command('download', async (context) => {
            let [ ,target, folder] = context.message.text.split(' ');

            if (!!target) {
                this.downloadContext = context;
                await this.torrentManager.downloadTorrent(target, folder);
            } else {
                context.reply('URI is required');
            }
        });
    }

}

module.exports = TelegramBot
