const express = require('express');
const morgan = require('morgan');
const app = express()

app.use(express.json())
const cors = require('cors')
app.use(cors())
//app.use(morgan)
//app.use(morgan("tiny"));
morgan.token('body', (req) => JSON.stringify(req.body))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))
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
   // resp.json(person)
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
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
}) */
//3.9
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)  
})


//In the first row, the application imports Node's built-in web server module. 
//This is practically what we have already been doing in our browser-side code
//, but with a slightly different syntax:
//const http = require('http')
/*const express = require('express')
const app = express()
app.use(express.json())*/
//const app = express()
//Next, we define two routes to the application.
// The first one defines an event handler that is used to handle 
//HTTP GET requests made to the application's / root:

//The event handler function accepts two parameters.
  // The first request parameter contains all of the information of the HTTP request,
  //  second response parameter is used to define how the request is responded to.
/*app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })*/
  //The second route defines an event handler that handles HTTP GET requests 
  //made to the notes path of the application:
  /*app.get('/api/notes', (request, response) => {
    response.json(notes)
  })*/
  //new
  /*let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
  
 
  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })
  
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })
  
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
  
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  
  const PORT = 3002
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }
  )

/*const app = http.createServer((request, response) => { 
     response.writeHead(200, { 'Content-Type': 'application/json' }) 
 response.end(JSON.stringify(notes))})
//Let's restart the server
// (you can shut the server down by typing Ctrl+C in the console)
const PORT = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)*/
//npm install --save-dev nodemon to automatically refresh page
// We can start our application with nodemon like this:
// node_modules/.bin/nodemon index.js
//New command
// npm run dev

