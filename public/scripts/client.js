/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // sends post request using ajax in jquery serialized form
  const $id = $('#target');

  $id.submit(function (event) {
    event.preventDefault();
    let data = $(this).serialize();
    $.post("/tweets/", data);
    // console.log(data)

  });

  // uses ajax get request to get tweets

  const loadTweets = function() {
    
    // $.ajax({
    //   url:"/tweets/",
    //   type: "GET",
    //   dataType: "json",
    //   success: function(data) {
    //     renderTweets(data)
    //   }

    // })

    $.getJSON("/tweets/", function(data) {renderTweets(data)})

  }
  
  loadTweets()

/*   const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]; */

  // sorts the array of objects and then passes them to createTweetElement which then appaends them to index.html body
  const renderTweets = function(tweets) {

    for (let tweet of tweets) {
      let result = createTweetElement(tweet);
      $('#tweets-container').prepend(result);
    }

  };


  // takes in the object and returns the html with specific data
  const createTweetElement = function(tweet) {

    const $user = tweet.user.name;
    const $avatar = tweet.user.avatars;
    const $handle = tweet.user.handle;
    const $text = tweet.content.text;
    const $date = tweet.created_at;

    let $tweet = $(`<article>  <article id="tweet-article">
    <header>
      <div class="img">
        <img src="${$avatar}">
        <p>
          ${$user}
        </p>
      </div>
      <div class="address">
        <address>
          ${$handle}
        </address>
      </div>
    </header>
    <div class="text-area">
      <p>
        ${$text}
      </p>
    </div>
    <footer>
      <time>${$date}</time>
      <div class="options">
        <span class="hover"><i class="fa-solid fa-flag"></i></span>
        <span class="hover"><i class="fa-solid fa-retweet"></i></span>
        <span class="hover"><i class="fa-solid fa-heart"></i></span>
      </div>
    </footer>
  </article> </article>`);


    return $tweet;
  };

  renderTweets(data);

});
