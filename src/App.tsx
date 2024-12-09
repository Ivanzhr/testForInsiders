import React from 'react';
import {useEffect } from 'react';
import { Users, Countries, Departments, Statuses } from './data.ts';
import './App.css';
import User from './Users.tsx';

function App() {

  useEffect(()=> {
    if(!localStorage.getItem('users')){
      localStorage.setItem('users', JSON.stringify(Users));
      localStorage.setItem('countries', JSON.stringify(Countries));
      localStorage.setItem('departments', JSON.stringify(Departments));
      localStorage.setItem('statuses', JSON.stringify(Statuses));
    }
  }, [])

  return (
    <div className="App">
      <User/>
    </div>
  );
}

export default App;
