import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
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
        <Route path = "/not-found" element = {<ProtectedRoute><Notfound/></ProtectedRoute>}/>   
        <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
