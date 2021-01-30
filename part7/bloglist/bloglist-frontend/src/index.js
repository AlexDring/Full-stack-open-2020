import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router
} from 'react-router-dom'

import App from './App'
import './index.css'
import { CssBaseline } from '@material-ui/core'

render(
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'))