let users = {
  user1: {
    userName: "@elonmusk",
    displayName: "Elon Musk",
    joinedDate: "June 2009",
    followingCount: 103,
    followerCount: 47900000,
    avatarURL: "assets/elonmusk.jpg",
    coverPhotoURL: "assets/elonmusk-cover.jpeg",
    tweetCount: 13600,
    tweets: [
      {
        text: "I admit to judging books by their cover",
        timestamp: "2/10/2021 00:01:20"
      },
      {
        text: "Starship to the moon",
        timestamp: "2/09/2021 18:37:12"
      },
      {
        text: "Out on launch pad, engine swap underway",
        timestamp: "2/09/2021 12:11:51"
      }
    ]
  },
  user2: {
    userName: "@BillGates",
    displayName: "Bill Gates",
    joinedDate: "June 2009",
    followingCount: 274,
    followerCount: 53800000,
    avatarURL: "assets/billgates.jpg",
    coverPhotoURL: "assets/billgates-cover.jpeg",
    tweetCount: 18300,
    tweets: [
      {
        text: "Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/",
        timestamp: "2/10/2021 00:01:20"
      },
      {
        text: "Should I start tweeting memes? Let me know in a comment.",
        timestamp: "2/09/2021 18:37:12"
      },
      {
        text: "In 2020, I read a book every hour.",
        timestamp: "2/09/2021 12:11:51"
      }
    ]
  }
};

// comment this out when reading the query string from the URL:
// let user = allUsers[0];
// let user2 = allUsers[1];
// console.log("getting user1 from fetched data: " + user);

// GETTING a URL PARAMETER
// Read the query string from the URL
const queryString = window.location.search;
console.log(queryString);
// We can then parse the query string’s parameters using URLSearchParams:
const urlParams = new URLSearchParams(queryString);
// Then we call any of its methods on the result.
// For example, URLSearchParams.get() will return the first value associated with the given search parameter:
let userName = urlParams.get("user");
console.log("getting user from the string: " + userName);
let user = users[userName];
console.log("getting user1 object through the string: " + user);

// setting the inner HTML to be more HTML elements by creating as a string
document.body.innerHTML = `
      <div class="container">
        <div class="header">
          <div class="header_wrapper">
            <img src="./assets/arrow-left.png" style="width: 24px; height: 24px" alt="">
            <div class="header_title">
              <div class="header_title_wrapper">
                <h3 class="display_name">${user.displayName}</h3>
                <img src="./assets/icon-verified.png" style="width: 24px; height: 24px" alt="arrow">
              </div>
              <p class="">${user.tweetCount / 1000}K Tweets</p>
            </div>
          </div>
          <div class="header_images">
            <img class="cover_photo" src="${
              user.coverPhotoURL
            }" alt="cover photo">
            <img class="avatar" src="${user.avatarURL}" alt="avatar">
          </div>
          <button class="btn">Following</button>
        </div>
        <div class="profile_details wrapper">
          <h3 class="profile_name">${user.displayName}</h3>
          <p class="profile_username">${user.userName}</p>
          <p class="profile_joined-date"><i style="font-size:19px" class="fa">&#xf073;</i>  Joined ${
            user.joinedDate
          }</p>
          <div class="profile_following">
            <span class="bold">${
              user.followingCount
            }</span><p class=""> Following</p>
            <span class="bold">${
              user.followerCount / 1000000
            }M</span><p class=""> Followers</p>
          </div>
        </div>

        <div class="tab_selector">
          <div class="selector row-1">
            <div class="tab tab-active bold col-3"><p class="tab-text">Tweets</p></div>
            <div class="tab bold col-3"><p class="tab-text">Tweets & Replies</p></div>
            <div class="tab bold col-3"><p class="tab-text">Media</p></div>
            <div class="tab bold col-3"><p class="tab-text">Likes</p></div>
          </div>
          <div id="Tweets" class="content-body show-active">
            ${user.tweets
              .map(function (tweet) {
                // for each tweet we do function that returns tweet in sub-string
                return `
                <div class="tweet_wrapper">
                  <img class="avatar_small" src="${user.avatarURL}" alt="avatar">
                    <div class="tweet">
                      <div class="tweet_credentials">
                        <h3 class="tweet_profile_name">${user.displayName}</h3>
                        <p class="tweet_profile_username">${user.userName}</p>
                        <p class="tweet_date"> - ${tweet.timestamp}</p>
                      </div>
                      <p>${tweet.text}</p>
                    </div>
                </div>
                `;
              })
              .join("")}
          </div>
          <div id="Tweets & Replies" class="content-body">
            <h4>Tweets & Replies</h4>
            <p>NO TWEETS, NO REPLIES</p>
          </div>
          <div id="Media" class="content-body">
            <h4>Media</h4>
            <p>MEDIA IS CRAZY TODAY</p>
          </div>
          <div id="Likes" class="content-body">
            <h4>Likes</h4>
            <p>ZERO LIKES SO FAR</p>
          </div>
        </div>
      </div>
    `;

// TAB CONTENT LOGIC
// Logic that is parsing through tweets and rendering them as HTML elements in tab content-body:
// Other option is to use .map(...) method
// let tweets = document.querySelector("#Tweets");
// for (let tweet of user1.tweets) {
//   let p = document.createElement("p");
//   console.log(tweet);
//   p.textContent = tweet.text;
//   console.log(typeof tweets);
//   tweets.appendChild(p);
// }

// TAB LOGIC
// document.body.appendChild(container);
// 2. function to remove show-active class & add to click
function setNewActive(element) {
  // select all .content-body
  let contentBodies = document.querySelectorAll(".content-body");
  // remove show-active from all of the elements
  for (let contentBody of contentBodies) {
    contentBody.classList.remove("show-active");
  }
  // add show-active (back) to clicked
  // element is HTML element event (e) picked up while listening the tab
  // textContent of the tab will match with the tabs ID
  document.getElementById(element.textContent).classList.add("show-active");

  // switching tabs
  let tabs = document.querySelectorAll(".tab");
  for (let tab of tabs) {
    tab.classList.remove("tab-active");
  }
  // as we are clicking on tabs and element is the currentTarget of the tab, we just add the class to that element
  element.classList.add("tab-active");
}

// 1. select the tabs - .tab class, and loop through
let tabs = document.querySelectorAll(".tab");
// add click listener to each tab
// we can also do here an imperative loop or forEach
for (let tab of tabs) {
  tab.addEventListener("click", function (e) {
    setNewActive(e.currentTarget);
  });
}
