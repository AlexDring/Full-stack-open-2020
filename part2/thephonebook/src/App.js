import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import contactsService from "./components/services/contacts";
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showAll, setShowAll] = useState(true);

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

    const contactExists = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase())
    if(contactExists) {
      if(window.confirm(`${contactExists.name} is already in your phonebook! Do you want to update their existing phone number - ${contactExists.number}?`)) {
        contactsService
          .update(contactExists.id, nameObject)
          .then(updatedContact =>
            setPersons(persons.map(person => 
              person.name.toLowerCase() !== updatedContact.name.toLowerCase() 
              ? person : updatedContact))
            )
      } else {
        window.alert(`${contactExists.name} hasn't been added or updated.`)
      } 
    } 
    
    else {
      contactsService
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
      })
    }
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
