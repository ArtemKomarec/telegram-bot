const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const constants = require("../constants");

const getRandomMeme = async () => {
	const res = await axios.get(constants.MEME_API_RUS);
	const {
		window: { document },
	} = new JSDOM(res.data);
	const memeList = document.querySelectorAll(".topicbox[data-id] div.text img");

	const randomMemeIndex = Math.floor(Math.random() * memeList.length - 1);

	if (memeList[randomMemeIndex]) {
		return memeList[randomMemeIndex].src;
	} else {
		return "http://risovach.ru/upload/2014/10/mem/hvatit-eto-terpet-zhirinovskij_64501804_orig_.jpg";
	}
};

module.exports.getRandomMeme = getRandomMeme;
