function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
function doLocalStorage() {
  if (!localStorage.user) {
    let user = {
      userName: undefined,
      token: undefined,
    };
    localStorage.setItem("user", JSON.stringify(user));
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
class ErrorView {
  constructor(id) {
    this.errorPage = document.getElementById(id);
  }
  display(error) {
    pageStatus = "error";
    this.errorPage.innerHTML = `
    <div id ="errorPage">
        <div id="window">
          <img src = "../mockups/extra tasks/Logo.svg" class = "logo" alt = "logo"/>
          <p>${error}</p>
        </div>
    </div>
    `;
  }
}
class TweetFeedApiService {
  constructor(address) {
    this._adress = address;
  }
  getTweets(skip = 0, top = 10, filterConfig = {}) {
    fetch(
      this.filter(
        `${this._adress}/tweet?from=${skip}&count=${top}`,
        filterConfig
      )
    )
      .then((response) => response.json())
      .then((arr) => {
        let key = 1;
        if (arr.length < top) {
          key = 0;
        }
        t.getFeed(
          skip,
          top,
          filterConfig,
          arr.slice(skip, top),
          JSON.parse(localStorage.getItem("user")).userName,
          key
        );
      })
      .catch((error) => {
        t.getError(`${error.message}`);
      });
  }
  login(name, password) {
    let req = {
      method: "POST",
      headers: {
        ["accept"]: "application/json",
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(`{login: ${name}, password: ${password}}`),
    };
    fetch(`${this._adress}/login`, req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((response) => {
        let user = {
          userName: name,
          token: response.token,
        };
        localStorage.setItem("user", JSON.stringify(user));
        t.setCurrentUser(name);
        this.getTweets();
      })
      .catch((error) => {
        if (error.message === "403") {
          alert("Invalid name or password");
        } else {
          t.getError(`${error.message}`);
        }
      });
  }
  registration(name, password) {
    let req = {
      method: "POST",
      headers: {
        ["accept"]: "application/json",
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(`{login: ${name}, password: ${password}}`),
    };
    fetch(`${this._adress}/registration`, req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((response) => {
        alert("you have successfully registered");
        this.login(name, password);
      })
      .catch((error) => {
        if (error.message === "409") {
          alert("User with this name is already exist");
        } else {
          t.getError(`${error.message}`);
        }
      });
  }
  logout() {
    let user = {
      userName: undefined,
      token: undefined,
    };
    localStorage.setItem("user", JSON.stringify(user));
    t.setCurrentUser("");
    this.getTweets();
  }
  filter(adress, filters) {
    if (filters) {
      if (filters.author) {
        adress += `&author=${filters.author}`;
      }
      if (filters.text) {
        adress += `&text=${filters.text}`;
      }
      if (filters.dateFrom) {
        adress += `&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}`;
      }
      if (filters.hashtags) {
        adress += `&hashtags=${filters.hashtags}`;
      }
      return adress;
    } else {
      return adress;
    }
  }
  getTweet(id, skip = 0, top = 10, filterConfig = {}) {
    fetch(
      this.filter(
        `${this._adress}/tweet?from=${skip}&count=${top}`,
        filterConfig
      )
    )
      .then((response) => response.json())
      .then((response) => {
        let user = response.find((tweet) => tweet.id === id);
        t.showTweet(id);
      })
      .catch((error) => t.getError(`${error.message}`));
  }
  createTweet(text) {
    let req = {
      method: "POST",
      headers: {
        ["accept"]: "application/json",
        ["authorization"]: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(`{text: ${text}}`),
    };
    fetch(`${this._adress}/tweet`, req)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((response) => {
        this.getTweets();
      })
      .catch((error) => {
        t.getError(error.message);
      });
  }
  editTweet(id, text) {
    let req = {
      method: "PUT",
      headers: {
        ["authorization"]: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(`{text: ${text}}`),
    };
    fetch(`${this._adress}/tweet/{${id}}`, req)
      .then((response) => {
        if (response.ok) {
          return response.ok;
        }
      })
      .then((response) => {
        this.getTweets();
      })
      .catch((error) => {
        t.getError(error.message);
      });
  }
  removeTweet(id) {
    let req = {
      method: "DELETE",
      headers: {
        ["authorization"]: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(`{text: ${text}}`),
    };
    fetch(`${this._adress}/tweet/{${id}}`, req)
      .then((response) => {
        if (response.ok) {
          return response.ok;
        } else {
          throw Error(response.status);
        }
      })
      .then((response) => {
        this.getTweets();
      })
      .catch((error) => {
        t.getError(error.message);
      });
  }
  createComment(id, text, skip = 0, top = 10, filterConfig = {}) {
    let req = {
      method: "POST",
      headers: {
        ["accept"]: "application/json",
        ["authorization"]: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(`{text: ${text}}`),
    };
    fetch(`${this._adress}/tweet/{${id}}/comment`, req)
      .then((response) => {
        if (response.ok) {
          return response.ok;
        } else {
          throw Error(response.status);
        }
      })
      .then((response) => {
        this.getTweet(id, skip, top, filterConfig);
      })
      .catch((error) => {
        t.getError(error.message);
      });
  }
}
class TweetsController {
  constructor() {
    this._headerView = new HeaderView("header");
    this._tweetFeedView = new TweetFeedView("main");
    this._filterView = new FilterView("mainPage");
    this._tweetView = new TweetView("main");
    this._registrationView = new RegistrationView("main");
    this._authorizationView = new AuthorizationView("main");
    this._errorView = new ErrorView("main");
    this._user = "";
  }
  setCurrentUser(user) {
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
  getError(message) {
    this._errorView.display(message);
  }
}
doLocalStorage();
let t = new TweetsController();
let api = new TweetFeedApiService("https://jslabapi.datamola.com");
t.setCurrentUser(JSON.parse(localStorage.getItem("user")).userName);
api.getTweets();
