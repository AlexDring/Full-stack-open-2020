import React from "react";
import Person from "./Person";

const Persons = ({ showAll, filteredContacts, persons, deleteClick }) => {
  if (showAll) {
    return persons.map((person) => (
      <Person key={person.id} person={person} deleteClick={deleteClick} />
    ));
  } else {
    return filteredContacts.map((person) => (
      <Person key={person.id} person={person} deleteClick={deleteClick} />
    ));
  }
};

export default Persons;
