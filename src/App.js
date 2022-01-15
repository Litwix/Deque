import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Characters from './Characters';
import SingleCharacter from './SingleCharacter';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Characters />} />
        <Route exact path="/:guid" element={<SingleCharacter />} />
      </Routes>
    </Router>
  );
};

export default App;
