const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4004

const server = express()
const app = next({ dir: '.', dev })
const handler = app.getRequestHandler()

app.prepare()
  .then(() => {
    server.use(cookieParser())

    // Handling login
    server.use((req, res, next) => {
      if (!req.query.loginToken) return next()

      res.cookie('loginToken', req.query.loginToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        httpOnly: false
      })

      return res.redirect(req._parsedUrl.pathname)
    })

    // Handling logout
    server.use((req, res, next) => {
      if (!req.query.logout) return next()

      res.cookie('loginToken', null, {
        expires: new Date(Date.now() - 1000),
        httpOnly: false
      })

      return res.redirect(req._parsedUrl.pathname)
    })

    server.get('/start', (req, res) => {
      app.render(req, res, '/content', {})
    })

    server.get('/:course/:lesson/:step?', (req, res) => {
      const { course, lesson, step } = req.params
      if (course === '_webpack' || course === '_next') {
        return handler(req, res, req._parsedUrl)
      }

      app.render(req, res, '/content', { course, lesson, step })
    })

    server.use((req, res) => {
      handler(req, res)
    })
    server.listen(port)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
