const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/getRate', getData)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getData(req,res){
  const weight = req.query.weight;
  const mailType = req.query.mailType;

  calcRate(res, weight, mailType)
}

function calcRate(res, wieght, mailType){

  var cost = 100;

  const params = {weight: weight, mailType: mailType, cost: cost}

  res.render('pages/poastageRate', params);
}
