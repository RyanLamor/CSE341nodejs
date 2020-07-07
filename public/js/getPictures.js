function getPictures(){
  var picText = $('#viewPicsText');

  $(document).ready(function(){
    $.get("/getPictures",
    {},
    function(response){
      console.log(response);
      if (response = "-1"){//not logged in
        picText.text("Please Login to see your pictures!");
      }
      else if (response = "-2"){//no results from database
        picText.text("You have no picture albums at this time");
      }
      else {//found results from database
        picText.text("Links will open in Google Photos");
        $('#viewPicsHeader').append("<a href=" + response + "></a>");
      }
    });
  });

}
