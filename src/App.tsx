import { Route, Routes } from "react-router";
import Login from "./components/pages/Login";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>  
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
