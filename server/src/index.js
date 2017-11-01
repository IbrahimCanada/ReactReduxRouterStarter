import express from 'express'
import path from 'path'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import httpStatus from 'http-status'
import expressWinston from 'express-winston'

import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'

// Configuration Settings
import config from './config/'
import APIError, { unifiyError } from './helpers/APIError'
import winstonInstance from './config/winston'

import api from './routes/api.v1'

const app = express()

app.use(helmet())
app.use(compress())
app.use(cors())

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body')
  expressWinston.responseWhitelist.push('body')
  app.use(
    expressWinston.logger({
      winstonInstance,
      meta: false, // optional: log meta data about request (defaults to true),
      msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
      colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    })
  )
}

// MongoDB and Mongoose Setup
mongoose.Promise = global.Promise
const mongoUri = config.mongo.host
mongoose.connect(mongoUri, { useMongoClient: true, keepAlive: 1 })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

const MongoStore = connectMongo(session)

app.use(session({
  secret: 'treehouse loves you',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60
  })
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../../build')))
app.use('/files', express.static(path.join(__dirname, '../files')))

app.use('/api/v1', api)
// Server side rendering
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')

// app.use(renderHandler)

// Server side sending bundle
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../../build/index.html'))
// })

// PROXY
// const apiProxy = httpProxy.createProxyServer({
//   target: 'http://localhost:3001/api/v1'
// })

// app.use('/api/v1', (req, res) => {
//   apiProxy.web(req, res)
// })

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND)
  next(err)
})

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }))
}

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  next(err, req, res, next)
})

app.use((err, req, res, next) => {
  next(unifiyError(err))
})

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  res.status(err.status).json({
    status: err.status,
    message: err.isPublic ? err.message : httpStatus[err.status]
    // stack: config.env === 'development' ? err.stack : {}
  })
})

export default app
