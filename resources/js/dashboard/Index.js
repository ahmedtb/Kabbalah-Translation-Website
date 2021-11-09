import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import NotFound from './NotFound';
import TopMenue from './components/TopMenue'
import {Routes} from './utility/URLs';
import Home from './Home';
import PageCreator from './page/PageCreator';
import PagesIndex from './page/PagesIndex';
import PageShow from './page/PageShow';
import PageEditor from './page/PageEditor';
import BookCreator from './book/BookCreator';
import BooksIndex from './book/BooksIndex';
import BookShow from './book/BookShow'

export default function Dashboard() {

  return (

    <BrowserRouter  dir="rtl">

      <Provider store={store}>
        <TopMenue />
        <Switch>
          <Route  exact={true} title={'Home'} path={Routes.dashboard()}  component={Home}  />

          <Route  exact={true} title={'PageCreator'} path={Routes.pageCreator()}  component={PageCreator}  />
          <Route  exact={true} title={'PagesIndex'} path={Routes.pagesIndex()}  component={PagesIndex}  />
          <Route  exact={true} title={'PageShow'} path={Routes.pageShow()}  component={PageShow}  />
          <Route  exact={true} title={'PageEditor'} path={Routes.pageEdit()}  component={PageEditor}  />
          
          <Route  exact={true} title={'BookCreator'} path={Routes.bookCreator()}  component={BookCreator}  />
          <Route  exact={true} title={'BooksIndex'} path={Routes.booksIndex()}  component={BooksIndex}  />
          <Route  exact={true} title={'BookShow'} path={Routes.bookShow()}  component={BookShow}  />

          <Route component={NotFound} />

        </Switch>
      </Provider>

    </BrowserRouter>
  )
}

if (document.getElementById('dashboard')) {
  ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
