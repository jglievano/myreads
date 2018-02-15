import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1>Read</h1>
        <ul>
          <li>
            <h2>The Meditations</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/415jqPZ74ZL._SX319_BO1,204,203,200_.jpg"/>
          </li>
        </ul>
        <h1>To read</h1>
        <ul>
          <li>
            <h2>Letters from a Stoic</h2>
            <img src="https://images-na.ssl-images-amazon.com/images/I/51mt31ITPvL._SY346_.jpg"/>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
