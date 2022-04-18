import React from 'react'

const PersonForm = ({addName,newName,hNameChange,newNumber,hNumberChange}) => {
  return (
    <div>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={hNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={hNumberChange}/>
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm