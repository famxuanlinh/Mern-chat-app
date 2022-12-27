import React from "react";
import "./App.css";

import Homepage from "./Pages/Homepage";
import Chatspage from "./Pages/Chatpage";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
     <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatspage />} />
          {/* <Route path="/chat" component={}/> */}
        </Routes>
     </Router>
    </div>
  );
}

export default App;
