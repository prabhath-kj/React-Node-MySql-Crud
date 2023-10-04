import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBooks from "./pages/AddBooks";
import UpdateBooks from "./pages/UpdateBooks";
import Books from "./pages/Books";
import "./Style.css"

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/add" element={<AddBooks />} />
        <Route path="/:id" element={<UpdateBooks />} />
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
