import React from 'react'
import {Routes} from '../utility/URLs';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

import {
    FaUserTie,
    FaUserCheck,
    FaWpforms,
    FaChalkboardTeacher,
    FaSuitcase,
    FaGraduationCap,
    FaChartLine,
    FaBuilding,
    FaNetworkWired,
    FaLaptop
} from 'react-icons/fa'


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
                        <LinkContainer to={Routes.pageCreator()}>
                            <Nav.Link>انشاء صفحة</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to={Routes.pagesIndex()}>
                            <Nav.Link>الصفحات</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title="الكتب" id="basic-nav-dropdown">
                            <LinkContainer to={Routes.bookCreator()}>
                                <NavDropdown.Item >انشاء كتاب</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to={Routes.booksIndex()}>
                                <NavDropdown.Item >قائمة الكتب</NavDropdown.Item>
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
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
        allowedRoutes: state.state.allowedRoutes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)