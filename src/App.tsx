import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Stats from "./pages/Stats";
import Location from "./pages/Location";

function App() {
  return (
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/add"  element={<Add />} />
        <Route path="/edit/:id" index element={<Edit />} />
        <Route path="/stats" index element={<Stats />} />
        <Route path="/locations" index element={<Location />} />
      </Routes>
  )
}

export default App