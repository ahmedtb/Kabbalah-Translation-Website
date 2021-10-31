import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import NotFound from './NotFound';
import TopMenue from './components/TopMenue'
import Routes from './utility/Routes';
import Home from './Home';
import PageCreator from './page/PageCreator';
export default function Dashboard() {

  return (

    <BrowserRouter  dir="rtl">

      <Provider store={store}>
        <TopMenue />
        <Switch>
          <Route  exact={true} title={'Home'} path={Routes.dashboard}  component={Home}  />
          <Route  exact={true} title={'PageCreator'} path={Routes.pageCreator}  component={PageCreator}  />

          <Route component={NotFound} />

        </Switch>
      </Provider>

    </BrowserRouter>
  )
}

if (document.getElementById('dashboard')) {
  ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
