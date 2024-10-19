import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import Connection from "./pages/Connection";
import Login from "./components/Login";
import Secure from "./components/Secure";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        {/* <Route path="/index" element={<Index />} /> */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Index />
            </PrivateRoute>
          }
        />
        {/* <Route path="/:selectedConnection" element={<Connection />} /> */}
        {/* <Route path="/secure" element={<Secure />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
