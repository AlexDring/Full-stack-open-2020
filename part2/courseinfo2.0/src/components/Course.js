import React from 'react'

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }

const Content = ({ parts }) => {
  return (
    <div> 
        {parts.map(part => 
          <Part key={part.id} part={part} />
        )}
    </div> 
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, c) => s + c.exercises, 0)
  return(
    <strong>total of {total} exercises</strong>
  )
}

const Course = ({ course }) => {
  return(
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course 