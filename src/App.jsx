import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home/Home";
import Chat from "./components/Chat/Chat/Chat";

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
