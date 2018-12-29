import React, { Component } from 'react';
import Dashboard from './components/Dashboard'
import './style/reset.css';
import './style/_utilities.scss';
import './style/App.scss';

class App extends Component {
  render() {
    return (
      <div>
      <Dashboard />
      </div>
    );
  }
}

export default App;
