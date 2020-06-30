function getPictures(){
  console.log("pictures js");

  $(document).ready(function(){
    $.get("/getPictures",
    {

    },
    function(response){
      console.log(response);
    });
  });

}
