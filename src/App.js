// Created by Zaddeen Benaissa, July 2020.

import React from 'react';
import SortingHome from './SortingHome/SortingHome';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="credits">
        <p id="self_tag">Created by: Zaddeen Benaissa</p>
        <a href="https://github.com/zaddeen/sorting_algorithms" target="_blank" rel="noopener noreferrer">
          <p id="website_link"> https://github.com/zaddeen/sorting_algorithms </p>
         </a>
      </div>

      <h1>Visualizing Sorting Algorithms</h1>
      <SortingHome></SortingHome>
    </div>
  );
}

export default App;