$(document).ready(function() {
  let maxlength = 10;
  $("#tweet-text").on("input", function() {
    // console.log(this);
    let currentlength = $(this).val().length;
    let charsLeft = maxlength - currentlength;

    const counter = $(this).next().children().closest("output").text(charsLeft);

    if (charsLeft < 0) {
      return counter.addClass("red");
    }
    counter.removeClass("red");

  });

});

