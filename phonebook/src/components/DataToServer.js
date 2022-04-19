import axios from 'axios'

//const link = 'http://localhost:3001/api/persons'
const link = 'api/persons'
const getData = () => {
    const request = axios.get(link)
    return request.then(resp => {
      return resp.data
    })
  }

  const swapData = (id, newData) => {axios.put(`${link}/${id}`, newData)}

  const replace = (newobject) => {
    const request = axios.put(link+`/`+newobject.id,newobject)
    return request.then(response => response.data)
  }

  
  const deletePerson = (id) => {
    const request = axios.delete(link+`/`+id.toString())
    console.log("Pressed")
    return request.then(response => response)
  }
  
  

/*const Create = newPerson => {
    const request = axios.post(link, newPerson)
    return request.then(resp => {
        return resp.data
    })*/
    const Create = (newPerson) => {
        const request = axios.post(link, newPerson)
        return request.then((resp) => resp.data)
      }

export default { getData, Create, deletePerson, replace} 