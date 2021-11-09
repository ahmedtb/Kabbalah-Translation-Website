import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import NotFound from './NotFound';
import Home from './Home';

export default function Dashboard() {

  return (

    <BrowserRouter  dir="rtl">

      <Provider store={store}>
        <Switch>
          <Route  exact={true} title={'Home'} path={'/'}  component={Home}  />

          <Route component={NotFound} />

        </Switch>
      </Provider>

    </BrowserRouter>
  )
}

if (document.getElementById('website')) {
  ReactDOM.render(<Dashboard />, document.getElementById('website'));
}
