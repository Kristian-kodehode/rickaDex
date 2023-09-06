import "./App.css";
import { Routes, Route } from "react-router-dom";

import Characters from "./routes/characters";
import Character from "./routes/character";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/character/:paramsId" element={<Character />} />
      </Routes>
    </>
  );
}

export default App;
