const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useNewUrlParser: true,
})

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  review: String,
})
const Fruit = mongoose.model('Fruit', fruitSchema)

app.get('/', (req, res) => {
  Fruit.find((err, fruits) => {
    if (err) {
      console.log(err)
    } else {
      fruits.forEach((fruit) => {
        res.write(`${fruit.name}, `)
      })
      res.send()
    }
  })
})

app.get('/add', (req, res) => {
  const fruit = new Fruit({
    name: 'Apple',
    rating: 7,
    review: 'Pretty solid.',
  })
  fruit.save()

  const kiwi = new Fruit({
    name: 'Kiwi',
    rating: 5,
    review: 'Pretty kiwiwiwiwiki.',
  })
  const orange = new Fruit({
    name: 'Orange',
    rating: 8,
    review: 'Decent orangeseseses.',
  })
  const banana = new Fruit({
    name: 'Banana',
    rating: 10,
    review: 'Minions go brrrrrnana.',
  })

  Fruit.insertMany([kiwi, orange, banana], (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Successfully fruity.')
    }
  })
})
app.get('*', (req, res) => {
  res.send('404 | What are you looking for?')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
