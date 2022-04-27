import React from 'react'


const Persons = ({deleteData,personSearched}) => {
  return (
    <div>{personSearched.map((person,id) => <div key={id}>{person.name} {person.number}
     <button type="button" value={person.id} onClick={deleteData}>Delete</button></div>)}
    </div>
  )
}

export default Persons