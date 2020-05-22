import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? (
                <NavigationAuth authUser={authUser} />
            ) : (
                    <NavigationNonAuth />
                )
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Hyper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to={ROUTES.LANDING}>Landing</Link>
                <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
                <Link className="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
                {authUser.roles && !!authUser.roles[ROLES.ADMIN] && (
                    <Link className="nav-link" to={ROUTES.ADMIN}>Admin</Link>
                )}
                <SignOutButton />
            </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                Signed in as: <a>{authUser.username} / {authUser.email}</a>
            </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Hyper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link className="nav-link" to={ROUTES.LANDING}>Landing</Link>
                <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Navigation;
