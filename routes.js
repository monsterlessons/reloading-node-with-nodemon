const User = require('./models/user')

module.exports = app => {
  app.get('/user', (req, res) => {
    User.findUserByName('alex', (err, user) => {
      res.json(user)
    })
  })

  app.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return next(err)
      }
      res.json(user)
    })
  })

  app.use((err, req, res, next) => {
    const isNotFound = ~err.message.indexOf('not found')
    const isCastError = ~err.message.indexOf('Cast to ObjectId failed')

    if (err.message && (isNotFound || isCastError)) {
      return next()
    }

    console.log(err.stack)
    res.status(500).json({error: err.stack})
  })

  app.use((req, res) => {
    res.sendStatus(404)
  })
}
