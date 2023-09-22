import './App.css';
import About from './components/About/About';
import Contac from './components/Contact/Contac';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';


function App() {
  // const isUserSingIn=!!localStorage.getItem("token")
  return (
   
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    <Route exact path="/about" element={<About/>}></Route>
    <Route exact path="/contact" element={<Contac/>}></Route>
    <Route exact path="/login" element={<Login/>}></Route>
    <Route exact path="/register" element={<Register/>}></Route>
    <Route exact path="/logout" element={<Logout/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
