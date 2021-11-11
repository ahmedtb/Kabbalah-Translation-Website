import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'
import TopMenue from './components/TopMenue';
import { Container } from 'react-bootstrap';
import { Routes } from './utility/Urls';

import NotFound from './NotFound';
import Home from './Home';
import BooksIndex from './book/BooksIndex';
import BookShow from './book/BookShow';
import BookBrowser from './book/BookBrowser';

import ArticlesIndex from './article/ArticlesIndex';
import ArticleShow from './article/ArticleShow';
import CategoriesIndex from './category/CategoriesIndex';
import CategoryShow from './category/CategoryShow';

export default function Website() {

  return (

    <BrowserRouter dir="rtl">
      <Provider store={store}>
        
        <TopMenue />

        <Container>
          <Switch>
            <Route exact={true} title={'Home'} path={Routes.home()} component={Home} />
            <Route exact={true} title={'BooksIndex'} path={Routes.booksIndex()} component={BooksIndex} />
            <Route exact={true} title={'BookShow'} path={Routes.bookShow()} component={BookShow} />
            <Route exact={true} title={'BookBrowser'} path={Routes.bookBrowser()} component={BookBrowser} />

            <Route exact={true} title={'ArticlesIndex'} path={Routes.articlesIndex()} component={ArticlesIndex} />
            <Route exact={true} title={'ArticleShow'} path={Routes.articleShow()} component={ArticleShow} />
            
            <Route exact={true} title={'CategoriesIndex'} path={Routes.categoriesIndex()} component={CategoriesIndex} />
            <Route exact={true} title={'CategoryShow'} path={Routes.categoryShow()} component={CategoryShow} />

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
