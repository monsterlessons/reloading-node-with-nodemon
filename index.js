const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
routes(app)

const port = 3999
const startServer = () => {
  app.listen(port)
  console.log(`App started on port ${port}`)
}
const connectDb = () => {
  mongoose.Promise = require('bluebird')

  const options = {
    useMongoClient: true
  }

  mongoose.connect('mongodb://localhost/testmongoose', options)
  return mongoose.connection
}

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
