import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Login from './components/Login';
import SignUp from "./components/SignUp"
import ProtectedRoute from './components/ProtectedRoute';
import Notfound from "./components/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/" element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path = "*" element = {<ProtectedRoute><Notfound/></ProtectedRoute>}/>        
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
