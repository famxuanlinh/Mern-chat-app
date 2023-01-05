import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

import Homepage from "./Pages/Homepage";
import Chatspage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatspage />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
