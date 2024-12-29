import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./pages/FoodList.jsx";
import Suggestions from "./pages/Suggestions.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router basename="/meal-idea-pod">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/food-list" element={<FoodList />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
