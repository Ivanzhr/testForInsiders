import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Users, Countries, Departments, Statuses } from './data.ts';
import './App.css';
import User from './Users.tsx';
import EditUser from './EditUser.tsx';

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'active-link' : '';
  return (
    <header>
      <nav>
        <Link to="/users" className={`nav-link ${isActive('/users')}`}>User</Link>
        <Link to="/edit-user" className={`nav-link ${isActive('/edit-user')}`}>Edit Users</Link>
      </nav>
    </header>
  )
}

function App() {

  useEffect(() => {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(Users));
      localStorage.setItem('countries', JSON.stringify(Countries));
      localStorage.setItem('departments', JSON.stringify(Departments));
      localStorage.setItem('statuses', JSON.stringify(Statuses));
    }
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/users" element={<User />} />
          <Route path="/edit-user" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
