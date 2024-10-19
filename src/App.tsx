import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index.tsx";
import Connection from "./pages/Connection.tsx";
import Login from "./components/Login.jsx";
import Secure from "./components/Secure.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import NotFound from "./pages/NotFound.tsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/secure" element={<Secure />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PrivateRoute>
          }
        />

        {/* <Route path="/index" element={<Index />} /> */}
        {/* <Route */}
        {/*   path="/" */}
        {/*   element={ */}
        {/*     <PrivateRoute> */}
        {/*       <Index /> */}
        {/*     </PrivateRoute> */}
        {/*   } */}
        {/* /> */}
        {/* <Route path="/:selectedConnection" element={<Connection />} /> */}
        {/* <Route path="/secure" element={<Secure />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
