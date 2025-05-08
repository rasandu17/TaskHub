import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router } from 'react-router-dom';
import Register from './components/Register';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='"/login' Component={Login}/>
        <Route path='"/register' Component={Register}/>
        <Route path='"/dashboard' Component={TaskDashboard}/>
        <Route path="/" element={<Login />} />
      </Switch>
    </Router>
  );
}

export default App;
