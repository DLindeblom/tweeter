  $(document).ready(function(){
    let maxlength = 140;
     $("#tweet-text").on("input", function() {
      // console.log(this);
      let currentlength = $(this).val().length;
      let charsLeft = maxlength-currentlength;
      
      let counter = $(this).next().children().closest("output").text(charsLeft);
     
      if(!charsLeft) {
        let element = document.getElementsByClassName("counter")
        element.classList.add("negative")
      }
     });
   });

