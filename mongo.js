const mongoose = require('mongoose')


const password = process.argv[2]

const url =
  //`mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  `mongodb+srv://Jinneon:${password}@cluster0.bbdj2.mongodb.net/phoneApp?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
      name: String,
      number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(p => {
            console.log(p)
        })
        mongoose.connection.close()
    })

} else {

    const p = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    p.save().then(result => {
        console.log(`new legend was added ${p.name} number is ${p.number}`)
        mongoose.connection.close()
    })
} 