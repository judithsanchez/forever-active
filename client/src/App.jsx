import { useEffect, useState } from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';

import './App.css';
import ListWorkouts from './components/ListWorkouts';
import logo from './assets/logo.png';
import { Navbar, Nav, Container, Row } from 'react-bootstrap';
import Admin from './components/Admin';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage';
import LogoutPage from './components/LogoutPage';
import AuthProvider, { useAuth } from './components/auth';

import Homepage from './components/Homepage';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import 'google-fonts';

function App() {
  const [results, setResults] = useState([]);

  return (
    <>
      <AuthProvider>
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
                      <NavLink
                        className="link text-bold mx-2 fs-5"
                        to={route.to}
                      >
                        {route.text}
                      </NavLink>
                    </li>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={<Homepage results={results} setResults={setResults} />}
          />
          <Route
            path="/search/:query"
            element={
              <SearchResults results={results} setResults={setResults} />
            }
          />
          <Route
            path="/workouts"
            element={<ListWorkouts workouts={results} setWorkouts={results} />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </AuthProvider>

      <div className="myFooter footer-sticky">
        <main></main>
        <Footer />
      </div>
    </>
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

export default App;
