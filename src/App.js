import { BrowserRouter, Routes, Route ,Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Traverse from './Pages/Traverse'
import Geek from './Pages/Geek'
function App() {
  return (
  <>
  <Routes>
    <Route path="/" element={<Traverse/>}/>
    <Route path="/Geek" element={<Geek/>}/>
    </Routes>  
  </>
  );
}

export default App;
