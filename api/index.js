const fs = require('fs')
const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.use(bodyParser.json())

const credentials = JSON.parse(fs.readFileSync('../credentials.json').toString())
const port = 3000

let db = null
let school = null
let program = null
let applicant = null
let application = null

app.get('/applicant', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await applicant.find(filter).toArray()
  res.send(results)
})

app.get('/application', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await application.find(filter).toArray()
  res.send(results)
})

app.get('/school', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await school.find(filter).toArray()
  res.send(results)
})

app.get('/program', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await program.find(filter).toArray()
  res.send(results)
})

app.put('/applicant', async (req, res) => {
  if (! req.body.data) {
    res.send('no data')
    return
  }
  try {
    let data = JSON.parse(req.body.data)
    let filter = { id: data.id }
    let exist = await applicant.findOne(filter)
    if (exist) {
      await applicant.updateOne(filter, { $set: Object.assign(exist, data) })
    } else {
      await applicant.insertOne(data)
    }
    res.send('ok')
  } catch(err) {
    console.log(err)
    res.send('failed')
  }
})

app.put('/application', (req, res) => {
  
})

app.put('/school', (req, res) => {

})

app.put('/program', (req, res) => {

})

async function init() {
  db = await MongoClient.connect(credentials.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  db = db.db('go_abroad')
  applicant = db.collection('applicant')
  application = db.collection('application')
  school = db.collection('school')
  program = db.collection('program')
  app.listen(port)

  let res = await axios.get(`http://localhost:${port}/applicant`, {
    params: {
      filter: `{"id": "CarrotParsley"}`
    }
  })
  console.log(res.data)
  res = await axios.put(`http://localhost:${port}/applicant`, {
    data: `{"id": "CarrotParsley", "newattr": "hi!"}`
  })
  console.log(res.data)
}

init()
