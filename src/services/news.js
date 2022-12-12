const axios = require("axios");
const { JSDOM } = require("jsdom");
const FOGKLOG_NEWS = require("../constants");

const getNews = async () => {
    const res = await axios.get(FOGKLOG_NEWS.FOGKLOG_NEWS);
    const { window: { document } } = new JSDOM(res.data);

    const newsList = document.querySelectorAll('.cell[data-entity]');
    const topNews = Array.apply(null, newsList).slice(0,3).map((news) => ({ 
        "header": news.querySelector('p').innerHTML,
        "content": news.querySelector('.post_excerpt').innerHTML,
        "link": news.querySelector('a').href
    }));
    return topNews;
}

module.exports.getNews = getNews;