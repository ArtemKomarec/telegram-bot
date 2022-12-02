// const express = require("express");
// const constants = require("./constants");
// const CoinMarketCapService = require("./services/coin-market-cap");
// const TelegramBot = require("node-telegram-bot-api");
// const messageController = require("./controllers/message");

// // import cron from 'node-cron'

// const app = express();

// app.use(
// 	express.json(),
// 	express.urlencoded({
// 		extended: true,
// 	})
// );

// // const notes = [{
// // 	chatId: -895694621,
// // 	time: '15:11 12:18',
// // 	text: 'отдыхать'
// // }];

// // const task = cron.schedule('*/1 * * * *', () => {
// // 	notes.foreach((note) =>{
// // 		  bot.sendMessage(note['chatId'], 'Напоминаю, что вы должны: '+ note['text'] + ' сейчас.');
// // 	})
// // 	console.log('running a task every minute');
// // });

// const bot = new TelegramBot("5823108134:AAHy0ykLMcpgyV77M-rqyTty0bwzT6eBZRA", {
// 	polling: true,
// });

// bot.re

// module.exports.bot = bot;
// let availableСurrencies = [];

// bot.onText(
// 	/\/to_usdt (?<value>.+) (?<curr>.+)/,
// 	messageController.convertCurrencyToUsdt
// );
// bot.onText(
// 	/\/to_coin (?<value>.+) (?<curr>.+)/,
// 	messageController.convertUsdtToCurrency
// );
// bot.onText(/\/joke/, messageController.getJokeHandler);
// bot.onText(/\/fund/, messageController.getDropsTabProfileHandler);
// bot.onText(/\/news/, messageController.getTopNews);
// bot.onText(/\/meme/, messageController.getMemeHandler);
// bot.onText(/\/activities/, messageController.getAllActivities);
// bot.onText(/\/global/, messageController.getGlobalCurrInfo);
// bot.onText(/\/weather_today (.+)/, messageController.getWeatherToday);
// bot.onText(/\/weather_tomorrow (.+)/, messageController.getWeatherTomorrow);

// bot.on("new_chat_members", messageController.newChatMember);
// bot.on("left_chat_member", messageController.leftChatMember);
// bot.on("message", messageController.newMessageHandler);
// bot.on("polling_error", console.log);

// app.listen(constants.PORT, async () => {
// 	console.log(`Server running on port ${constants.PORT}`);
// 	const data = await CoinMarketCapService.getAllSlugsRequest();
// 	availableСurrencies = CoinMarketCapService.getAllSlugs();
// 	module.exports.availableСurrencies = availableСurrencies;
// });
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
