import express from 'express'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import api from './api.routes'
const app = express()
const port = 8000

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
mongoose.connect('mongodb://localhost:27017/essenceTest', { useNewUrlParser: true })
  .then(con => {
    console.log('mongodb://localhost:27017/essenceTest connect successfully..')
  })
  .catch(err => {
    console.log('Some Problem to connect databse ', err)
  })

module.exports = app
