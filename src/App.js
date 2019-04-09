import React, { Component } from 'react';
import './App.css';
import Palindrome from './components/Palindrome'
import Change from './components/Change'
import Vehicle from './components/Vehicle'
import Cep from './components/Cep'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palindrome/>
        <Change/>
        <Cep/>
        <Vehicle/>
      </div>
    );
  }
}

export default App;
