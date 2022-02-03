import React from 'react'
import { Routes, Api } from '../utility/URLs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import AllowedLink from '../routing/AllowedLink'

import { refreshAdmin } from '../redux/stateActions'
import { connect } from "react-redux"
import { ApiCallHandler } from '../../commonFiles/helpers';

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
                <AllowedLink hide={true} container={true} to={Routes.dashboard()}>
                    <Navbar.Brand >
                        Kabbalah Translation
                    </Navbar.Brand>
                </AllowedLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <NavDropdown title="الكتب" id="basic-nav-dropdown">
                            <AllowedLink hide={true} container={true} to={Routes.bookCreator()}>
                                <NavDropdown.Item >انشاء كتاب</NavDropdown.Item>
                            </AllowedLink>
                            <AllowedLink hide={true} container={true} to={Routes.pageCreator()}>
                                <NavDropdown.Item >انشاء صفحة</NavDropdown.Item>
                            </AllowedLink>
                            <NavDropdown.Divider />
                            <AllowedLink hide={true} container={true} to={Routes.booksIndex()}>
                                <NavDropdown.Item >قائمة الكتب</NavDropdown.Item>
                            </AllowedLink>
                            <AllowedLink hide={true} container={true} to={Routes.pagesIndex()}>
                                <NavDropdown.Item >قائمة الصفحات</NavDropdown.Item>
                            </AllowedLink>
                        </NavDropdown>

                        <NavDropdown title="المقالات" id="basic-nav-dropdown">
                            <AllowedLink hide={true} container={true} to={Routes.articleCreator()}>
                                <NavDropdown.Item >انشاء مقالة</NavDropdown.Item>
                            </AllowedLink>
                            <NavDropdown.Divider />
                            <AllowedLink hide={true} container={true} to={Routes.articlesIndex()}>
                                <NavDropdown.Item >قائمة المقالات</NavDropdown.Item>
                            </AllowedLink>
                        </NavDropdown>

                        <NavDropdown title="تصنيفات" id="basic-nav-dropdown">
                            <AllowedLink hide={true} container={true} to={Routes.categoryCreator()}>
                                <NavDropdown.Item >انشاء تصنيف</NavDropdown.Item>
                            </AllowedLink>
                            <NavDropdown.Divider />
                            <AllowedLink hide={true} container={true} to={Routes.categoriesIndex()}>
                                <NavDropdown.Item >قائمة تصنيفات</NavDropdown.Item>
                            </AllowedLink>
                        </NavDropdown>

                    </Nav>
                    <Nav className="">
                        {props.admin ? (
                            <NavDropdown title={props.admin.name}>
                                <NavDropdown.Item onClick={logout} >{'تسجيل الخروج'}</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <AllowedLink hide={true} container={true} to={Routes.loginPage()}>
                                <NavDropdown.Item >{'تسجيل الدخول'}</NavDropdown.Item>
                            </AllowedLink>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


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