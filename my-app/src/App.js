import React from 'react';
import './App.css';
import Signup from './container/signup/signup'
import Header from './component/common/header/header';

function App() {
  return (
    <div className="App">
       <Header />
       <Signup />
    </div>
  );
}

export default App;
