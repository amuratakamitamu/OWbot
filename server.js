//Discord.js v14

require('dotenv').config();


const { Client, Events, GatewayIntentBits, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
    client.user.setActivity("", { type: "PLAYING" });
    console.log("Startup complete. Bot is ready.");
});

var templates = ["ナイスゲーム!みんなこれからも頑張ってね!", "うん、やっぱ楽しくプレイすることが何よりも大事だよね", "いいでしょ、お母さん!あと5分だけやらせてよ!あ、間違えた", "すごい楽しかったよ!ナイスゲーム!", "もうおネンネの時間は過ぎてるけど...お母さんには内緒だよ"];

var blackList = ["ggez"];

client.on('messageCreate', async message => {
    for (let i = 0; i < blackList.length; i++) {
        if (message.content.includes(blackList[i]) && message.author.id != '1213767749210349588') {
            var random = Math.floor(Math.random() * 5);
            console.log("Word(s) detected ! num: " + random);
            message.reply("**" + message.author.username + "**" + ": " + templates[random]);
            if (message.content.includes("ggez")) {
                setTimeout(function () {
                    message.delete();
                }, 1000);
            }
            break;
        }
    }
    if (message.content.includes("!add_blacklist") && message.author.id != '1213767749210349588') {
        const word = message.content.split(" ")[1];
        console.log("Black list requested word: " + word);
        blackList.push(word);
        await message.reply(word + " をブラックリストに追加しました。");
    }
    if (message.content.includes("!help")) {
        await message.reply("ブラックリストに単語を登録するには、 `!add_blacklist {ブラックリストに登録したい単語}` を送信してください。(コマンドと単語の間には半角スペースが必要です。)");
        await message.reply("ブラックリストに登録された単語をリセットするには `!clear_blacklist` を送信してください。(ggezはデフォルトでオンなので消すことはできません。)");
        console.log("!help command detected");
    }
    if (message.content.includes("!clear_blacklist") && message.author.id != '1213767749210349588') {
        blackList = ["ggez"];
        await message.reply("ブラックリストがリセットされました。");
        console.log("The blacklist was cleared.");
    }
});



client.login(process.env.DISCORD_BOT_TOKEN);
