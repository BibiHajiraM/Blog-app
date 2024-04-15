import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import AddBlog from "./pages/add-blog";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add-blog" element={<AddBlog />} />
      </Routes>
    </div>
  );
}

export default App;
