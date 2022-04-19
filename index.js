const express = require('express');
const morgan = require('morgan');
const app = express()

app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
//app.use(morgan)
//app.use(morgan("tiny"));
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
const note = [
  { 
    "id": 1,
    "name": "Testing yoyo", 
    "number": "040-123456"
  }

]
app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.get('/api/info', (req, res) =>{
    const utcDate1 = new Date(Date.now());
    res.send(`<p> Has  ${persons.length}
     persons </p> <p> ${utcDate1.toUTCString()}</p>`)
})

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

app.delete('/api/persons/:idNumber', (req, resp) => {
  const idNumber = Number(req.params.idNumber)
  const person = persons.filter(person => person.id != idNumber)
 
  if(person){
   {
   // resp.json(peson)
    console.log("Works")
   }
  
}
  resp.status(204).end()
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

        app.post("/api/persons", (req, res) => {
          const bo = req.body;
          if (!bo.name) {
              return res.status(400).json({
                  error: "Name is empty",
              });
          } else if (!bo.number) {
              return res.status(400).json({
                  error: "Number is empty",
              });
          } else if (persons.map(p => p.name).indexOf(bo.name) >= 0) {
              return res.status(400).json({
                  error: "Name must be unique",
              });
          }
          
          let person = {
              name: bo.name,
              number: bo.number,
              id: createID()
          }
          persons = persons.concat(person);
          res.json(person)
      });




/*const PORT =3001
app.listen(ORT, () => {
    console.log(`server running on port ${PORT}`)
}) */
//3.9
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)  
})



//npm install --save-dev nodemon to automatically refresh page
// We can start our application with nodemon like this:
// node_modules/.bin/nodemon index.js
//New command
// npm run dev

