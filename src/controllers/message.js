const rootIndex = require("..");
const CoinMarketCapService = require("../services/coin-market-cap");
const randomJoke = require("../services/joke");
const randomMeme = require("../services/memes");
const fundBalance = require("../services/dropstab");
const printFund = require("../utils");
const news = require("../services/news");
const activities = require("../services/activities");
const weatherService = require("../services/weather");
const translate = require("translate");

const getJokeHandler = async () => {
	const joke = await randomJoke.getRandomJoke();
	return joke.replace(/<br>|<br\/>/gi, "\n");
};

module.exports.getJokeHandler = getJokeHandler;

const getMemeHandler = async () => {
	const meme = await randomMeme.getRandomMeme();
	return meme;
};

module.exports.getMemeHandler = getMemeHandler;

// const getDropsTabProfileHandler = async (msg) => {
// 	const chatId = msg.chat.id;
// 	const balance = await fundBalance.getDropsTabBalance();
// 	const mess = printFund.fundInfoHandler(balance);
// 	rootIndex.bot.sendMessage(chatId, mess, {
// 		parse_mode: "HTML",
// 	});
// };

// module.exports.getDropsTabProfileHandler = getDropsTabProfileHandler;

// const getAllActivities = async (msg) => {
// 	const chatId = msg.chat.id;
// 	const activitiesList = await activities.getActivities();
// 	let responseText = "";
// 	activitiesList.map((activity) => {
// 		responseText += `
// <b>${activity.activityName}</b>
// ${activity.description}
// Ссылка на статью - ${activity.link}
// 		`;
// 	});
// 	rootIndex.bot.sendMessage(chatId, responseText, {
// 		parse_mode: "HTML",
// 	});
// };

// module.exports.getAllActivities = getAllActivities;

// const getTopNews = async (msg) => {
// 	const chatId = msg.chat.id;
// 	const newsList = await news.getNews();
// 	let responseText = "";
// 	newsList.map((news) => {
// 		responseText += `<b>${news.header}</b>
// ${news.content}
// Ссылка на статью - ${news.link} \n`;
// 	});
// 	rootIndex.bot.sendMessage(chatId, responseText, {
// 		parse_mode: "HTML",
// 	});
// };

// module.exports.getTopNews = getTopNews;

// const convertCurrencyToUsdt = async (msg, match) => {
// 	const chatId = msg.chat.id;
// 	const price = await CoinMarketCapService.getExchangeRateBySlug(
// 		match.groups.curr
// 	);
// 	const convertedPrice = price * Number(match.groups.value);
// 	if (convertedPrice) {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			`${convertedPrice.toFixed(2)}\uD83D\uDCB5`
// 		);
// 	} else {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			`Неправильный формат сообщения. Пример: /to_usdt 0.05 btc`
// 		);
// 	}
// };

// module.exports.convertCurrencyToUsdt = convertCurrencyToUsdt;

// const convertUsdtToCurrency = async (msg, match) => {
// 	const chatId = msg.chat.id;
// 	const currency = match.groups.curr;
// 	const price = await CoinMarketCapService.getExchangeRateBySlug(currency);
// 	const coinQuaintity = Number(match.groups.value) / price;

// 	if (coinQuaintity) {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			`${coinQuaintity.toFixed(8) + " " + currency.toUpperCase()}`
// 		);
// 	} else {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			"Неправильный формат сообщения.\nПример: /to_coin 100(means usdt) btc(coin which you want)"
// 		);
// 	}
// };

// module.exports.convertUsdtToCurrency = convertUsdtToCurrency;

// const getGlobalCurrInfo = async (msg) => {
// 	const chatId = msg.chat.id;
// 	const marketinfo = await CoinMarketCapService.marketLatestQuotes();
// 	rootIndex.bot.sendMessage(
// 		chatId,
// 		`
// <b>Доминация битка:</b> ${Number(marketinfo.btcDomination).toFixed(2)}%
// <b>Доминация эфира:</b> ${Number(marketinfo.ethDomination).toFixed(2)}%
// <b>Объем рынка сегодня:</b> ${Number(marketinfo.totalMarketCap).toFixed(2)}$
// <b>Объем Defi сегодня:</b> ${Number(marketinfo.defiCap).toFixed(2)}$
// <b>Объем Стейблов сегодня:</b> ${Number(mar > ketinfo.stablesCap).toFixed(2)}$
// <b>Объем маржинальной торговли сегодня:</b> ${Number(
// 			marketinfo.derivativesCap
// 		).toFixed(2)}$
// 	`
// 	);
// };

