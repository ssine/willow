import * as fs from 'fs'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { MongoClient, Collection, Db } from 'mongodb'
import * as cors from 'cors'
const app = express()
app.use(bodyParser.json())
app.use(cors())

const credentials = JSON.parse(fs.readFileSync('credentials.json').toString())
const config = JSON.parse(fs.readFileSync('config.json').toString())

let db: Db
let university: Collection
let program: Collection
let applicant: Collection
let application: Collection

app.get('/applicant', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await applicant.find(filter).toArray()
  res.send(results)
})

app.post('/applicants', async (req, res) => {
  let filters: any[] = req.body.filters ? req.body.filters : []
  let results: any[] = []
  let proms = filters.map(async (f, idx) => {
    results[idx] = await applicant.find(JSON.parse(f)).toArray()
  })
  await Promise.all(proms)
  res.send(results)
})

app.get('/application', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await application.find(filter).toArray()
  res.send(results)
})

app.get('/university', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await university.find(filter).toArray()
  res.send(results)
})

app.get('/program', async (req, res) => {
  let filter = req.query.filter ? JSON.parse(req.query.filter) : {}
  let results = await program.find(filter).toArray()
  res.send(results)
})

app.post('/programs', async (req, res) => {
  let filters: any[] = req.body.filters ? req.body.filters : []
  let results: any[] = []
  let proms = filters.map(async (f, idx) => {
    results[idx] = await program.find(JSON.parse(f)).toArray()
  })
  await Promise.all(proms)
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

app.put('/application', async (req, res) => {
  if (! req.body.data) {
    res.send('no data')
    return
  }
  try {
    let data = JSON.parse(req.body.data)
    let filter = { url: data.url }
    let exist = await application.findOne(filter)
    if (exist) {
      await application.updateOne(filter, { $set: Object.assign(exist, data) })
    } else {
      await application.insertOne(data)
    }
    res.send('ok')
  } catch(err) {
    console.log(err)
    res.send('failed')
  }
})

app.put('/university', async (req, res) => {
  if (! req.body.data) {
    res.send('no data')
    return
  }
  try {
    let data = JSON.parse(req.body.data)
    let filter = { name: data.name }
    let exist = await university.findOne(filter)
    if (exist) {
      await university.updateOne(filter, { $set: Object.assign(exist, data) })
    } else {
      await university.insertOne(data)
    }
    res.send('ok')
  } catch(err) {
    console.log(err)
    res.send('failed')
  }
})

app.put('/program', async (req, res) => {
  if (! req.body.data) {
    res.send('no data')
    return
  }
  try {
    let data = JSON.parse(req.body.data)
    let filter = { university: data.university, name: data.name }
    let exist = await program.findOne(filter)
    if (exist) {
      await program.updateOne(filter, { $set: Object.assign(exist, data) })
    } else {
      await program.insertOne(data)
    }
    res.send('ok')
  } catch(err) {
    console.log(err)
    res.send('failed')
  }
})

async function init() {
  let client = await MongoClient.connect(credentials.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  db = client.db('go_abroad')
  applicant = db.collection('applicant')
  application = db.collection('application')
  university = db.collection('university')
  program = db.collection('program')
  app.listen(config.port, config.host)
  console.log(`server listining on ${config.host}:${config.port}`)
}

init()
