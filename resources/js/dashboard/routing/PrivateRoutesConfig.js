import { Routes } from '../utility/URLs'
import Roles from './Roles'

// Components
import Home from '../Home'
import LoginPage from './LoginPage'

import PageCreator from '../page/PageCreator'
import PagesIndex from '../page/PagesIndex';
import PageShow from '../page/PageShow';
import PageEditor from '../page/PageEditor';

import BookCreator from '../book/BookCreator';
import BooksIndex from '../book/BooksIndex';
import BookShow from '../book/BookShow'

import ArticleCreator from '../article/ArticleCreator';
import ArticlesIndex from '../article/ArticlesIndex';
import ArticleShow from '../article/ArticleShow';
import ArticleEditor from '../article/ArticleEditor';

import CategoryCreator from '../category/CategoryCreator';
import CategoriesIndex from '../category/CategoriesIndex';
import CategoryShow from '../category/CategoryShow';
import CategoryEditor from '../category/CategoryEditor';
import BookEdit from '../book/BookEdit';

export default [
    {
        component: Home,
        path: Routes.dashboard(),
        permission: [],
        exact: true,
    }, 
    {
        component: LoginPage,
        path: Routes.loginPage(),
        permission: [],
        exact: true,
    },
    {
        component: PageCreator,
        path: Routes.pageCreator(),
        permission: [Roles.ADMIN],
        exact: true,
    },


    {
        component: PagesIndex,
        path: Routes.pagesIndex(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: PageShow,
        path: Routes.pageShow(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: PageEditor,
        path: Routes.pageEdit(),
        permission: [Roles.ADMIN],
        exact: true,
    },

    {
        component: BookCreator,
        path: Routes.bookCreator(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: BooksIndex,
        path: Routes.booksIndex(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: BookShow,
        path: Routes.bookShow(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: BookEdit,
        path: Routes.bookEdit(),
        permission: [Roles.ADMIN],
        exact: true,
    },

    {
        component: ArticleCreator,
        path: Routes.articleCreator(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: ArticlesIndex,
        path: Routes.articlesIndex(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: ArticleShow,
        path: Routes.articleShow(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: ArticleEditor,
        path: Routes.articleEdit(),
        permission: [Roles.ADMIN],
        exact: true,
    },

    {
        component: CategoryCreator,
        path: Routes.categoryCreator(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: CategoriesIndex,
        path: Routes.categoriesIndex(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: CategoryShow,
        path: Routes.categoryShow(),
        permission: [Roles.ADMIN],
        exact: true,
    },
    {
        component: CategoryEditor,
        path: Routes.categoryEdit(),
        permission: [Roles.ADMIN],
        exact: true,
    },
]