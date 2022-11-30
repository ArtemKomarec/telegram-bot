const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const constants = require("../constants");

const getActivities = async () => {
	const res = await axios.get("https://medium.com/@blockfito");
	const {
		window: { document },
	} = new JSDOM(res.data);
	const blockFiTo = document.querySelectorAll("article");
	const activitiesList = Array.apply(null, blockFiTo)
		.slice(0, 5)
		.map((activity, index) => {
			const url = activity
				.querySelector("a")
				.href.substring(0, activity.querySelector("a").href.indexOf("?"));
			console.log(url);
			return {
				activityName: activity.querySelector("h2").innerHTML,
				description: activity.querySelector(
					"main > div > div > div > div > article > div > div > div > div > div > div > div > div > div > div > div > div > div > div > a > div > p"
				).innerHTML,
				link: `https://medium.com${url}`,
			};
		});
	return activitiesList;
};

module.exports.getActivities = getActivities;
