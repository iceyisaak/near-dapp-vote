import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { login, logout } from './utils';
import getConfig from './config';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import NewPoll from './pages/NewPoll';
import PollingStation from './pages/PollingStation';

import './global.css';

const { networkId } = getConfig(process.env.NODE_ENV || 'development');

export default function App() {

  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    <Router>
      <Navbar
        logout={logout}
        login={login}
      />
      <Routes>
        <Route
          exact
          path='/'
          element={
            window.walletConnection.isSignedIn() ?
              <Dashboard
                changeCandidates={changeCandidatesFunction}
                networkId={networkId}
              /> :
              <Home login={login} />
          }
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/newPoll'
          element={<NewPoll />}
        />
        <Route
          path='/pollingStation'
          element={<PollingStation />}
        />
      </Routes>
    </Router>
  );
}