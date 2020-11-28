import React, { useState } from 'react'


const Togglable = (props) => {
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const visibilityToggle = () => {
    setVisibility(!visibility)
  }
  
  return(
  <div>
    <div style={hideWhenVisible}>
      <button onClick={visibilityToggle}>{props.buttonLabel}</button>
    </div>
    <div style={showWhenVisible}>
        {props.children}
      <button onClick={visibilityToggle}>cancel</button>
    </div>
  </div>
  )
}

export default Togglable 