import logo from './logo.svg';
import './App.css';
import Recipe from './Components/Recipe/Recipe';
import Navbar from './Components/Navbar/Navbar';
import RecipeState from './context/recipes/RecipeState';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Components/Login/Login';
import SignUp from './Components/Signup/Signup';

function App() {
  return (
    
    
    <Router>
      <div className='App'>
      <RecipeState>
      <Navbar/>
      
     
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
              <Route exact path="/" element={<Recipe />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
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
