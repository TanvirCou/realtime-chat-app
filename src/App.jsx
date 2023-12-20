import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home/Home";
import Chat from "./components/Chat/Chat/Chat";
import NotFound from "./components/NotFound/NotFound";

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
