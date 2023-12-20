import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/Home/Home/Home";
import Chat from "./components/Chat/Chat/Chat";
import PublicRoute from "./components/Route/PublicRoute";
import PrivateRoute from "./components/Route/PrivateRoute";

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<PublicRoute> <Home /> </PublicRoute>} />
        <Route path="/chat" element={<PrivateRoute> <Chat /> </PrivateRoute>} />
      </Routes>
    </div>
  )
}

export default App
