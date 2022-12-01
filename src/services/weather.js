const axios = require("axios");
const constants = require("../constants");
const translate = require("translate");

translate.engine = "google";

const getWeather = async (location) => {
	const res = await axios.get(
		`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${constants.WEATHER_KEY}`
	);
	const weatherInfo = res.data.days[0];
	let night = [];
	let morning = [];
	let day = [];
	let evening = [];
	weatherInfo.hours.map((hour) => {
		const currHour = Number(hour.datetime.slice(0, 2));
		if (currHour < 5) {
			night.push(hour.temp);
		} else if (currHour > 4 && currHour < 11) {
			morning.push(hour.temp);
		} else if (currHour > 10 && currHour < 18) {
			day.push(hour.temp);
		} else {
			evening.push(hour.temp);
		}
	});
	night = getTemperatureValue(night);
	morning = getTemperatureValue(morning);
	day = getTemperatureValue(day);
	evening = getTemperatureValue(evening);
	const description = await translate(weatherInfo.description, "ru");
	return {
		today: weatherInfo.datetime,
		description: description,
		night: night,
		morning: morning,
		day: day,
		evening: evening,
	};
};

module.exports.getWeather = getWeather;

const getTemperatureValue = (temprature) => {
	const min = ((5 / 9) * (Math.min.apply(Math, temprature) - 32)).toFixed(1);
	const max = ((5 / 9) * (Math.max.apply(Math, temprature) - 32)).toFixed(1);
	return {
		min: min,
		max: max,
	};
};
