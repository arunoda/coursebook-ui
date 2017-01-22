const next = require('next')
const express = require('express')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4004

const server = express()
const app = next({ dir: '.', dev })
const handler = app.getRequestHandler()

app.prepare()
  .then(() => {
    server.get('/:course/:lesson', (req, res) => {
      const { course, lesson } = req.params
      if (course === '_webpack' || course === '_next') {
        return handler(req, res)
      }
      
      app.render(req, res, '/content', { course, lesson })
    })

    server.use(handler)
    server.listen(port)
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
