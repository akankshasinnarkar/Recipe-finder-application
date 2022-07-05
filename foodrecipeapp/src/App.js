import logo from './logo.svg';
import './App.css';
import Recipe from './Components/Recipe/Recipe';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import Navigation from './Components/Navigation/Navigation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
                <div className="auth-wrapper">
                  
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
