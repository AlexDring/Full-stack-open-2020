import React from 'react'
import { useSelector } from 'react-redux'
// import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  // const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  console.log(notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  // useEffect(() => { // https://www.pluralsight.com/guides/how-to-fire-periodic-actions-using-settimeout-and-dispatcher-in-redux
  //   const timer = setTimeout(
  //     () => dispatch(setNotification(null)),
  //     5000
  //   );
  //   return () => clearTimeout(timer);
  // });

  if (notification !== null) {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
  return (null)
}

export default Notification