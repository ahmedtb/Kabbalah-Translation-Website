import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './redux/store'
import NotFound from './NotFound';
import AllowedRoutes from './routing/AllowedRoutes'


export default function Dashboard() {

  return (

    <BrowserRouter dir="rtl">

      <Provider store={store}>
        <AllowedRoutes />

      </Provider>

    </BrowserRouter>
  )
}

if (document.getElementById('dashboard')) {
  ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
