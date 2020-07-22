function newRegister(){
  var email = $('#newUserEmail').val();
  var password = $('#newUserPass').val();
  var firstName = $('#newFirstName').val();
  var lastName = $('#newLastName').val();

  $.post("/register",
  {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName
  },
  function(response){
    console.log("register response:" + response);
    if (response == "success"){
      alert("New User Created, Please Head To Login");
    }
    else{
      alert("Error with database: " + response);
    }
  });


    return false;
}
