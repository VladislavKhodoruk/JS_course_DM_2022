function sortByDate(a, b) {
  let dateA = new Date(a._createdAt);
  let dateB = new Date(b._createdAt);
  return dateA < dateB ? 1 : -1;
}
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function doLocalStorage() {
  if (!localStorage.arrOfTweets) {
    let defaultTweet1 = new Tweet(`${uuidv4()}`, "hello #js", "Jack");
    defaultTweet1._createdAt = new Date(2022, 03, 16);
    defaultTweet1.comments = [];

    let defaultTweet2 = new Tweet(`${uuidv4()}`, "hi#datamola", "Mike");
    defaultTweet2._createdAt = new Date(2022, 03, 17);
    defaultTweet2.comments = [];

    let defaultTweet3 = new Tweet(`${uuidv4()}`, "#code tweet", "John");
    defaultTweet3._createdAt = new Date(2022, 03, 18);
    defaultTweet3.comments = [];

    let arr = [defaultTweet1, defaultTweet2, defaultTweet3];
    localStorage.setItem("arrOfTweets", JSON.stringify(arr));
  }
}
function doText(text) {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "#") {
      let newWord = "";
      while (text[i] != " " && i < text.length) {
        newWord += text[i];
        i++;
      }
      newText += `<span class = "hashtag">${newWord}</span>`;
      if (i < text.length) {
        newText += text[i];
      }
    } else {
      newText += text[i];
    }
  }
  return newText;
}

let pageStatus = ""; //переменная, которая показывает, на какой странице находимся

let currentTweetId = ""; //переменная, которая хранит в себе id текущего твита (нужна для работы кнопки выхода на странице твита)

class AllUsers {
  constructor(arr) {
    this.users = arr;
  }
  add(user) {
    this.users.push(user);
  }
  save() {
    localStorage.setItem("allUsers", JSON.stringify(this.users));
  }
  restore() {
    this.users = JSON.parse(localStorage.getItem("allUsers"));
  }
}

