const dotenv = require("dotenv");
dotenv.config();

// const PORT = process.env.PORT || 3000;
const PORT = 3001;
module.exports.PORT = PORT;

// const TG_API_KEY = process.env.TELEGRAM_API_TOKEN;
// module.exports.TG_API_KEY = TG_API_KEY;

const JOKE_API_RUS = "https://www.anekdot.ru/random/anekdot/";
module.exports.JOKE_API_RUS = JOKE_API_RUS;
const MEME_API_RUS = "https://www.anekdot.ru/random/mem/";
module.exports.MEME_API_RUS = MEME_API_RUS;
const TG_API_SEND_MESSAGE_URI = `https://api.telegram.org/bot5823108134:AAHy0ykLMcpgyV77M-rqyTty0bwzT6eBZRA/sendMessage`;
module.exports.TG_API_SEND_MESSAGE_URI = TG_API_SEND_MESSAGE_URI;
const DROPS_TAB_BALANCE = "https://api.icodrops.com/portfolio/api/portfolioGroup/individualShare/1ytxpqswtv";
module.exports.DROPS_TAB_BALANCE = DROPS_TAB_BALANCE;
const FOGKLOG_NEWS = "https://forklog.com/news";
module.exports.FOGKLOG_NEWS = FOGKLOG_NEWS;
const COIN_MARKET_CAP_API_KEY = "62f01a4f-c849-4699-89c4-5791c0ec1c24";
module.exports.COIN_MARKET_CAP_API_KEY = COIN_MARKET_CAP_API_KEY;
//# sourceMappingURL=constants.js.map