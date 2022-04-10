class HeaderView {
  constructor(id) {
    this.header = document.getElementById(id);
  }
  display(userName) {
    if (defC._user)
      this.header.innerHTML = `
      <div class = "account">
        <span class="iconify" data-icon="ant-design:user-outlined" data-width="35" data-height="35"></span>
        <span id = "user">${userName}</span>
      </div>
      <img src = "../mockups/extra tasks/Logo.svg" class = "logo" alt = "logo"/>
      <button type="button" class="exit-button">
        <span id = "exit" class="iconify" data-icon="ion:exit-outline"></span>
      </button>
    `;
    else {
      this.header.innerHTML = `
      <div class = "account">
        <span class="iconify" data-icon="ant-design:user-outlined" data-width="35" data-height="35"></span>
        <span id = "user">You are guest</span>
      </div>
      <img src = "../mockups/extra tasks/Logo.svg" class = "logo" alt = "logo"/>
      <div>
        <button type="button" class="sign-up-button">
          Sign up
        </button>
        <button type="button" class="log-in-button">
          Log in
        </button>
      </div>
      `;
    }
  }
}
class TweetFeedView {
  constructor(id) {
    this.tweetField = document.getElementById(id);
  }
  display(arrTweets) {
    //////////////////////
    document.getElementById("mainPage").style.display = "flex";
    document.getElementById("tweetPage").style.display = "none";

    //////////////////////
    if (defC._user) {
      this.tweetField.innerHTML = `
      <form id="enter-area">
        <textarea name="write-twit" id="enter-area-txt" placeholder="Write a tweet..."></textarea>
        <button type="button" class="tweet-comment-button">
          Tweet
          <span id="plus" class="iconify" data-icon="akar-icons:plus"></span>
        </button>
      </form>
      <article id = "article"></article>
      `;
    } else {
      this.tweetField.innerHTML = `
      <article id = "article"></article>
      `;
    }
    //////////////////////
    let tweets = "";
    arrTweets.forEach((tweet) => {
      let tempTweet;
      if (defC._user === tweet.getAuthor) {
        tempTweet = ` 
        <div class="twit"> 
          <div class="twit-top"> 
            <div class="user">
              <span id = "user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
              <div class = "name-date">
                <p>${tweet.getAuthor}</p>
                <p class="post-date">${tweet.getCreatedAt}</p>
              </div>
            </div>
            <div>
                <button type="button" class="edit-delete-button">
                  <span id = "edit" class="iconify" data-icon="eva:edit-outline"></span>
                </button>
                <button type="button" class="edit-delete-button">
                  <span id = "delete" class="iconify" data-icon="bx:trash"></span>
                </button>
              </div>
          </div> 
          <p class ="text">${tweet.text}</p>
          <span class = "comments">
            <span id = "comment" class="iconify" data-icon="uil:comment-alt-message"></span>
            ${tweet.comments.length}
          </span>
        </div>
        `;
      } else {
        tempTweet = ` 
        <div class="twit"> 
          <div class="twit-top"> 
            <div class="user">
              <span id = "user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
              <div class = "name-date">
                <p>${tweet.getAuthor}</p>
                <p class="post-date">${tweet.getCreatedAt}</p>
              </div>
            </div>
          </div> 
          <p class ="text">${tweet.text}</p>
          <span class = "comments">
            <span id = "comment" class="iconify" data-icon="uil:comment-alt-message"></span>
            ${tweet.comments.length}
          </span>
        </div>
        `;
      }
      tweets += tempTweet;
    });
    document.getElementById("article").innerHTML += tweets;
  }
}
class FilterView {
  constructor(id) {
    this.filterField = document.getElementById(id);
  }

