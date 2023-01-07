import "./App.css";
import {  Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
