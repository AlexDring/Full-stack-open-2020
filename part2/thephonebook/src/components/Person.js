import React from "react";

const Person = ({ person, deleteClick }) => <div>{person.name} {person.number} <button onClick={() => deleteClick(person.id, person.name)}>delete</button></div>

export default Person;
