const rootIndex = require("..");
const CoinMarketCapService = require("../services/coin-market-cap");
const randomJoke = require("../services/joke");
const randomMeme = require("../services/memes");
const fundBalance = require("../services/dropstab");
const printFund = require("../utils");
const news = require("../services/news");
const activities = require("../services/activities");
const weatherService = require("../services/weather");

const getJokeHandler = async (msg) => {
	const chatId = msg.chat.id;
	const joke = await randomJoke.getRandomJoke();
	rootIndex.bot.sendMessage(chatId, joke.replace(/<br>|<br\/>/gi, "\n"));
};

module.exports.getJokeHandler = getJokeHandler;

const getMemeHandler = async (msg) => {
	const chatId = msg.chat.id;
	const meme = await randomMeme.getRandomMeme();
	rootIndex.bot.sendPhoto(chatId, meme);
};

module.exports.getMemeHandler = getMemeHandler;

const getDropsTabProfileHandler = async (msg) => {
	const chatId = msg.chat.id;
	const balance = await fundBalance.getDropsTabBalance();
	const mess = printFund.fundInfoHandler(balance);
	rootIndex.bot.sendMessage(chatId, mess, {
		parse_mode: "HTML",
	});
};

module.exports.getDropsTabProfileHandler = getDropsTabProfileHandler;

const getAllActivities = async (msg) => {
	const chatId = msg.chat.id;
	const activitiesList = await activities.getActivities();
	let responseText = "";
	activitiesList.map((activity) => {
		responseText += `
<b>${activity.activityName}</b>
${activity.description}
Ссылка на статью - ${activity.link}
		`;
	});
	rootIndex.bot.sendMessage(chatId, responseText, {
		parse_mode: "HTML",
	});
};

module.exports.getAllActivities = getAllActivities;

const getTopNews = async (msg) => {
	const chatId = msg.chat.id;
	const newsList = await news.getNews();
	let responseText = "";
	newsList.map((news) => {
		responseText += `<b>${news.header}</b>
${news.content} 
Ссылка на статью - ${news.link} \n`;
	});
	rootIndex.bot.sendMessage(chatId, responseText, {
		parse_mode: "HTML",
	});
};

module.exports.getTopNews = getTopNews;

const convertCurrencyToUsdt = async (msg, match) => {
	const chatId = msg.chat.id;
	const price = await CoinMarketCapService.getExchangeRateBySlug(
		match.groups.curr
	);
	const convertedPrice = price * Number(match.groups.value);
	if (convertedPrice) {
		rootIndex.bot.sendMessage(
			chatId,
			`${convertedPrice.toFixed(2)}\uD83D\uDCB5`
		);
	} else {
		rootIndex.bot.sendMessage(
			chatId,
			`Неправильный формат сообщения. Пример: /convertToUsdt 0.05 btc`
		);
	}
};

module.exports.convertCurrencyToUsdt = convertCurrencyToUsdt;

const convertUsdtToCurrency = async (msg, match) => {
	const chatId = msg.chat.id;
	const currency = match.groups.curr;
	const price = await CoinMarketCapService.getExchangeRateBySlug(currency);
	const coinQuaintity = Number(match.groups.value) / price;

	if (coinQuaintity) {
		rootIndex.bot.sendMessage(
			chatId,
			`${coinQuaintity.toFixed(8) + " " + currency.toUpperCase()}`
		);
	} else {
		rootIndex.bot.sendMessage(
			chatId,
			"Неправильный формат сообщения.\nПример: /convertToCoin 100(means usdt) btc(coin which you want)"
		);
	}
};

module.exports.convertUsdtToCurrency = convertUsdtToCurrency;

const getGlobalCurrInfo = async (msg) => {
	const chatId = msg.chat.id;
	const marketinfo = await CoinMarketCapService.marketLatestQuotes();
	rootIndex.bot.sendMessage(
		chatId,
		`
Доминация битка: ${Number(marketinfo.btcDomination).toFixed(2)}%
Доминация эфира: ${Number(marketinfo.ethDomination).toFixed(2)}%
Общий объем рынка сегодня: ${Number(marketinfo.totalMarketCap).toFixed(2)}$
Объем Defi сегодня: ${Number(marketinfo.defiCap).toFixed(2)}$
Объем Стейблов сегодня: ${Number(marketinfo.stablesCap).toFixed(2)}$
Объем маржинальной торговли сегодня: ${Number(
			marketinfo.derivativesCap
		).toFixed(2)}$
	`
	);
};

module.exports.getGlobalCurrInfo = getGlobalCurrInfo;

const newMessageHandler = async (msg) => {
	const works = true;
	if (typeof msg.text !== "undefined") {
		const messageText = msg.text.toUpperCase();
		if (
			rootIndex.availableСurrencies?.find(({ slug }) => slug === messageText)
		) {
			const rates = await CoinMarketCapService.getExchangeRatesBySlugs([
				messageText,
			]);

			rates.forEach((rate) => {
				const responseText = `
Название: ${rate.currency}
Цена: ${rate.value}
Блокчейн: ${rate.blockhain}
Изменения за 24 часа: ${rate.dayChange}`;
				rootIndex.bot.sendMessage(msg.chat.id, responseText);
			});
		} else if (messageText === "Да это бред".toUpperCase()) {
			rootIndex.bot.sendMessage(msg.chat.id, "Согласен");
		} else if (
			messageText === "Пошел нахуй".toUpperCase() ||
			messageText === "Пошёл нахуй".toUpperCase() ||
			messageText === "Иди нахуй".toUpperCase()
		) {
			rootIndex.bot.sendMessage(msg.chat.id, "Сам пошел");
		} else if (messageText === "Бля".toUpperCase()) {
			rootIndex.bot.sendMessage(msg.chat.id, "Не ругайся");
		}
	}
};

module.exports.newMessageHandler = newMessageHandler;

const newChatMember = (msg) => {
	const chatId = msg.chat.id;
	rootIndex.bot.sendPhoto(
		chatId,
		"https://avatars.mds.yandex.net/get-images-cbir/516543/hWbMF_mtRBHJcXd17iP-5A4300/ocr",
		{
			caption: `Добро пожаловать, ${msg.new_chat_member.first_name}. Запомни эти простые правила`,
		}
	);
};

module.exports.newChatMember = newChatMember;

const leftChatMember = (msg) => {
	const chatId = msg.chat.id;
	rootIndex.bot.sendMessage(
		chatId,
		`Давай, ${msg.left_chat_participant.first_name}, до свидания`
	);
};

module.exports.leftChatMember = leftChatMember;

const getWeatherByLocation = async (msg, match) => {
	const chatId = msg.chat.id;
	const location = match[1];
	const res = await weatherService.getWeather(location);
	rootIndex.bot.sendMessage(
		chatId,
		`
Сегодня: <b>${res.today}</b>
Описание: ${res.description}
Ночью: от <b>${res.night.min}</b> до <b>${res.night.max}</b>
Утром: от <b>${res.morning.min}</b> до <b>${res.morning.max}</b>
Днем: от <b>${res.day.min}</b> до <b>${res.day.max}</b>
Вечером: от <b>${res.evening.min}</b> до <b>${res.evening.max}</b>
	`,
		{ parse_mode: "HTML" }
	);
};

module.exports.getWeatherByLocation = getWeatherByLocation;
