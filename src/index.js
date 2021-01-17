const TelegramBot = require('./TelegramBot');
const telegramBot = new TelegramBot();

telegramBot.init().then(
    () => {
        console.log('Telegram initialized');
    }
).catch(
    (err) => {
        console.log('ERROR: ' + JSON.stringify(err));
        process.exit(1);
    }
)
