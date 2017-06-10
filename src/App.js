import React, { Component } from 'react';
import StatsGraph from './components/StatsGraph';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>India's 5 Year Plans analysis</h2>
        </div>
        <StatsGraph />
      </div>
    );
  }
}

export default App;
