const dotenv = require("dotenv");

dotenv.config();

// const PORT = process.env.PORT || 3000;
const PORT = 3001;

module.exports.PORT = PORT;

const TG_API_KEY = process.env.TELEGRAM_API_TOKEN;
module.exports.TG_API_KEY = TG_API_KEY;

const JOKE_API_RUS = "https://www.anekdot.ru/random/anekdot/";
module.exports.JOKE_API_RUS = JOKE_API_RUS;

const MEME_API_RUS = "https://www.anekdot.ru/random/mem/";
module.exports.MEME_API_RUS = MEME_API_RUS;

const TG_API_SEND_MESSAGE_URI = `https://api.telegram.org/bot${TG_API_KEY}/sendMessage`;
module.exports.TG_API_SEND_MESSAGE_URI = TG_API_SEND_MESSAGE_URI;

const DROPS_TAB_BALANCE =
	"https://api.icodrops.com/portfolio/api/portfolioGroup/individualShare/1ytxpqswtv";
module.exports.DROPS_TAB_BALANCE = DROPS_TAB_BALANCE;

const FOGKLOG_NEWS = "https://forklog.com/news";
module.exports.FOGKLOG_NEWS = FOGKLOG_NEWS;

const COIN_MARKET_CAP_API_KEY = process.env.CMC_API_KEY;
module.exports.COIN_MARKET_CAP_API_KEY = COIN_MARKET_CAP_API_KEY;

const BLOCK_TO_FI = "https://medium.com/@blockfito";
module.exports.BLOCK_TO_FI = BLOCK_TO_FI;

const WEATHER_KEY = process.env.WEATHER_API_KEY;
module.exports.WEATHER_KEY = WEATHER_KEY;

const ACTIVE_AIRDROPS = "https://airdrops.io/hot/";
module.exports.ACTIVE_AIRDROPS = ACTIVE_AIRDROPS;
