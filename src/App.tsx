import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
  