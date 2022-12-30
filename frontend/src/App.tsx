import React from "react";
import "./App.css";

import Homepage from "./Pages/Homepage";
import Chatspage from "./Pages/Chatpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatspage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
