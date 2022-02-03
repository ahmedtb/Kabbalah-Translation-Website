import React from 'react'
import { Routes, Api } from '../utility/URLs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { ApiCallHandler } from '../../commonFiles/helpers'

function TopMenue(props) {
    async function logout() {
        ApiCallHandler(
            async () => await Api.logout(),
            () => props.refreshAdmin(null),
            'TopMenue logout',
            true
        )
    }
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

                    {
                        props.admin != null ? (<Nav className="">
                            <NavDropdown title={props.admin.name}>
                                <NavDropdown.Item onClick={logout} >{'تسجيل الخروج'}</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        ) : (
                            <LinkContainer to={Routes.loginPage()}>
                                <Nav.Item >{'تسجيل الدخول'}</Nav.Item>
                            </LinkContainer>)
                    }


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