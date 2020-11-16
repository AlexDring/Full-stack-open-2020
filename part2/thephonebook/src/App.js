import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import Notification from './components/Notification'
import contactsService from "./components/services/contacts";


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    contactsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const addName = (event) => {
    event.preventDefault();
    
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    // const contactExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    // if(contactExists) {
    //   if(window.confirm(`${contactExists.name} is already in your phonebook! Do you want to replace their existing phone number - ${contactExists.number}?`)) {
    //     console.log(nameObject, typeof nameObject);
    //     contactsService
    //       .update(contactExists.id, nameObject)
    //       .then(updatedContact =>
    //         setPersons(persons.map(person => 
    //           person.name.toLowerCase() !== updatedContact.name.toLowerCase() 
    //           ? person : updatedContact))
    //         )
    //       .then(success => {
    //         setMessage(`${contactExists.name} was updated!`)
    //         setMessageType('success')
    //         setTimeout(() => {
    //           setMessage(null)
    //         }, 5000)
    //       }
    //       )
    //       .catch(error => { 
    //         setMessage(`Contact information for ${contactExists.name} has already been removed from the server.`)
    //         setMessageType('error')
    //         setPersons(persons.filter(person => person.id !== contactExists.id))
    //         setTimeout(() => {
    //           setMessage(null)
    //         }, 5000)
    //       })
    //   } else {
    //     window.alert(`${contactExists.name} hasn't been added or updated.`)
    //   } 
    // } 
    // else {
      contactsService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setMessage(`${nameObject.name} was added!`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log('ting', error)
          // this is the way to access the error message
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          console.log(error.response.data)
        })
    // }
    setNewName("");
    setNewNumber("");
  };

  const handleFilterChange = (e) => {
    const filterQuery = e.target.value;
    let filtered = persons.filter((person) => {
      return (
        person.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
      );
    });
    setShowAll(persons.length === filtered.length);
    setFilteredContacts(filtered);
  };

  const deleteClick = (id, person) => {
    if (window.confirm(`Delete ${person}?`)) {
      contactsService
      .deleteContact(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter changeHandler={handleFilterChange} />
      <h3>Add new</h3>
      <PersonsForm
        submitHandler={addName}
        nameValue={newName}
        nameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        numberChange={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons
        showAll={showAll}
        filteredContacts={filteredContacts}
        persons={persons}
        deleteClick={deleteClick}
      />
    </div>
  );
};

export default App;
