import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="min-h-screen bg-gray-200">
      <Router>
        <Routes>
          <Route element={<Homepage />} path="/" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
