import logo from './logo.svg';
import './App.css';
import Recipe from './Components/Recipe/Recipe';
import Navbar from './Components/Navbar/Navbar';
import RecipeState from './context/recipes/RecipeState';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';
import Alert from './Components/Alert/Alert';
import { useState } from 'react';



function App() {

  const [alert, setAlert] = useState({message:"",type:""});

  const showAlert = (message, type) => {
    setAlert({
      type,
      message,
    });

    setTimeout(() => {
      setAlert({message:"",type:""});
    }, 5000);
  };
  return (
    
    
    <Router>
      <div className='App'>
      <RecipeState>
      <Navbar showAlert = {showAlert}/>
      <Alert alert={alert} />
      
     
      {/* <div > */}
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              <h1>What2Eat!</h1>
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div > */}
          <div >
            <Routes>
              <Route exact path="/" element={<Recipe  showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<SignUp showAlert={showAlert} />} />
              
            </Routes>
          </div>
        {/* </div> */}
      {/* </div> */}
      </RecipeState>
      </div>
    </Router>
  )
}

export default App;
