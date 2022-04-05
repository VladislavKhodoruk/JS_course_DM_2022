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
    return (
      tweet.getId &&
      tweet.getText &&
      tweet.getCreatedAt &&
      tweet.getAuthor &&
      tweet.getText.length <= 280
    );
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
    return (
      comment.getId &&
      comment.getText &&
      comment.getCreatedAt &&
      comment.getAuthor &&
      comment.getText.length <= 280
    );
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
  getPage(skip = 0, top = 10, filterConfig = {}) {
    function sortByDate(a, b) {
      let dateA = new Date(a.createdAt);
      let dateB = new Date(b.createdAt);
      return dateA > dateB ? 1 : -1;
    }
    this._arrTweets.sort(sortByDate);
    let getNewArr = [];
    for (let tweet of this._arrTweets) {
      if (filterConfig.author && tweet.getAuthor !== filterConfig.author) {
        continue;
      }
      if (
        filterConfig.dateFrom &&
        !(
          tweet.getCreatedAt >= filterConfig.dateFrom &&
          tweet.getCreatedAt <= filterConfig.dateTo
        )
      ) {
        continue;
      }
      if (
        filterConfig.text &&
        !tweet.getText
          .toLowerCase()
          .includes(filterConfig.text.trim().toLowerCase())
      ) {
        continue;
      }
      if (filterConfig.hashtags) {
        let arrHashtags = filterConfig.hashtags.toLowerCase().trim().split("#");
        if (
          !arrHashtags.every((Hashtag) =>
            tweet.getText.toLowerCase().includes(Hashtag)
          )
        ) {
          continue;
        }
      }
      getNewArr.push(tweet);
    }
    return getNewArr.slice(skip, skip + top);
  }

  get(id) {
    let i = this._arrTweets.findIndex((tweet) => tweet.getId === id);
    return this._arrTweets[i];
  }
  add(string) {
    if (this._user) {
      //неавторизованный пользователь не может писать твиты
      let newTweet = new Tweet(`${ID}`, string.trim(), this._user);
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
    const tweet = this.get(id);
    if (
      tweet &&
      this._user === tweet.getAuthor &&
      string &&
      string.length <= 280
    ) {
      tweet.setText = string;
      return true;
    }
    return false;
  }
  remove(id) {
    const tweet = this.get(id);
    if (tweet && this._user === tweet.getAuthor) {
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
    const tweet = this.get(id);
    if (tweet && this._user) {
      //неавторизованный пользователь не может писать комментарии
      let newComment = new Comment(`${ID}`, string.trim(), this._user);
      if (Comment.validate(newComment)) {
        //проверка комментария на валидность
        tweet.comments.push(newComment);
        ID++;
        return true;
      }
      return false;
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
  let string = `${loremIpsum[ID]} ${loremIpsum[ID + 1]} ${
    loremIpsum[ID + 2]
  }#js${ID}`;
  newTweet = new Tweet(`${ID}`, string, defaultUser + `${ID}`);
  Tweet._createdAt = defaultDate.setDate(defaultDate.getDate() + ID);
  defArrTweets.push(newTweet);
  ID++;
}
let defC = new TweetCollection(defArrTweets);
console.log(defC.add("qwerty#hi#hello#qq"));
console.log(defC.addComment("0", "comment"));
defC.setUser = "Иван0";
console.log(defC.add("qwerty#hi#hello#qq"));
console.log(defC.add(""));
console.log(defC.addComment("1", "comment"));
console.log(defC.get("1"));
console.log(defC.edit());
defC.setUser = "Иван1";
console.log(defC.edit("1", "edited"));
console.log(defC.get("1"));
console.log(defC.remove());
console.log(defC.remove("1"));
console.log(defC.get("1"));
console.log(defC.getPage(0, 20));
console.log(defC.getPage(0, 20, { text: "elit" }));
console.log(defC.getPage(0, 20, { text: "elit", hashtags: "#js5" }));
console.log(defC.getPage(0, 20, { hashtags: "#hello#qq#hi" }));
