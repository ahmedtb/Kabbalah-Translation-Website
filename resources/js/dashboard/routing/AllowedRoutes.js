import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFound from './NotFound'
import { Container } from 'react-bootstrap'
import { Api, ApiCallHandler } from '../utility/URLs'
import TopMenue from '../components/TopMenue'
import { Routes } from '../utility/URLs';
import LoginPage from './LoginPage'
import Home from './Home';
import PageCreator from '../page/PageCreator';
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


function AllowedRoutes(props) {

    async function isLoggedIn() {

        ApiCallHandler(
            async () => await Api.getAdmin(),
            (data) => props.refreshAdmin(data),
            'isLoggedIn'
        )
    }
    React.useEffect(() => {

        if (window.admin) {
            props.refreshAdmin(window.admin)
        } else if (props.admin == null) {
            isLoggedIn()
        }
        // console.log('props', props)
    }, [props.admin])



    if (props.admin)
        return <>

            <TopMenue />
            <Container className='my-2' >
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
            <Footer />

        </>
    else return <LoginPage />
}

import { refreshAdmin, setAllowedRoutes } from '../redux/stateActions'
import { connect } from "react-redux"
import Footer from '../components/Footer';

const mapStateToProps = state => {
    return {
        admin: state.state.admin,
        allowedRoutes: state.state.allowedRoutes,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshAdmin: (admin) => dispatch(refreshAdmin(admin)),
        setAllowedRoutes: (allowedRoutes) => dispatch(setAllowedRoutes(allowedRoutes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllowedRoutes)