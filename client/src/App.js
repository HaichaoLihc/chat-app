import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// no curly braces need for default export
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact Component={Join}/>
        <Route path="/chat" Component={Chat} />
      </Routes>
    </Router>
  );
}

export default App;
