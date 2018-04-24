import React, { Component } from 'react';
import Navigation from './Navigation'
import Header from './Header'



class App extends Component {
  render() {
    return (
        <div id="main">
          <Header />
          <Navigation />          
        </div>
    );
  }
}

export default App;
