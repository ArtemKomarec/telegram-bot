const rootIndex = require("..");
const CoinMarketCapService = require("../services/coin-market-cap");
const randomJoke = require("../services/joke");
const randomMeme = require("../services/memes");
const fundBalance = require("../services/dropstab");
const printFund = require("../utils");
const news = require("../services/news");
const activities = require("../services/drops");

const convertCurrencyHandler = async (msg, match) => {
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
			`Неправильный формат сообщения. Пример: /convert 0.05 btc`
		);
	}
};

module.exports.convertCurrencyHandler = convertCurrencyHandler;

const getJokeHandler = async (msg) => {
	const chatId = msg.chat.id;
	const joke = await randomJoke.getRandomJoke();
	rootIndex.bot.sendMessage(chatId, joke + "\n");
};

const getMemeHandler = async (msg) => {
	const chatId = msg.chat.id;
	const meme = await randomMeme.getRandomMeme();
	rootIndex.bot.sendPhoto(chatId, meme);
};

module.exports.getMemeHandler = getMemeHandler;

module.exports.getJokeHandler = getJokeHandler;

const getDropsTabProfileHandler = async (msg) => {
	const chatId = msg.chat.id;
	const balance = await fundBalance.getDropsTabBalance();
	const mess = printFund.fundInfoHandler(balance);
	rootIndex.bot.sendMessage(chatId, mess, {
		parse_mode: "HTML",
	});
};

module.exports.getDropsTabProfileHandler = getDropsTabProfileHandler;

const getAllAirdrops = async (msg) => {
	const chatId = msg.chat.id;
	const activitiesList = await activities.getActivities();
	console.log(activitiesList);
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

module.exports.getAllAirdrops = getAllAirdrops;

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

const newMessageHandler = async (msg) => {
	if (typeof msg.text !== "undefined") {
		const messageText = msg.text.toUpperCase();
		console.log(rootIndex.availableСurrencies);
		if (
			rootIndex.availableСurrencies?.find(({ slug }) => slug === messageText)
		) {
			console.log("a");
			const rates = await CoinMarketCapService.getExchangeRatesBySlugs([
				messageText,
			]);

			rates.forEach((rate) => {
				console.log(rate.info);
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
			console.log(msg.chat.id);
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
