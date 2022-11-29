const CoinMarketCap = require("coinmarketcap-api");
const constants = require("../constants");

let allSlugsCurr = [];

const getExchangeRatesBySlugs = async (currencySlugs) => {
  const client = new CoinMarketCap(constants.COIN_MARKET_CAP_API_KEY);
  const res = await client.getQuotes({ symbol: [...currencySlugs] });
  const rates = Object.values(res.data).map((rate) => {
    let tokenPrice = Number(rate.quote.USD.price).toFixed(3);
    tokenPrice = String(tokenPrice) + " " + "Usdt";

    let blockhain = '';
    if (rate.platform) {
      blockhain = rate.platform.name;
    } else {
      blockhain = rate.name;
    }
    let percentChange = Number(rate.quote.USD.percent_change_24h).toFixed(2);
    percentChange = String(percentChange) + " " + "%";

    return {
      info: rate,
      currency: rate.name,
      value: tokenPrice,
      blockhain: blockhain,
      dayChange: percentChange,
    };
  });

  return rates;
};

module.exports.getExchangeRatesBySlugs = getExchangeRatesBySlugs;

const getAllSlugsRequest = async () => {
  const client = new CoinMarketCap(constants.COIN_MARKET_CAP_API_KEY);
  const res = await client.getTickers({ limit: 5000 });
  // струпи -> пасхалочка ( ОЧКА )
  allSlugsCurr = Object.values(res.data).map((slug) => {
    return {
      slug: slug.symbol,
    };
  });

  return allSlugsCurr;
};

module.exports.getAllSlugsRequest = getAllSlugsRequest;

const getAllSlugs = () => allSlugsCurr;
module.exports.getAllSlugs = getAllSlugs;

const getExchangeRateBySlug = async (slug) => {
  const client = new CoinMarketCap(constants.COIN_MARKET_CAP_API_KEY);
  const currencySlug = slug.toUpperCase();
  const res = await client.getQuotes({ symbol: currencySlug })
  const price = (res.data[currencySlug].quote.USD.price).toFixed(3);
  return price;
};
module.exports.getExchangeRateBySlug = getExchangeRateBySlug;
