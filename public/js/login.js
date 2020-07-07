function checkLogin(){
  var email = $('#userEmail').val();
  var password = $('#userPass').val();

  $.get("/checklogin",
  {
    email: email,
    password: password
  },
  function(response){
    console.log("login res:" + response);
    if (response == "-1"){
      alert("No Username/Password Combination Found");
    }
    else{
      alert("Login Successfull");
    }
  });


    return false;
}
