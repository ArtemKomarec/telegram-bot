const axios = require("axios");
const constants = require("../constants");

const getDropsTabBalance = async () => {
	const res = await axios.get(constants.DROPS_TAB_BALANCE);

	const currenciesList = res.data.portfolios.map((currency) => {
		return {
			name: currency.name,
			quantity: currency.quantity,
			price: currency.price.USD,
			profit: currency.netChange.ALL.USD,
			profitPercentage: currency.percentTotalChange.USD,
			totalPrice: currency.totalCap.USD,
		};
	});

	return {
		currentBalance: res.data.portfolioTotal.totalCap.USD,
		initialBalance: res.data.portfolioTotal.initialCap.USD,

		totalProfit: res.data.portfolioTotal.profit.USD,
		totalProfitPercentage: res.data.portfolioTotal.change.USD,

		dailyChangeBalance: res.data.portfolioTotal.change24hAbsolute.USD,
		dailyChangePercentage: res.data.portfolioTotal.change24hPercent.USD,

		portfolio: currenciesList,
	};
};

module.exports.getDropsTabBalance = getDropsTabBalance;
