import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import FilterP from "./components/FilterP";
import { useState , useEffect} from 'react'
import axios from 'axios'
import './index.css';
import DataToServer from './components/DataToServer'
import Popup from './components/Popup'



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setSearch] = useState('')
  const [errorMessage, setMessage] = useState(null)


  useEffect(() => {
    console.log("Getting data")
    DataToServer.getData()
      .then(personsToGet => {
        console.log(personsToGet)
        setPersons(personsToGet)
      })}, [])

  

   console.log('render',persons.length,'persons')
 

  //Delete name
  const deleteData = (event) => {
    event.preventDefault()
    const id = event.target.value
    
    const personToDelete = persons.find(person => person.id === id)
    console.log('button clicked', event.target)
    if(window.confirm(`Delete ${personToDelete}?`)){
      DataToServer
      .deletePerson(id)
      .then(id => {
        setPersons(persons.filter(person => person.id !== id))
        console.log('button clicked', event.target)
    })
  }
  else{
    console.log("Nothing")
  }
}
  


//Add name
  const addName = (event) => 
  {    
    event.preventDefault()  
    if (persons.find((person) => person.name === newName))  {
     // setError(true);
      window.alert(newName + ' has already been added');
     return false;
      
    }

    const noteObject = {
      name: newName,
      number: newNumber
    }

    console.log('button clicked', event.target)
    DataToServer
    .Create(noteObject)
    .then(personToAdd => {
        setPersons(persons.concat(personToAdd))
    })
   
    setNewName('')
    setNewNumber('')
    setMessage(
      `${newName} new legend has been added`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    
    /*
    setPersons(persons.concat(noteObject))
    setNewNumber('')
    setNewName('')
    addName('')*/
      }
      const personSearched = persons.filter(person => person.name.includes(filter))
      const hNameChange = (event) =>
       {
          //   console.log(event.target.value) 
           setNewName(event.target.value) 
           }
           const hNumberChange = (event) =>
       {
          //   console.log(event.target.value) 
           setNewNumber(event.target.value) 
           }
           const hSearch = (event) => {
            console.log(event.target.value)
            setSearch(event.target.value)
          }
       
  return (
    <div>
      <h2>Phonebook</h2>
      <h2> Add new person </h2>
      <Popup message={errorMessage} />
      <PersonForm addName={addName} newName={newName}
      hNameChange={hNameChange} newNumber={newNumber}
      hNumberChange={hNumberChange} />
            <FilterP header= 'Filter persons: '
      name={filter} hSearch={hSearch} />
      <h2>Numbers</h2>
      <Persons personSearched={personSearched}deleteData={deleteData}  />
      ...
    </div>
  )

}

export default App


