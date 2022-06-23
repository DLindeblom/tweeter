/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  

  // sends post request using ajax in jquery serialized form
  const $id = $('#target');
  const $counter = $(".counter")

  $id.submit(function (event) {
    event.preventDefault();
    if($counter.text() < 0) {
      alert("Too many characters")
    } else if ($counter.text() > 139) {
      alert("Please enter text")
    }
    let data = $(this).serialize();
    $.post("/tweets/", data, function(data){
      loadTweets(data)
    });
    $id[0].reset()
    $counter.text() = 140
    
    
    // console.log(data)

  });

  // uses ajax get request to get tweets

  const loadTweets = function() {

    $.get("/tweets/", function(data) {
      renderTweets(data)})

  }
  
  loadTweets()

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
    const $time = timeago.format(tweet.created_at);
    const safeHTML = `${escape($text)}`;

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
        ${safeHTML}
    </div>
    <footer>
      <time>${$time}</time>
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
