const express = require('express');

const morgan = require('morgan');
const app = express()
require('dotenv').config()
const Person = require('./models/Person')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
//app.use(morgan)
//app.usemorgan("tiny"));
morgan.token('body', (req) => JSON.stringify(req.body))
////app.use(morgan(':metahod :url :status :res[content-length] - :response-time ms :body' ))
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


app.get('/api/persons/:idNumber', (req, resp) =>{
  const idNumber = req.params.idNumber
  const person =  persons.find(person => {return person.id == idNumber})
  console.log(person)
  if(person){
      resp.json(person)
  }
  else{
    console.log("Person doesn´t exist")
      resp.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, resp,next) => {
  ///console.log(req.params)
 

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      resp.status(204).end()
    })
    .catch(error => next(error))
    
})




     const createID = () => {
      return Math.floor(Math.random() * 1000000);
  };
  
 
        
        
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
              console.log('Name must be unique')
              return response.status(400).json({
                error: 'Name must be unique'
              })
            }
        
            let person = new Person({
              name: bo.name,
              number: bo.number
            })
            
   
        
            person.save().then(savedPerson => {
              response.json(savedPerson)
            })
              .catch(error => next(error))
          })
        })

        const unknownEndpoint = (request, response) => {
          response.status(404).send({ error: 'unknown endpoint' })
        }
        
        app.use(unknownEndpoint)
        
        const errorHandler = (error, request, response, next) => {
          console.error(error.message)
        
          if (error.name === 'CastError') {
            return response.status(400).send({ error: 'malformatted id' })
          }
        
          next(error)
        }
        
        app.use(errorHandler)
        
        

/*const PORT =3001
app.listen(ORT, () => {
    console.log(`server running on port ${PORT}`)
}) */

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

