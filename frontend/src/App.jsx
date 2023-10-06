import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBooks from "./pages/AddBooks";
import UpdateBooks from "./pages/UpdateBooks";
import Books from "./pages/Books";
import "./Style.css";
import cartContext from "./utils/cartContext";
import { useState } from "react";

function App() {
  const [cart, setProduct] = useState( [] );
  return (
    <cartContext.Provider value={{cart,setProduct:setProduct}}>
    <div >
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Books />} />
            <Route path="/add" element={<AddBooks />} />
            <Route path="/:id" element={<UpdateBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
    </cartContext.Provider>
  );
}

export default App;
