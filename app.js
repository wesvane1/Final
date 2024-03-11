const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { body } = require('express-validator');

const port = process.env.PORT
const app = express();

app.use('/', require('./routes'));

app
  .use('/api-docs', swaggerUi.serve, seaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
  
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
