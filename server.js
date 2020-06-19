const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8888;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/getRate', getData)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function getData(req,res){
  const weight = Number(req.query.weight);
  const mailType = req.query.mailType;

  calcRate(res, weight, mailType);
}

function calcRate(res, weight, mailType){

  var cost = 0;

  if (mailType == "Letters_stamped"){
    if (weight > 3 && weight < 3.5){
      weight = 3;
    }
    else{
      weight = Math.ceil(weight);
    }

    if (weight >= 4)
      cost = 1;
    else
      cost = 0.55 + (.15 * (weight - 1) );

  }
  else if (mailType == "Letters_metered"){
    if (weight > 3 && weight < 3.5){
      weight = 3;
    }
    else{
      weight = Math.ceil(weight);
    }

    if (weight >= 4)
      cost = 0.95;
    else
      cost = 0.50 + (.15 * (weight - 1) );

  }
  else if (mailType =="large_envelope"){
    weight = Math.ceil(weight);

    if (weight >= 13)
      cost = 3.4;
    else
      cost = 1.00 + (.20 * (weight - 1) );

  }
  else if (mailType == "First_Class"){
    weight = Math.ceil(weight);
    switch (weight) {
      case 1:
      case 2:
      case 3:
      case 4:
        cost = 3.8;
        break;
      case 5:
      case 6:
      case 7:
      case 8:
        cost = 4.6;
        break;
      case 9:
      case 10:
      case 11:
      case 12:
        cost = 5.3;
        break;
      default:
        cost = 5.9;
    }
  }

  cost = Number.parseFloat(cost).toFixed(2);

  const params = {weight: weight, mailType: mailType, cost: cost};

  res.render('pages/postageRate', params);
}
