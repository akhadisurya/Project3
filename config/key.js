var request = require("request");
rp = require('request-promise')
var currentToken={};
var options = { method: 'POST',
  url: 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     'postman-token': 'afd89d7e-6194-82fb-43b5-05ef6cc66339',
     'cache-control': 'no-cache' },
  form:
   { client_id: '9WdP3',
     client_secret: 'xLBCiO/4V7Gy5cQ6A+SKbhJ59Jx5E/Nkui6LqILroJQ=',
     scope: 'http://api.microsofttranslator.com',
     grant_type: 'client_credentials' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log("hi");
  //console.log(JSON.parse(response.body).access_token);
  // currentToken.accessToken= body.access_token;
  currentToken.accessToken= JSON.parse(response.body).access_token;
  console.log(currentToken.accessToken);
});
console.log("moew moew kiry");
//console.log(currentToken.accessToken);
module.exports = currentToken;
