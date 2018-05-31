const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs')


app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next(); //moves to the next middlewhere
}); //how to register middle where by using app.use(), next tells you when middlewhere is done. always need to include next to move on.

// app.use((req, res, next) => {
//   res.render('maintance.hbs');
// });

app.use(express.static(__dirname + '/public')); //example of middlewhere. you can do a lot with middlewhere. like sending and getting requests

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});




hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (request, response) => {
  // response.send('<h1>Hello express!</h1>');
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});


app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'unable to reach host'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
