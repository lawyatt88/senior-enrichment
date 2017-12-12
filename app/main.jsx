'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'


import { BrowserRouter as Router } from 'react-router-dom';

import store from './store'
import AppMain from './components/AppMain'

render (
  <Provider store={store}>
    <Router>
      <AppMain />
    </Router>
  </Provider>,
  document.getElementById('main')
)