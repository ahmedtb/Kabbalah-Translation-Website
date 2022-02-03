import React from 'react'
import { Routes, Api } from '../utility/URLs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

function AuthComponent(props) {

    async function isLoggedIn() {
        try {
            const response = await Api.getAdmin()
            props.refreshAdmin(response.data)
            // console.log('/api/admin',response.data)
        } catch (error) {
            logError(error)
        }
    }

    async function logout() {
        try {
            const response = await Api.logout()
            // console.log('logout', (response.data));
            props.refreshAdmin(null)
        } catch (error) {
            logError(error)
        }
    }

    React.useEffect(() => {
        if (props.admin == null)
            isLoggedIn()
        // console.log('top menue', props.admin)
    }, [props.admin])


    return props.admin ? (
        <NavDropdown title={props.admin.name}>
            <NavDropdown.Item onClick={logout} >{'تسجيل الخروج'}</NavDropdown.Item>
        </NavDropdown>
    ) : (
        <LinkContainer to={Routes.loginPage()}>
            <NavDropdown.Item >{'تسجيل الدخول'}</NavDropdown.Item>
        </LinkContainer>
    )
}

function TopMenue(props) {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to={Routes.dashboard()}>
                    <Navbar.Brand >
                        Kabbalah Translation
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown title="الكتب" id="basic-nav-dropdown">
                            <LinkContainer to={Routes.bookCreator()}>
                                <NavDropdown.Item >انشاء كتاب</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to={Routes.pageCreator()}>
                                <NavDropdown.Item >انشاء صفحة</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to={Routes.booksIndex()}>
                                <NavDropdown.Item >قائمة الكتب</NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to={Routes.pagesIndex()}>
                                <NavDropdown.Item >قائمة الصفحات</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                        <NavDropdown title="المقالات" id="basic-nav-dropdown">
                            <LinkContainer to={Routes.articleCreator()}>
                                <NavDropdown.Item >انشاء مقالة</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to={Routes.articlesIndex()}>
                                <NavDropdown.Item >قائمة المقالات</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                        <NavDropdown title="تصنيفات" id="basic-nav-dropdown">
                            <LinkContainer to={Routes.categoryCreator()}>
                                <NavDropdown.Item >انشاء تصنيف</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to={Routes.categoriesIndex()}>
                                <NavDropdown.Item >قائمة تصنيفات</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>

                    </Nav>
                    <Nav className="">
                        <AuthComponent {...props} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

import { refreshAdmin } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        admin: state.state.admin,
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshAdmin: (admin) => dispatch(refreshAdmin(admin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)