const express = require("express");
const constants = require("./constants");
const CoinMarketCapService = require("./services/coin-market-cap");
const messageController = require("./controllers/message");
const { Input } = require("telegraf");
const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");

dotenv.config();
// // import cron from 'node-cron'

const app = express();

app.use(
	express.json(),
	express.urlencoded({
		extended: true,
	})
);

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

const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);
bot.hears(
	/\/joke/,
	async (ctx) => await ctx.reply(await messageController.getJokeHandler())
);

bot.hears(
	/\/meme/,
	async (ctx) =>
		await ctx.replyWithPhoto(
			Input.fromURL(await messageController.getMemeHandler())
		)
);

bot.hears(
	/\/to_usdt (?<value>.+) (?<curr>.+)/,
	async (ctx) => await messageController.convertCurrencyToUsdt(ctx)
);

bot.hears(
	/\/to_coin (?<value>.+) (?<curr>.+)/,
	async (ctx) => await messageController.convertUsdtToCurrency(ctx)
);

bot.hears(
	/\/fund/,
	async (ctx) => await messageController.getDropsTabProfileHandler(ctx)
);

bot.on("new_chat_members", async (ctx) => messageController.newChatMember(ctx));
bot.on("left_chat_member", async (ctx) =>
	messageController.leftChatMember(ctx)
);

bot.hears(
	/\/weather_today (?<town>.+)/,
	async (ctx) => await messageController.getWeatherToday(ctx)
);
bot.hears(
	/\/weather_tomorrow (?<town>.+)/,
	async (ctx) => await messageController.getWeatherTomorrow(ctx)
);

// bot.onText(/\/fund/, messageController.getDropsTabProfileHandler);
// bot.onText(/\/news/, messageController.getTopNews);
// bot.onText(/\/meme/, messageController.getMemeHandler);
// bot.onText(/\/activities/, messageController.getAllActivities);
// bot.onText(/\/global/, messageController.getGlobalCurrInfo);
// bot.onText(/\/weather_today (.+)/, messageController.getWeatherToday);
// bot.onText(/\/weather_tomorrow (.+)/, messageController.getWeatherTomorrow);
bot.on(
	"message",
	async (ctx) => await messageController.newMessageHandler(ctx)
);

bot.start((ctx) => ctx.reply("Welcome"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

app.listen(constants.PORT, async () => {
	console.log(`Server running on port ${constants.PORT}`);
	const data = await CoinMarketCapService.getAllSlugsRequest();
	availableСurrencies = CoinMarketCapService.getAllSlugs();
	console.log(availableСurrencies);
	module.exports.availableСurrencies = availableСurrencies;
});
