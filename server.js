const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8888;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/getPictures', getPictures)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

//put functions in other files
function getPictures(req,res){
  
}
