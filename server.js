//Init DataStore for application
import DataStore from './DataStore'
//Config
import config from './config'
//Libraries
import express from 'express'
const app = express();
import bodyparser from 'body-parser'

//routes
import routes from './routes'

app.use(bodyparser.json({}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//used for "health check"
app.get('/status', (req, res) => {
  res.send({
    data: 12
  })
})
//all routes for application

DataStore.init(() => {
  app.use(config.server.prefix, routes);
  // error handling
  app.use((err, req, res, next) => {
    res.send(err)
  })

  app.listen(config.server.port);
  console.log("Server listening on port " + config.server.port);  
})

