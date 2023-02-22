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
        <Route path="/" element={<Chat />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
