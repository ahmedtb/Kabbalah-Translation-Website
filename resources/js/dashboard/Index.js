import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './redux/store'
import NotFound from './NotFound';
import TopMenue from './components/TopMenue'
import { Routes } from './utility/URLs';
import Home from './Home';
import PageCreator from './page/PageCreator';
import PagesIndex from './page/PagesIndex';
import PageShow from './page/PageShow';
import PageEditor from './page/PageEditor';
import BookCreator from './book/BookCreator';
import BooksIndex from './book/BooksIndex';
import BookShow from './book/BookShow'

import ArticleCreator from './article/ArticleCreator';
import ArticlesIndex from './article/ArticlesIndex';
import ArticleShow from './article/ArticleShow';
import ArticleEditor from './article/ArticleEditor';

import CategoryCreator from './category/CategoryCreator';
import CategoriesIndex from './category/CategoriesIndex';
import CategoryShow from './category/CategoryShow';
import CategoryEditor from './category/CategoryEditor';
import BookEdit from './book/BookEdit';
import BookCreator2 from './book/BookCreator';

export default function Dashboard() {

  return (

    <BrowserRouter dir="rtl">

      <Provider store={store}>
        <TopMenue />
        <Container >
          <Switch>
            <Route exact={true} path={Routes.dashboard()} component={Home} />

            <Route exact={true} path={Routes.pageCreator()} component={PageCreator} />
            <Route exact={true} path={Routes.pagesIndex()} component={PagesIndex} />
            <Route exact={true} path={Routes.pageShow()} component={PageShow} />
            <Route exact={true} path={Routes.pageEdit()} component={PageEditor} />

            <Route exact={true} path={Routes.bookCreator()} component={BookCreator} />
            <Route exact={true} path={Routes.booksIndex()} component={BooksIndex} />
            <Route exact={true} path={Routes.bookShow()} component={BookShow} />
            <Route exact={true} path={Routes.bookEdit()} component={BookEdit} />




            <Route exact={true} path={Routes.articleCreator()} component={ArticleCreator} />
            <Route exact={true} path={Routes.articlesIndex()} component={ArticlesIndex} />
            <Route exact={true} path={Routes.articleShow()} component={ArticleShow} />
            <Route exact={true} path={Routes.articleEdit()} component={ArticleEditor} />

            <Route exact={true} path={Routes.categoryCreator()} component={CategoryCreator} />
            <Route exact={true} path={Routes.categoriesIndex()} component={CategoriesIndex} />
            <Route exact={true} path={Routes.categoryShow()} component={CategoryShow} />
            <Route exact={true} path={Routes.categoryEdit()} component={CategoryEditor} />

            <Route component={NotFound} />

          </Switch>
        </Container>
      </Provider>

    </BrowserRouter>
  )
}

if (document.getElementById('dashboard')) {
  ReactDOM.render(<Dashboard />, document.getElementById('dashboard'));
}
