import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [showFiltered, setShowFiltered] = useState(true);

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleFilterChange = (e) => {
    const filterQuery = e.target.value;
    let filtered = persons.filter((person) => {
      return (
        person.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1
      );
    });
    setShowFiltered(persons.length === filtered.length);
    setFilteredContacts(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter changeHandler={handleFilterChange} />
      <h3>Add new</h3>
      <PersonsForm
        submit={addName}
        nameValue={newName}
        nameChange={(e) => setNewName(e.target.value)}
        numberValue={newNumber}
        numberChange={(e) => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons
        filtered={showFiltered}
        filteredContacts={filteredContacts}
        persons={persons}
      />
    </div>
  );
};

export default App;
