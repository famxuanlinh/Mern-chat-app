import "./App.css";
import { Route, Routes } from "react-router-dom";

import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import { useChatContext } from "@contexts/ChatContext/useChatContext";

function App() {
  const { user } = useChatContext();

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
