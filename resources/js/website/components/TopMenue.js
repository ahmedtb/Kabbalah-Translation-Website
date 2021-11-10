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
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to={Routes.home()}>
                    <Navbar.Brand >
                        Kabbalah Library
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to={Routes.booksIndex()}>
                            <Nav.Link>الكتب</Nav.Link>
                        </LinkContainer>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refreshUser: (user) => dispatch(refreshUser(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenue)