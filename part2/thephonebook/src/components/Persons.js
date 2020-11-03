import React from "react";
import Person from "./Person";

const Persons = ({ filtered, filteredContacts, persons }) => {
  if (filtered) {
    return persons.map((person) => (
      <Person key={person.name} person={person} />
    ));
  } else {
    return filteredContacts.map((person) => (
      <Person key={person.name} person={person} />
    ));
  }
};

export default Persons;
