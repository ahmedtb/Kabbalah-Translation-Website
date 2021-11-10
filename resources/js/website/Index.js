import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import NotFound from './NotFound';
import Home from './Home';
import TopMenue from './components/TopMenue';
import { Container } from 'react-bootstrap';

export default function Website() {

  return (

    <BrowserRouter dir="rtl">
      <Provider store={store}>
        
        <TopMenue />

        <Container>
          <Switch>
            <Route exact={true} title={'Home'} path={'/'} component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Container>
        
      </Provider>

    </BrowserRouter>
  )
}

if (document.getElementById('website')) {
  ReactDOM.render(<Website />, document.getElementById('website'));
}