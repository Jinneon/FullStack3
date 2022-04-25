const express = require('express');
const morgan = require('morgan');
const app = express()
require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
//app.use(morgan)
//app.usemorgan("tiny"));
morgan.token('body', (req) => JSON.stringify(req.body))
//app.use(morgan(':metahod :url :status :res[content-length] - :response-time ms :body' ))
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
  {
    name: 'Jiyeon',
    number: '777-555-333',
    id: 5,
  },
];

/*app.get('/api/persons', (req, res) =>{
    res.json(persons)
})*/
app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
});

app.get('/api/info', (req, res) =>{
  Person.findById(req.params.id).then(note => {
    response.json(note)
  })
})
  /*  const utcDate1 = new Date(Date.now());
    res.send(`<p> Has  ${persons.length}
     persons </p> <p> ${utcDate1.toUTCString()}</p>`)
})*/

app.get('/api/persons/:idNumber', (req, resp) =>{
  const idNumber = req.params.idNumber
  const person =  persons.find(person => {return person.id == idNumber})
  console.log(person)
  if(person){
      resp.json(person)
  }
  else{
    console.log("Cant")
      resp.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, resp,next) => {
  Person.findByIdAndRemove(id)
  console.log(id + " mongo id")
      .then(result =>{
          resp.status(204).end()
      })
      .catch(error => next(error))
  console.log(request.params)
  //const id = req.params.id
  //console.log(id, typeof(id))
//
  // persons = persons.filter(person => person.id != id)
  // res.status(204).end()
 
 /* const idNumber = Number(req.params.idNumber)
  const person = persons.filter(person => person.id != idNumber)
 
  if(person){
   {
   // resp.json(peson)
    console.log("Works")
   }
  
}
  resp.status(204).end()*/
})



/*app.use(express.json())
app.post('/api/person', (request, response) => { 
   const note = request.body 
    console.log(note) 
     response.json(note)})*/
     const createID = () => {
      return Math.floor(Math.random() * 1000000);
  };
  
 /* app.post('/api/persons', (request, response) => { 
     const note = request.body 
      console.log(note)
        response.json(note)})*/
        
        
        app.post('/api/persons', (request, response, next) => {
          const bo = request.body
           console.log(bo)
        
          if (!bo.name) {
            return response.status(400).json({
              error: 'Name is empty'
            })
          }
        
          if (!bo.number) {
            return response.status(400).json({
              error: 'Number is empty'
            })
          }
        
          ///
          Person.find({}).then(persons => {
            console.log('persons: ', persons)
        
            if (persons.some(person => person.name === bo.name)) {
              console.log('name must be unique')
              return response.status(400).json({
                error: 'name must be unique'
              })
            }
        
            let person = new Person({
              name: bo.name,
              number: bo.number
            })
            // id: generateId(),
        
            // save in mongod DV
            // var opts = { runValidators: true };
        
            person.save().then(savedPerson => {
              response.json(savedPerson)
            })
              .catch(error => next(error))
          })
        })


/*const PORT =3001
app.listen(ORT, () => {
    console.log(`server running on port ${PORT}`)
}) */
//3.9
//const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)  
})



//npm install --save-dev nodemon to automatically refresh page
// We can start our application with nodemon like this:
// node_modules/.bin/nodemon index.js
//New command
// npm run dev

