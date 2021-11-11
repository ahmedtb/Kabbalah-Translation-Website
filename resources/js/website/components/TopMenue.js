import React from 'react'
import { Routes } from '../utility/Urls';
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
        <div>

            <Navbar bg="primary" variant="dark" expand="lg" className='natureBackground maxWidth100'>
                <Container>
                    <LinkContainer to={Routes.home()}>
                        <Navbar.Brand >
                            {process.env.MIX_APP_NAME}
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to={Routes.booksIndex()}>
                                <Nav.Link>الكتب</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={Routes.articlesIndex()}>
                                <Nav.Link>المقالات</Nav.Link>
                            </LinkContainer>
                            {/* <LinkContainer to={Routes.categoriesIndex()}>
                            <Nav.Link>التصنيفات</Nav.Link>
                        </LinkContainer> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

import { refreshUser } from '../redux/stateActions'
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        user: state.state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)