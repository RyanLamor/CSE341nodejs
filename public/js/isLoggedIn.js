function isLoggedIn(){
  var isLoggedIn = false;

  $.get("/isLoggedIn",
  {},
  function(response){
    isLoggedIn = response;
    console.log("loggedin: " + response);
  });


    return isLoggedIn;
}
