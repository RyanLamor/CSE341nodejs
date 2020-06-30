function checkLogin(){
  var email = $('#userEmail').val();
  var password = $('#userPass').val();

  $.get("/checklogin",
  {
    email: email,
    password: password
  },
  function(response){
    console.log("test" + response);
  });


    return false;
}