// module.exports.getGlobalCurrInfo = getGlobalCurrInfo;

const newMessageHandler = async (msg) => {
	try {
		if (typeof msg !== "undefined" && msg !== "") {
			const messageText = msg.update.message.text.toUpperCase();
			if (
				rootIndex.availableСurrencies?.find(({ slug }) => slug === messageText)
			) {
				const rates = await CoinMarketCapService.getExchangeRatesBySlugs([
					messageText,
				]);
				console.log(rates);
				const responseText = `
Название: ${rates[0].currency}
Цена: ${rates[0].value}
Блокчейн: ${rates[0].blockhain}
Изменения за 24 часа: ${rates[0].dayChange}`;
				msg.reply(responseText);
			} else if (messageText === "Да это бред".toUpperCase()) {
				msg.reply("Согласен");
			} else if (
				messageText === "Пошел нахуй".toUpperCase() ||
				messageText === "Пошёл нахуй".toUpperCase() ||
				messageText === "Иди нахуй".toUpperCase()
			) {
				msg.reply("Сам пошел");
			} else if (messageText === "Бля".toUpperCase()) {
				msg.reply("Не ругайся");
			}
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports.newMessageHandler = newMessageHandler;

// const newChatMember = (msg) => {
// 	const chatId = msg.chat.id;
// 	rootIndex.bot.sendPhoto(
// 		chatId,
// 		"https://avatars.mds.yandex.net/get-images-cbir/516543/hWbMF_mtRBHJcXd17iP-5A4300/ocr",
// 		{
// 			caption: `Добро пожаловать, ${msg.new_chat_member.first_name}. Запомни эти простые правила`,
// 		}
// 	);
// };

// module.exports.newChatMember = newChatMember;

// const leftChatMember = (msg) => {
// 	const chatId = msg.chat.id;
// 	rootIndex.bot.sendMessage(
// 		chatId,
// 		`Давай, ${msg.left_chat_participant.first_name}, до свидания`
// 	);
// };

// module.exports.leftChatMember = leftChatMember;

// const getWeatherToday = async (msg, match) => {
// 	const chatId = msg.chat.id;
// 	let location = match[1];
// 	const res = await weatherService.getWeatherDayInfo(location, true);
// 	location = await translate(location, "ru");
// 	if (res) {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			`
// Сегодня: <b>${res.today}</b> <b>${location}</b>
// Описание: ${res.description}
// Ночью: от <b>${res.night.min}&#8451;</b>  до  <b>${res.night.max}&#8451;</b>
// Утром: от <b>${res.morning.min}&#8451;</b>  до  <b>${res.morning.max}&#8451;</b>
// Днем: от <b>${res.day.min}&#8451;</b>  до  <b>${res.day.max}&#8451;</b>
// Вечером: от <b>${res.evening.min}&#8451;</b>  до  <b>${res.evening.max}&#8451;</b>
// 		`,
// 			{ parse_mode: "HTML" }
// 		);
// 	} else {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			"Такого города не существует. Попробуйте снова"
// 		);
// 	}
// };

// module.exports.getWeatherToday = getWeatherToday;

// const getWeatherTomorrow = async (msg, match) => {
// 	const chatId = msg.chat.id;
// 	let location = match[1];
// 	const res = await weatherService.getWeatherDayInfo(location, false);
// 	location = await translate(location, "ru");
// 	if (res) {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			`
// Завтра: <b>${res.today}</b> <b>${location}</b>
// Описание: ${res.description}
// Ночью: от <b>${res.night.min}&#8451;</b>  до  <b>${res.night.max}&#8451;</b>
// Утром: от <b>${res.morning.min}&#8451;</b>  до  <b>${res.morning.max}&#8451;</b>
// Днем: от <b>${res.day.min}&#8451;</b>  до  <b>${res.day.max}&#8451;</b>
// Вечером: от <b>${res.evening.min}&#8451;</b>  до  <b>${res.evening.max}&#8451;</b>
// 		`,
// 			{ parse_mode: "HTML" }
// 		);
// 	} else {
// 		rootIndex.bot.sendMessage(
// 			chatId,
// 			"Такого города не существует. Попробуйте снова"
// 		);
// 	}
// };

// module.exports.getWeatherTomorrow = getWeatherTomorrow;
