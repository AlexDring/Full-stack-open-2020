import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

// const Togglable = (props) => {
// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => { // TODO React.forwardRef creates a React component that forwards the ref attribute it receives to another component below in the tree. - https://fullstackopen.com/en/part5/props_children_and_proptypes#references-to-components-with-ref

  const [visibility, setVisibility] = useState(false)

  const hideWhenVisible = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none' }

  const visibilityToggle = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => { //TODO useImperativeHandle customizes the instance value that is exposed to parent components when using ref. In this instance, the parent component, App, that renders the Togglable component would be able to call blogFormRef.current.visibilityToggle().
    return {
      visibilityToggle
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outlined" color="primary" id='visibility-show' onClick={visibilityToggle}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={visibilityToggle}>cancel</Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable