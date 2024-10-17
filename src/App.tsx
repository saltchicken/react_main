import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index";
import Dinosaur from "./pages/Dinosaur";
import Login from "./components/Login";
import Secure from "./components/Secure";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Index />} /> */}
        <Route path="/:selectedDinosaur" element={<Dinosaur />} />
        <Route path="/" element={<Login />} />
        <Route path="/secure" element={<Secure />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