  display() {
    this.filterField.innerHTML = `
    <form class = "form">
      <form class = "form">
        <p class="filter-header">Author</p>
        <input class = "text-area" type="text" name = "author" placeholder="Search...">
      </form>
      <form class = "form">
        <p class="filter-header">Date</p>
        <p class="from-to">From</p>
        <input class = "date" type = "date" name = "date-from">
        <p class="from-to">To</p>
        <input class = "date" type = "date" name = "date-to">
        <input class="reset-button" type="reset" value="Reset">
      </form>
      <form class = "form">
        <p class="filter-header">Text</p>
        <input class = "text-area" type="text" name = "text" placeholder="Search...">
      </form>
      <form class = "form">
        <p class="filter-header">Hashtag</p>
        <input class = "text-area" type="text" name = "hashtag" placeholder="Search...">
      </form>
      <input class="filter-button" type="submit" value="Filter">
    </form>
   `;
  }
}
class TweetView {
  constructor(id) {
    this.tweetPage = document.getElementById(id);
  }
  display(id) {
    //////////////////////
    document.getElementById("mainPage").style.display = "none";
    document.getElementById("tweetPage").style.display = "flex";

    let tweet = defC.get(id);
    this.tweetPage.innerHTML = `
      <div id="twit" class="twit">
        <div class="twit-top">
          <div class="user">
            <span id="user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
            <div class="name-date">
              <p>${tweet.getAuthor}</p>
              <p class="post-date">${tweet.getCreatedAt}</p>
            </div>
          </div>
        </div> 
        <p class="text">${tweet.text}</p>
        <span class="comments">
          <span id="comment" class="iconify" data-icon="uil:comment-alt-message"></span>
          ${tweet.comments.length}
        </span>
      </div>
      <article id="article-twit">
      </article>
    `;
    let tweetComments = "";
    tweet.comments.forEach((comment) => {
      tweetComments += `
      <div class = "twit">
        <div class = "twit-top">
          <div class = "user">
            <span id = "user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
            <div class = "name-date">
              <p>${comment.getAuthor}</p>
              <p class = "post-date">${comment.getCreatedAt}</p>
            </div>
          </div>
        </div>
        <p class = "text">${comment.text}</p>
      </div>
      `;
    });
    document.getElementById("article-twit").innerHTML += tweetComments;
    if (tweet.comments.length >= 10) {
      document.getElementById("article-twit").innerHTML += `
        <button type="button" class="show-more-button">
          Show more
          <span id = "arrow" class="iconify" data-icon="ep:arrow-down-bold"></span>
        </button>
      `;
    }
    if (defC._user) {
      this.tweetPage.innerHTML += `
      <form id="enter-area-twit" class="enter-area">
        <textarea name="write-twit" id="enter-area-txt" placeholder="Write a comment..."></textarea>
        <button type="button" class="tweet-comment-button">
          Add comment
          <span id="plus" class="iconify" data-icon="akar-icons:plus"></span>
        </button>
      </form>
      `;
    }
  }
}

//Model//

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

//functions//
function setCurrentUser(user) {
  defC.setUser = user;
  let headerField = new HeaderView("header");
  headerField.display(user);
}
function addTweet(text) {
  if (defC.add(text)) {
    let tweetField = new TweetFeedView("left-side");
    tweetField.display(defC._arrTweets);
  }
}
function editTweet(id, text) {
  if (defC.edit(id, text)) {
    let tweetField = new TweetFeedView("left-side");
    tweetField.display(defC._arrTweets);
  }
}
function removeTweet(id) {
  if (defC.remove(id)) {
    let tweetField = new TweetFeedView("left-side");
    tweetField.display(defC._arrTweets);
  }
}
function getFeed(skip = 0, top = 10, filterConfig = {}) {
  let tweetField = new TweetFeedView("left-side");
  tweetField.display(defC.getPage(skip, top, filterConfig));
}
function showTweet(id) {
  let tweetField = new TweetView("tweetPage");
  tweetField.display(id);
}

//test//
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
setCurrentUser(""); //войти как гость
getFeed(0, 20);
let f = new FilterView("filter");
f.display();
setCurrentUser("Qwerty"); //войти как авторизованный пользователь
addTweet("Qwerty сделал твит");
addTweet("Qwerty второй твит");
editTweet("21", "отредактированный второй твит автора Qwerty");
removeTweet("21");
getFeed(0, 30, { text: "dolor" });
defC.addComment("0", "комментарий №1");
defC.addComment("0", "комментарий №2");
defC.addComment("0", "комментарий №3");
showTweet("0");
setCurrentUser("");
showTweet("0");
