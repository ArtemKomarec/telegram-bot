const axios = require("axios");
const jsdom = require("jsdom");
const {
  JSDOM
} = jsdom;
const constants = require("../constants");
const getRandomJoke = async () => {
  const res = await axios.get(constants.JOKE_API_RUS);
  const {
    window: {
      document
    }
  } = new JSDOM(res.data);
  const jokesList = document.querySelectorAll(".topicbox[data-id] div.text");
  const randomJokeIndex = Math.floor(Math.random() * jokesList.length - 1);
  if (jokesList[randomJokeIndex]) {
    return jokesList[randomJokeIndex].innerHTML;
  } else {
    return "Анекдотов нет, расходимся";
  }
};
module.exports.getRandomJoke = getRandomJoke;
//# sourceMappingURL=joke.js.map