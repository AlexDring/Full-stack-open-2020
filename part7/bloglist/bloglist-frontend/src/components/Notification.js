import React from 'react'
import { useSelector } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(3, 0)
  },
}))

const Notification = () => {
  const classes = useStyles()
  const notification = useSelector(state => state.notification)
  console.log('tonk', notification)

  if (!notification) {
    return null
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
  }

  return (
    // <div className={ notification.class === 'success' ? 'success' : 'error' }>
    //   {notification.message}
    // </div>
    <div className={classes.root}>
      <Alert severity={notification.class === 'success' ? 'success' : 'error'}>
        {notification.message}
      </Alert>
    </div>
  )
}

export default Notification