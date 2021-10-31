import React from 'react'
import Routes from '../utility/Routes';
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
                <LinkContainer to={Routes.dashboard}>
                    <Navbar.Brand href="#home">
                        Kabbalah Translation
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
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