import React, { Component } from 'react';
import './App.css';
import Spreadsheet from './Spreadsheet'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component { 
  componentDidMount(){
    document.title = "Coronavirus Tracker (US)"
  }

  render() {
    return (
      <div className="App container">
        <h1>Coronavirus Tracker (US)</h1>
        <Spreadsheet />
      </div>
    )
  }
}

export default App;
