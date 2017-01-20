const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4004

const server = express()
const app = next({ dir: '.', dev })
const handler = app.getRequestHandler()

app.prepare()
  .then(() => {
    server.use(handler)
    server.listen(port)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
