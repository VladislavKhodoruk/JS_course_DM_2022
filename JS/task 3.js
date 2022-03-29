function Tweet(id, text, createdAt, author) {
  (this.id = id),
    (this.text = text),
    (this.createdAt = createdAt),
    (this.author = author),
    (this.comments = []);
}
function Comment(id, text, createdAt, author) {
  (this.id = id),
    (this.text = text),
    (this.createdAt = createdAt),
    (this.author = author);
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
  let string =
    loremIpsum[_id] +
    " " +
    loremIpsum[_id + 1] +
    " " +
    loremIpsum[_id + 2] +
    `#js${_id}`;
  newTweet = new Tweet(
    _id,
    string,
    defaultDate.setDate(defaultDate.getDate() + _id),
    defaultUser + `${_id}`
  );
  arrTweets.push(newTweet);
  _id++;
}
const Module = (function () {
  let user;
  const getTweets = function (skip = 0, top = 0, filterConfig) {
    //использую skip и top как счётчики
    let getNewArr = [];
    for (let Tweet of arrTweets) {
      if (filterConfig.author !== undefined) {
        if (Tweet.author !== filterConfig.author) {
          continue;
        }
      }
      if (filterConfig.dateFrom !== undefined) {
        if (
          !(
            Tweet.createdAt >= filterConfig.dateFrom &&
            Tweet.createdAt <= filterConfig.dateTo
          )
        ) {
          continue;
        }
      }
      if (filterConfig.text !== undefined) {
        if (
          !Tweet.text
            .toLowerCase()
            .includes(filterConfig.text.trim().toLowerCase())
        ) {
          continue;
        }
      }
      if (filterConfig.hashtags !== undefined) {
        if (
          !Tweet.text
            .toLowerCase()
            .includes(filterConfig.hashtags.trim().toLowerCase())
        ) {
          continue;
        }
      }
      if (skip !== 0) {
        skip--; //пропускаем твиты, пока счётчик "пропусков" не обнулится
      } else {
        //если необходимое количество твитов пропущено, заполняем массив
        if (top !== 0) {
          getNewArr.push(Tweet);
          top--; //заполняя массив очередным твитом, уменьшаем счётчик твитов
        } else {
          break; //если необходимое количество твитов выведено (т.е. top === 0), выходим из цикла
        }
      }
    }
    return getNewArr;
  };
  const getTweet = function (id) {
    for (let Tweet of arrTweets) {
      if (id === Tweet.id) {
        return Tweet;
      }
    }
  };
  const validateTweet = function (Tweet) {
    if (
      Tweet.id === undefined ||
      Tweet.text === undefined ||
      Tweet.createdAt === undefined ||
      Tweet.author === undefined
    ) {
      return false;
    } else if (
      Tweet.text.length >= 280 ||
      Tweet.text === "" ||
      Tweet.author === ""
    ) {
      return false;
    }
    return true;
  };
  const addTweet = function (string) {
    if (this.user !== undefined) {
      //неавторизованный пользователь не может писать твиты
      let date = new Date();
      newTweet = new Tweet(_id, string.trim(), date, this.user);
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
      this.user === getTweet(id).author &&
      string !== "" &&
      string !== undefined &&
      string.length <= 280
    ) {
      getTweet(id).text = string;
      return true;
    }
    return false;
  };
  const removeTweet = function (id) {
    if (this.user === getTweet(id).author) {
      for (let i = 0; i < arrTweets.length; i++) {
        if (id === arrTweets[i].id) {
          arrTweets.splice(i, 1);
        }
      }
    }
  };
  const validateComment = function (Comment) {
    if (
      Comment.id === undefined ||
      Comment.text === undefined ||
      Comment.createdAt === undefined ||
      Comment.author === undefined
    ) {
      return false;
    } else if (
      Comment.text.length >= 280 ||
      Comment.text === "" ||
      Comment.author === ""
    ) {
      return false;
    }
    return true;
  };
  const addComment = function (id, string) {
    if (this.user !== undefined) {
      //неавторизованный пользователь не может писать комментарии
      let date = new Date();
      newComment = new Comment(_id, string.trim(), date, this.user);
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
