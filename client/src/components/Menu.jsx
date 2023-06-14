// React
import React, { useState } from 'react';

// Providers
import { useAuth } from './auth';

// React Router
import { Routes, Route, Link, NavLink } from 'react-router-dom';

// Styles and Assets
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import logo from '../assets/logo.png';

export default function LoginPage() {
  const auth = useAuth();

  return (
    <Navbar expand="lg" className="bg-white">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <img className="logo img-fluid" src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {routes.map((route) => {
              return (
                <li key={route.to}>
                  <NavLink className="link text-bold mx-2 fs-5" to={route.to}>
                    {route.text}
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

const routes = [];
routes.push({
  to: '/workouts',
  text: 'Workouts',
  private: false,
});
routes.push({
  to: '/profile',
  text: 'Profile',
  private: true,
});
routes.push({
  to: '/login',
  text: 'Login',
  private: false,
  publicOnly: true,
});
routes.push({
  to: '/logout',
  text: 'Logout',
  private: true,
});
routes.push({
  to: '/admin',
  text: 'Admin',
  private: true,
});
