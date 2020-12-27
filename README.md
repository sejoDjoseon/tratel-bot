## TratelBot
Sleek and intuitive package to handle `aria2c` torrent downloader with telegram bot using `Telegram API` and ``Node.js``.
You can pass him a URI, and he'll notify when torrent status changes: when download start, end and throw an error.

## Table of contents

- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Creators](#creators)

## Quick start
1. Clone the repository
  
2. Install `aria2c` with your package manager, e.g. in Fedora run in Terminal:
    ````bash
    sudo yum install aria2c
    ````
3. Create new Telegram Bot using `BotFather` in Telegram app and keep bot token ID.
  https://core.telegram.org/bots#3-how-do-i-create-a-bot
  
4. Create .env on root inside the project and set this global variables, if DOWNLOAD_DIR is not specified the files will be downloaded inside project:
    ````.dotenv
    TELEGRAM_BOT_KEY={Your_bot_token_id}
    DOWNLOAD_DIR={Your_relative_path_to_download_dir}
    ````
5. Install all required packages
    ````bash
    npm i
    ````
6. Run project
    ````bash
    npm start
    ````
7. Open Telegram and start a chat with your bot, you must pass him a torrent URI in the following ways:
    - For magnets
        ````text
        /download magnet:?xt=urn:btih:b90949bd0cf6a6e06535cc0ca62df2d97cbf6860&dn=%5BErai-raws%5D%20Jujutsu%20Kaisen%20-%2013%20%5B1080p%5D%5BMultiple%20Subtitle%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2F
        ````
    - For torrent files:
        ````text
        /download https://rarbgmirror.org/download.php?id=fxt6obs&h=ba5&f=Mr.Queen.S01E05.KOREAN.1080p.WEBRip.AAC2.0.x264-AppleTor%5Brartv%5D-[rarbg.to].torrent
        ````
  ## Bugs and feature requests
   - Have a bug, or a feature request? Search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/sejoDjoseon/tratel-bot/issues/new).

  ## Contributing
  - Feel free to contribute if you want to implement new features, just do a PR, and we'll revise it ASAP.
  
  ## Creators
   - Sergio Morales 
   - Joan Grau 
   - Pau Riera 
   - Pau Segués
    
