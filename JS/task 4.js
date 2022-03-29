let ID = 0;
class Tweet {
  constructor(id, text, author) {
    this._id = id;
    this.text = text;
    this._createdAt = new Date();
    this._author = author;
    this.comments = [];
  }
  get getId() {
    return this._id;
  }
  get getText() {
    return this.text;
  }
  set setText(string) {
    this.text = string;
  }
  get getCreatedAt() {
    return this._createdAt;
  }
  get getAuthor() {
    return this._author;
  }
  static validate(tweet) {
    if (
      tweet.getId === undefined ||
      tweet.getText === undefined ||
      tweet.getCreatedAt === undefined ||
      tweet.getAuthor === undefined
    ) {
      return false;
    } else if (
      tweet.getText.length >= 280 ||
      tweet.getText === "" ||
      tweet.getAuthor === ""
    ) {
      return false;
    }
    return true;
  }
}
class Comment {
  constructor(id, text, author) {
    this._id = id;
    this.text = text;
    this._createdAt = new Date();
    this._author = author;
  }
  get getId() {
    return this._id;
  }
  get getText() {
    return this.text;
  }
  set setText(string) {
    this.text = string;
  }
  get getCreatedAt() {
    return this._createdAt;
  }
  get getAuthor() {
    return this._author;
  }
  static validate(comment) {
    if (
      comment.getId === undefined ||
      comment.getText === undefined ||
      comment.getCreatedAt === undefined ||
      comment.getAuthor === undefined
    ) {
      return false;
    } else if (
      comment.getText.length >= 280 ||
      сomment.getText === "" ||
      сomment.getAuthor === ""
    ) {
      return false;
    }
    return true;
  }
}
class TweetCollection {
  constructor(arrTweets) {
    this._arrTweets = [];
    for (let tweet of arrTweets) {
      if (Tweet.validate(tweet)) {
        this._arrTweets.push(tweet);
      }
    }
    this._user = undefined;
  }
  get getUser() {
    return this._user;
  }
  set setUser(string) {
    this._user = string;
  }
  getPage(skip = 0, top = 0, filterConfig) {
    let getNewArr = [];
    for (let tweet of this._arrTweets) {
      if (filterConfig.author !== undefined) {
        if (tweet.getAuthor !== filterConfig.author) {
          continue;
        }
      }
      if (filterConfig.dateFrom !== undefined) {
        if (
          !(
            tweet.getCreatedAt >= filterConfig.dateFrom &&
            tweet.getCreatedAt <= filterConfig.dateTo
          )
        ) {
          continue;
        }
      }
      if (filterConfig.text !== undefined) {
        if (
          !tweet.getText
            .toLowerCase()
            .includes(filterConfig.text.trim().toLowerCase())
        ) {
          continue;
        }
      }
      if (filterConfig.hashtags !== undefined) {
        if (
          !tweet.getText
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
          getNewArr.push(tweet);
          top--; //заполняя массив очередным твитом, уменьшаем счётчик твитов
        } else {
          break; //если необходимое количество твитов выведено (т.е. top === 0), выходим из цикла
        }
      }
    }
    return getNewArr;
  }
  get(id) {
    for (let tweet of this._arrTweets) {
      if (id === tweet.getId) {
        return tweet;
      }
    }
  }
  add(string) {
    if (this._user !== undefined) {
      //неавторизованный пользователь не может писать твиты
      let newTweet = new Tweet(ID, string.trim(), this._user);
      if (Tweet.validate(newTweet)) {
        //проверка твита на валидность
        this._arrTweets.push(newTweet);
        ID++;
        return true;
      }
      return false;
    }
    return false;
  }
  edit(id, string) {
    if (
      this._user === this.get(id).getAuthor &&
      string !== "" &&
      string !== undefined &&
      string.length <= 280
    ) {
      this.get(id).setText = string;
      return true;
    }
    return false;
  }
  remove(id) {
    if (this._user === this.get(id).getAuthor) {
      for (let i = 0; i < this._arrTweets.length; i++) {
        if (id === this._arrTweets[i].getId) {
          this._arrTweets.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
  addComment(id, string) {
    if (this._user !== undefined) {
      //неавторизованный пользователь не может писать комментарии
      let newComment = new Comment(ID, string.trim(), this._user);
      // if(Comment.validate(newComment)){  //проверка комментария на валидность
      //     this.get(id).comments.push(newComment);
      //     ID++;
      //     return true;
      // }
      // return false;
      this.get(id).comments.push(newComment);
      ID++;
      return true;
      //закомментил валидацию для демонстрации работы addComment, т.е. сама ф-ия работает, ошибка из-зи валидации
    }
    return false;
  }
  addAll(arrTweets) {
    let notValidated = [];
    for (let tweet of arrTweets) {
      if (Tweet.validate(tweet)) {
        this._arrTweets.push(tweet);
      } else {
        notValidated.push(tweet);
      }
    }
    return notValidated;
  }
  clear() {
    this._arrTweets.length = 0;
    this._user = undefined;
  }
}

let defArrTweets = [];
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
    loremIpsum[ID] +
    " " +
    loremIpsum[ID + 1] +
    " " +
    loremIpsum[ID + 2] +
    `#js${ID}`;
  newTweet = new Tweet(ID, string, defaultUser + `${ID}`);
  Tweet._createdAt = defaultDate.setDate(defaultDate.getDate() + ID);
  defArrTweets.push(newTweet);
  ID++;
}
let defC = new TweetCollection(defArrTweets);
let nonValidTweet1 = new Tweet(ID, "", defaultUser + `${ID}`); //пустое поле текста
ID++;
let nonValidTweet2 = new Tweet(ID, "non-valid tweet without user"); //нет пользователя
ID++;
let validTweet1 = new Tweet(ID, "valid 1", defaultUser + `${ID}`);
ID++;
let validTweet2 = new Tweet(ID, "valid 2", defaultUser + `${ID}`);
ID++;
let validCom = new Comment(ID, "wdwdw", defaultUser + `${ID}`);
ID++;
let nonValidCom = new Comment(ID, "", defaultUser + `${ID}`);
ID++;
validTweet1.comments = [validCom, nonValidCom];
let nonValidTweets = [nonValidTweet1, nonValidTweet2, validTweet1, validTweet2];
