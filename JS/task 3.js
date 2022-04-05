function tweet(id, text, createdAt, author) {
  this.id = id;
  this.text = text;
  this.createdAt = createdAt;
  this.author = author;
  this.comments = [];
}
function comment(id, text, createdAt, author) {
  this.id = id;
  this.text = text;
  this.createdAt = createdAt;
  this.author = author;
}
const arrTweets = [];
let _id = 0;
//автоматическое создание твитов для тестов
const loremIpsum = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit amet",
  "consectetur",
  "adipiscing",
  "elit",
  "Suspendisse",
  "aliquet",
  "turpis",
  "et",
  "mauris",
  "efficitur",
  "vel",
  "venenatis",
  "sem",
  "sollicitudin",
  "Mauris",
  "vulputate",
  "id",
  "nisi",
  "ac",
];
let defaultDate = new Date(1971, 0, 1);
let defaultUser = "Иван";
let defaultHashtag = "js";
for (let i = 0; i < 20; i++) {
  let string = `${loremIpsum[_id]} ${loremIpsum[_id + 1]} ${
    loremIpsum[_id + 2]
  } #js${_id}`;
  newTweet = new tweet(
    _id,
    string,
    new Date(defaultDate.setDate(defaultDate.getDate() + _id)),
    defaultUser + `${_id}`
  );
  arrTweets.push(newTweet);
  _id++;
}
const Module = (function () {
  let user;
  const getTweets = function (skip = 0, top = 10, filterConfig = {}) {
    function sortByDate(a, b) {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateA > dateB ? 1 : -1;
    }
    arrTweets.sort(sortByDate);
    let getNewArr = [];
    for (let Tweet of arrTweets) {
      if (filterConfig.author && Tweet.author !== filterConfig.author) {
        continue;
      }
      if (
        filterConfig.dateFrom &&
        !(
          Tweet.createdAt >= filterConfig.dateFrom &&
          Tweet.createdAt <= filterConfig.dateTo
        )
      ) {
        continue;
      }
      if (
        filterConfig.text &&
        !Tweet.text
          .toLowerCase()
          .includes(filterConfig.text.trim().toLowerCase())
      ) {
        continue;
      }
      if (filterConfig.hashtags) {
        arrHashtags = filterConfig.hashtags.toLowerCase().trim().split("#");
        if (
          !arrHashtags.every((Hashtag) =>
            Tweet.text.toLowerCase().includes(Hashtag)
          )
        ) {
          continue;
        }
      }
      getNewArr.push(Tweet);
    }
    return getNewArr.slice(skip, skip + top);
  };
  const getTweet = function (id) {
    let i = arrTweets.findIndex((tweet) => tweet.id === id);
    return arrTweets[i];
  };
  const validateTweet = function (Tweet) {
    return (
      Tweet.id &&
      Tweet.text &&
      Tweet.createdAt &&
      Tweet.author &&
      Tweet.text.length <= 280
    );
  };
  const addTweet = function (string) {
    if (this.user) {
      //неавторизованный пользователь не может писать твиты
      let date = new Date();
      newTweet = new tweet(_id, string.trim(), date, this.user);
      if (validateTweet(newTweet)) {
        //проверка твита на валидность
        arrTweets.push(newTweet);
        _id++;
        return true;
      }
      return false;
    }
    return false;
  };
  const editTweet = function (id, string) {
    /* я решил, что гораздо проще и эффективнее фильтровать входные данные
      перед редактированием, нежели сначала редактировать твит, потом проверять
      его на валидность и в случае неудачи отменять редактирование, а в случае
      удачи сохранять изменения. таким образом, делаю проверку в ветвлении
      вместо функции validateTweet */
    if (
      getTweet(id) &&
      this.user === getTweet(id).author &&
      string &&
      string.length <= 280
    ) {
      getTweet(id).text = string;
      return true;
    }
    return false;
  };
  const removeTweet = function (id) {
    if (getTweet(id) && this.user === getTweet(id).author) {
      let i = arrTweets.findIndex((tweet) => tweet.id === id);
      arrTweets.splice(i, 1);
      return true;
    }
    return false;
  };
  const validateComment = function (Comment) {
    return (
      Comment.id &&
      Comment.text &&
      Comment.createdAt &&
      Comment.author &&
      Comment.text.length <= 280
    );
  };
  const addComment = function (id, string) {
    if (getTweet(id) && this.user) {
      //неавторизованный пользователь не может писать комментарии
      let date = new Date();
      newComment = new comment(_id, string.trim(), date, this.user);
      if (validateComment(newComment)) {
        //проверка комментария на валидность
        getTweet(id).comments.push(newComment);
        _id++;
        return true;
      }
      return false;
    }
    return false;
  };
  const changeUser = function (string) {
    this.user = string.trim();
  };
  return {
    getTweets,
    getTweet,
    validateTweet,
    addTweet,
    editTweet,
    removeTweet,
    validateComment,
    addComment,
    changeUser,
  };
})();
console.log(Module.addTweet("qwerty#hi#hello#qq"));
console.log(Module.addComment(0, "comment"));
Module.changeUser("Иван0");
console.log(Module.addTweet("qwerty#hi#hello#qq"));
console.log(Module.addTweet(""));
console.log(Module.addComment(0, "comment"));
console.log(Module.getTweet(0));
console.log(Module.editTweet());
console.log(Module.editTweet(0, "edited"));
console.log(Module.getTweet(0));
console.log(Module.removeTweet());
console.log(Module.removeTweet(0));
console.log(Module.getTweet(0));
console.log(Module.getTweets(0, 20));
console.log(Module.getTweets(0, 20, { text: "elit" }));
console.log(Module.getTweets(0, 20, { text: "elit", hashtags: "#js5" }));
console.log(Module.getTweets(0, 20, { hashtags: "#hello#qq#hi" }));
