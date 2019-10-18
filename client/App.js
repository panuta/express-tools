import { hot } from 'react-hot-loader/root';
import React from 'react';
import './App.css';

import SdfConverter from "./components/SdfConverter";

function App () {
  return (
    <div className='App container-fluid'>
      <SdfConverter />
    </div>
  );
}

export default hot(App);