class HeaderView {
  constructor(id) {
    this.header = document.getElementById(id);
  }
  display(userName) {
    if (userName)
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
    pageStatus = "main";
    if (t._tweetCollection._user) {
      this.tweetField.innerHTML = `
      <div id = "mainPage">
        <div class = "left-side" id = "left-side">
          <form id="enter-area">
            <textarea name="write-twit" id="enter-area-txt" placeholder="Write a tweet..."></textarea>
            <button type="button" class="tweet-comment-button" id = "tweet-button">
              Tweet
              <span id="plus" class="iconify" data-icon="akar-icons:plus"></span>
            </button>
          </form>
          <article id = "article"></article>
        </div>
      </div>
      `;
    } else {
      this.tweetField.innerHTML = `
      <div id = "mainPage">
        <div class = "left-side" id = "left-side">
          <article id = "article"></article>
        <div>
      </div>
      `;
    }
    let tweets = "";
    arrTweets.forEach((tweet) => {
      let tempTweet;
      if (t._tweetCollection._user === tweet.getAuthor) {
        let finishedText = doText(tweet.text);
        tempTweet = ` 
        <div class="twit" data-id = ${tweet.getId}> 
          <div class="twit-top"> 
            <div class="user">
              <span id = "user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
              <div class = "name-date">
                <p>${tweet.getAuthor}</p>
                <p class="post-date">${tweet.getCreatedAt}</p>
              </div>
            </div>
            <div>
                <button type="button" class="edit-delete-button" id="edit-button">
                  <span id = "edit" class="iconify" data-icon="eva:edit-outline"></span>
                </button>
                <button type="button" class="edit-delete-button" id="delete-button">
                  <span id = "delete" class="iconify" data-icon="bx:trash"></span>
                </button>
              </div>
          </div> 
          <p class ="text" id = "qwerty">${finishedText}</p>
          <span class = "comments">
            <span id = "comment" class="iconify" data-icon="uil:comment-alt-message"></span>
            ${tweet.comments.length}
          </span>
        </div>
        `;
      } else {
        let finishedText = doText(tweet.text);
        tempTweet = ` 
        <div class="twit" data-id = "${tweet.getId}"> 
          <div class="twit-top"> 
            <div class="user">
              <span id = "user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
              <div class = "name-date">
                <p>${tweet.getAuthor}</p>
                <p class="post-date">${tweet.getCreatedAt}</p>
              </div>
            </div>
          </div> 
          <p class ="text">${finishedText}</p>
          <span class = "comments">
            <span id = "comment" class="iconify" data-icon="uil:comment-alt-message"></span>
            ${tweet.comments.length}
          </span>
        </div>
        `;
      }
      tweets += tempTweet;
    });
    document.getElementById("article").innerHTML = tweets;
  }
}
class FilterView {
  constructor(id) {
    this.filterField = document.getElementById(id);
  }
  display() {
    this.filterField.innerHTML += `
    <nav id = "filter">
      <form class = "form">
        <div class = "form">
          <p class="filter-header">Author</p>
          <input class = "text-area" type="text" name = "author" placeholder="Search..." id = "author-search">
        </div>
        <div class = "form">
          <p class="filter-header">Date</p>
          <p class="from-to">From</p>
          <input class = "date" type = "date" name = "date-from" id = "date-from">
          <p class="from-to">To</p>
          <input class = "date" type = "date" name = "date-to" id = "date-to">
        </div>
        <div class = "form">
          <p class="filter-header">Text</p>
          <input class = "text-area" type="text" name = "text" placeholder="Search..." id = "text">
        </div>
        <div class = "form">
          <p class="filter-header">Hashtag</p>
          <input class = "text-area" type="text" name = "hashtag" placeholder="Search..." id = "hashtag">
        </div>
        <input class="filter-button" type="submit" value="Filter">
        <input class="filter-button" type="reset" value="Reset" id = "reset-filter-button">
      </form>
    </nav>
   `;
  }
}
class TweetView {
  constructor(id) {
    this.tweetPage = document.getElementById(id);
  }
  display(id) {
    pageStatus = "tweet";
    let tweet = t._tweetCollection.get(id);
    let finishedText = doText(tweet.text);
    this.tweetPage.innerHTML = `
      <div id = "tweetPage">
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
          <p class="text">${finishedText}</p>
          <span class="comments">
            <span id="comment" class="iconify" data-icon="uil:comment-alt-message"></span>
            ${tweet.comments.length}
          </span>
        </div>
        <article id="article-twit">
        </article>
      </div>
    `;
    let tweetComments = "";
    tweet.comments.forEach((comment) => {
      let finishedTextCom = doText(comment.text);
      tweetComments += `
      <div class = "twit">
        <div class = "twit-top">
          <div class = "user">
            <span id = "user-photo" class="iconify" data-icon="ant-design:user-outlined"></span>
            <div class = "name-date">
              <p>${comment._author}</p>
              <p class = "post-date">${comment._createdAt}</p>
            </div>
          </div>
        </div>
        <p class = "text">${finishedTextCom}</p>
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
    if (t._tweetCollection._user) {
      document.getElementById("tweetPage").innerHTML += `
      <form id="enter-area-twit" class="enter-area">
        <textarea name="write-twit" id="enter-area-txt" placeholder="Write a comment..."></textarea>
        <button type="button" class="tweet-comment-button" id="add-comment-button">
          Add comment
          <span id="plus" class="iconify" data-icon="akar-icons:plus"></span>
        </button>
      </form>
      `;
    }
  }
}
class RegistrationView {
  constructor(id) {
    this.registrationPage = document.getElementById(id);
  }
  display() {
    pageStatus = "registration";
    this.registrationPage.innerHTML = `
    <div id ="registrationPage">
      <div id="window">
        <img src = "../mockups/extra tasks/Logo.svg" class = "logo" alt = "logo"/>
        <input class = "input-field" type="text" name = "text" placeholder="Name" id = "name-reg">
        <input class = "input-field" type="text" name = "text" placeholder="Password" id = "password-reg">
        <input class = "input-field" type="text" name = "text" placeholder="Repeat the password" id = "rep-password-reg">
        <button type="button" class="sign-up-button-reg">
          Sign up
        </button>
      </div>
    </div>
    `;
  }
}
class AuthorizationView {
  constructor(id) {
    this.authorizationPage = document.getElementById(id);
  }
  display() {
    pageStatus = "authorization";
    this.authorizationPage.innerHTML = `
    <div id ="authorizationPage">
      <div id="window">
        <img src = "../mockups/extra tasks/Logo.svg" class = "logo" alt = "logo"/>
          <input class = "input-field" type="text" name = "text" placeholder="Name" id = "name-aut">
          <input class = "input-field" type="text" name = "text" placeholder="Password" id = "password-aut">
          <button type="button" class="log-in-button-aut">
            Log in
          </button>
      </div>
    </div>
    `;
  }
}
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
  save() {
    localStorage.setItem("arrOfTweets", JSON.stringify(this._arrTweets));
  }
  restore() {
    let tweetsFromLS = JSON.parse(localStorage.getItem("arrOfTweets"));
    tweetsFromLS.forEach((tweet) => {
      let newTweet = new Tweet(tweet._id, tweet.text, tweet._author);
      newTweet._createdAt = new Date(tweet._createdAt);
      newTweet.comments = tweet.comments;
      this._arrTweets.push(newTweet);
      this._arrTweets.sort(sortByDate);
    });
  }
  getPage(skip = 0, top = 10, filterConfig = {}) {
    this._arrTweets.sort(sortByDate);
    let getNewArr = [];
    for (let tweet of this._arrTweets) {
      if (
        filterConfig.author &&
        tweet._author.toLowerCase() !== filterConfig.author.toLowerCase()
      ) {
        continue;
      }
      if (
        filterConfig.dateFrom &&
        !(
          tweet._createdAt >= new Date(filterConfig.dateFrom) &&
          tweet._createdAt <= new Date(filterConfig.dateTo)
        )
      ) {
        continue;
      }
      if (
        filterConfig.text &&
        !tweet.text
          .toLowerCase()
          .includes(filterConfig.text.trim().toLowerCase())
      ) {
        continue;
      }
      if (filterConfig.hashtags) {
        let arrHashtags = filterConfig.hashtags.toLowerCase().trim().split("#");
        if (
          !arrHashtags.every((Hashtag) =>
            tweet.text.toLowerCase().includes(Hashtag)
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
    let i = this._arrTweets.findIndex((tweet) => tweet._id === id);
    return this._arrTweets[i];
  }
  add(string) {
    if (this._user) {
      //неавторизованный пользователь не может писать твиты
      let newTweet = new Tweet(`${uuidv4()}`, string.trim(), this._user);
      if (Tweet.validate(newTweet)) {
        //проверка твита на валидность
        this._arrTweets.push(newTweet);
        this._arrTweets.sort(sortByDate);
        this.save();
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
      this._user === tweet._author &&
      string &&
      string.length <= 280
    ) {
      tweet.text = string;
      this.save();
      return true;
    }
    return false;
  }
  remove(id) {
    const tweet = this.get(id);
    if (tweet && this._user === tweet._author) {
      for (let i = 0; i < this._arrTweets.length; i++) {
        if (id === this._arrTweets[i]._id) {
          this._arrTweets.splice(i, 1);
          this.save();
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
      let newComment = new Comment(`${uuidv4()}`, string.trim(), this._user);
      if (Comment.validate(newComment)) {
        //проверка комментария на валидность
        tweet.comments.push(newComment);
        tweet.comments.sort(sortByDate);
        this.save();
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
        this._arrTweets.sort(sortByDate);
        this.save();
      } else {
        notValidated.push(tweet);
      }
    }
    return notValidated;
  }
  clear() {
    this._arrTweets.length = 0;
    this._user = undefined;
    this.save();
  }
}
class TweetFeedApiService {
  constructor() {}
}
class TweetsController {
  constructor() {
    this._headerView = new HeaderView("header");
    this._tweetFeedView = new TweetFeedView("main");
    this._filterView = new FilterView("mainPage");
    this._tweetView = new TweetView("main");
    this._registrationView = new RegistrationView("main");
    this._authorizationView = new AuthorizationView("main");
    this._tweetCollection = new TweetCollection([]);
    if (localStorage.arrOfTweets) {
      this._tweetCollection.restore();
    }
    this._users = new AllUsers([]);
    if (localStorage.allUsers) {
      this._users.restore();
    }
  }
  setCurrentUser(user) {
    this._tweetCollection.setUser = user;
    this._headerView.display(user);
    if (user) {
      document.querySelector(".exit-button").addEventListener("click", () => {
        //если пользователь авторизован, то появляется кнопка выхода из аккаунта
        this.setCurrentUser(""); //выходим из аккаунта
        if (pageStatus === "main") {
          this.getFeed();
        } else if (pageStatus === "tweet") {
          this.showTweet(currentTweetId);
        }
      });
    } else {
      document
        //если пользователь не авторизован, то появляются кнопки регистрации и авторизации
        .querySelector(".sign-up-button") //нажатие на кнопку на главной странице
        .addEventListener("click", () => {
          this._registrationView.display(); //открылась страница регистрации
          pageStatus = "registration";
          this.setCurrentUser("You are guest"); // для того, чтобы после выхода из аккаунта пользователь был как гость, но появилась кнопка выхода
          document
            .querySelector(".exit-button")
            .addEventListener("click", () => {
              //возврат на страницу, но уже как гость
              this.setCurrentUser();
              this.getFeed();
            });
          document
            .querySelector(".sign-up-button-reg") //нажатие на кнопку регистрации на странице регистрации
            .addEventListener("click", () => {
              let newName = document.getElementById("name-reg").value; //смотрим содержимое поля name
              let indicator = true;
              if (this._users.users) {
                //если такое имя есть, то индикатор становится false
                this._users.users.forEach((item) => {
                  //прохожусь по массиву users в экземпляре _users класса AllUsers
                  if (newName === item.name) {
                    indicator = false;
                  }
                });
              }
              if (
                indicator &&
                document.getElementById("password-reg").value &&
                document.getElementById("password-reg").value ===
                  document.getElementById("rep-password-reg").value &&
                newName
              ) {
                //если имени нет и поле пароля заполнено
                this._users.add({
                  //создаю новый элемент в экземпляре
                  name: `${newName}`,
                  password: `${document.getElementById("password-reg").value}`,
                });
                this._users.save(); //загружаю в хранилище
                this.setCurrentUser(newName);
                this.getFeed();
              } else if (!newName) {
                alert("Enter the name");
              } else if (!indicator) {
                alert("This name is unavailable");
              } else if (!document.getElementById("password-reg").value) {
                alert("Enter the password");
              } else if (!document.getElementById("rep-password-reg").value) {
                alert("Repeat the password");
              } else if (
                document.getElementById("password-reg").value !==
                document.getElementById("rep-password-reg").value
              ) {
                alert("Passwords don't match");
              }
            });
        });
      document.querySelector(".log-in-button").addEventListener("click", () => {
        this._authorizationView.display();
        pageStatus = "authorization";
        this.setCurrentUser("You are guest"); // для того, чтобы после выхода из аккаунта пользователь был как гость, но появилась кнопка выхода
        document.querySelector(".exit-button").addEventListener("click", () => {
          //возврат на страницу, но уже как гость
          this.setCurrentUser();
          this.getFeed();
        });
        document
          .querySelector(".log-in-button-aut") //нажатие на кнопку регистрации на странице регистрации
          .addEventListener("click", () => {
            let autName = document.getElementById("name-aut").value; //смотрим содержимое поля name
            let indicator = false;
            let autPassword = "";
            this._users.users.forEach((item) => {
              if (autName === item.name) {
                indicator = true;
                autPassword = item.password;
              }
            });
            if (
              indicator &&
              document.getElementById("password-aut").value &&
              document.getElementById("password-aut").value === autPassword
            ) {
              this.setCurrentUser(autName);
              this.getFeed();
            } else if (!autName) {
              alert("Enter the name");
            } else if (!indicator) {
              alert("There is no user with this name");
            } else if (!document.getElementById("password-aut").value) {
              alert("Enter the password");
            } else if (
              document.getElementById("password-aut").value !== autPassword
            ) {
              alert("Invalid password");
            }
          });
      });
    }
  }
  addTweet(text) {
    if (this._tweetCollection.add(text)) {
      this.getFeed();
    }
  }
  editTweet(id, text) {
    if (this._tweetCollection.edit(id, text)) {
      this.getFeed();
    }
  }
  removeTweet(id) {
    if (this._tweetCollection.remove(id)) {
      this.getFeed();
    }
  }
  getFeed(skip = 0, top = 10, filterConfig = {}) {
    this._tweetFeedView.display(
      this._tweetCollection.getPage(skip, top, filterConfig)
    );
    this._filterView = new FilterView("mainPage");
    this._filterView.display();
    if (document.getElementById("tweet-button")) {
      document.getElementById("tweet-button").addEventListener("click", () => {
        this.addTweet(document.getElementById("enter-area-txt").value);
        document.getElementById("enter-area-txt").value = "";
      });
    }
    document.getElementById("article").addEventListener("click", (event) => {
      if (event.target.closest("#edit-button")) {
        let tweetId = event.target.closest(".twit").dataset.id;
        let newText = prompt(
          "text",
          `${this._tweetCollection.get(tweetId).text}`
        );
        this.editTweet(`${tweetId}`, newText);
      } else if (event.target.closest("#delete-button")) {
        this.removeTweet(`${event.target.closest(".twit").dataset.id}`);
      } else if (event.target.closest(".twit")) {
        this.showTweet(`${event.target.closest(".twit").dataset.id}`);
      }
    });
    if (
      document.querySelectorAll(".twit").length <
      this._tweetCollection._arrTweets.length
    ) {
      document.getElementById("article").innerHTML += `
      <button type="button" class="show-more-button">
        Show more
        <span id = "arrow" class="iconify" data-icon="ep:arrow-down-bold"></span>
      </button>`;
      document
        .querySelector(".show-more-button")
        .addEventListener("click", () => {
          top += 10;
          this.getFeed(skip, top, filterConfig);
        });
    }
    document.querySelector(".filter-button").addEventListener("click", () => {
      let filCon = {};
      if (document.getElementById("author-search")) {
        filCon.author = `${document.getElementById("author-search").value}`;
      }
      if (
        document.getElementById("date-from") &&
        document.getElementById("date-to")
      ) {
        filCon.dateFrom = `${document.getElementById("date-from").value}`;
        filCon.dateTo = `${document.getElementById("date-to").value}`;
      }
      if (document.getElementById("text")) {
        filCon.text = `${document.getElementById("text").value}`;
      }
      if (document.getElementById("hashtag")) {
        filCon.hashtags = `${document.getElementById("hashtag").value}`;
      }
      this.getFeed(0, this._tweetCollection._arrTweets.length, filCon);
      document
        .getElementById("reset-filter-button")
        .addEventListener("click", () => {
          this.getFeed();
        });
    });
  }
  showTweet(id) {
    this._tweetView.display(id);
    currentTweetId = id;
    document.querySelector(".logo").addEventListener("click", () => {
      this.getFeed();
      pageStatus = "main";
    });
    if (this._tweetCollection._user) {
      document
        .getElementById("add-comment-button")
        .addEventListener("click", () => {
          this._tweetCollection.addComment(
            currentTweetId,
            document.getElementById("enter-area-txt").value
          );
          document.getElementById("enter-area-txt").value = "";
          this.showTweet(id);
        });
    }
  }
}
doLocalStorage();
let t = new TweetsController();
t.setCurrentUser("Vlad");
t.getFeed();
