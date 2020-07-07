function start() {
  $(document).ready(function(){
    addeventlisteners();
    render(window.location.hash);
  });
}

function addeventlisteners(){
  window.onhashchange = function(){
    render(window.location.hash);
  };
}

//The following method was adapted from james murphy's video series Node js A to Z
//https://www.youtube.com/watch?v=kaBQqhtGUcM
function render(hashkey){
    //hide all page divs
    let pages = document.querySelectorAll(".page");
    for (let i = 0; i < pages.length; ++i){
      pages[i].style.display = 'none';
    }

    //unhide the page that was selected
    switch(hashkey){
      case "#home":
        pages[0].style.display= 'block';
        break;
      case "#register":
        pages[1].style.display= 'block';
        break;
      case "#appointment":
        pages[2].style.display= 'block';
        break;
      case "#pictures":
        pages[3].style.display= 'block';
        //add function call to get info from database
        //function will call '/getpictures' on server
        //return JSON of album link
        getPictures();
        break;
      case "#login":
        pages[4].style.display= 'block';
        if ( isLoggedIn() ){
          //document.getElementById("loginForm").style.display = 'block';
          //document.getElementById("alreadyLoggedIn").style.display = 'none';
          $('#loginForm')[0].style.display = 'none';
          $('#alreadyLoggedIn')[0].style.display = 'block';
        }
        else {
          //document.getElementById("loginForm").style.display = 'block';
          //document.getElementById("alreadyLoggedIn").style.display = 'none';
          $('#loginForm')[0].style.display = 'block';
          $('#alreadyLoggedIn')[0].style.display = 'none';
        }
        break;
      default:
        window.location.replace("#home");
        break;
      }
}
