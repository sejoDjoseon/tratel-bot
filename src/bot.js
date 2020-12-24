const Telegraf = require('telegraf');
const DownloadService = require('./downloadService');
require('dotenv').config();


   class PlexBot {
    constructor(apikey) {
        this.bot = new Telegraf(apikey);
        this.downloadService = new DownloadService()
        this.init();
    }

    async init() {
        this._setCommands();
        this.bot.launch();
    }

    _setCommands () {
        this.bot.command('help', (context) => {
            console.log(context.message.text);
        });

        this.bot.command('download', (context) => {
            let [ ,downloadMethod, target ] = context.message.text.split(' ');
            if (downloadMethod === 'magnet' || downloadMethod === 'torrent') {
                !!target ?
                    this.downloadService.download(downloadMethod, target) :
                    context.reply('Target is required');
            } else {
                context.reply('The first param should be "torrent" || "magnet"');
            }
        });

        this.bot.command('torrent', (context) => {
            let [, target] = context.message.text.split(' ');
            console.log(target);
        });

        this.bot.command('start', (context) => {
            context.reply('Hola ninios, os voy a ayudar a descargar torrents toh facil, escribid /help para obtener los comandos');
        });

    }
    downloadFile(downloadMethod, target) {
        // downloadMethod === 'magnet' ?
    }
    openTerminal () {

    }

    getStatus() {
        // if stopping torrent returns error
    }
}

const bot = new PlexBot(process.env.TELEGRAM_BOT_KEY);
