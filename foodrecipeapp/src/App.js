import logo from './logo.svg';
import './App.css';
import Recipe from './Components/Recipe/Recipe';
import Navbar from './Components/Navbar/Navbar';
import RecipeState from './context/recipes/RecipeState';

function App() {
  return (
    
    <div className="App">
      <RecipeState >
      <Navbar />
     <Recipe/>
     </RecipeState>
    </div>
  );
}

export default App;
