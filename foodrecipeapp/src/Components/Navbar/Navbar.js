import React from "react";
import RecipeContext from "../../context/recipes/recipeContext";
import { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";


const Navbar = (props) => {

    


    const [recipeName,setRecipeName] = useState("");
    const context = useContext(RecipeContext);
    const {recipes,setRecipes,getAllRecipes} = context

    let history = useNavigate();


    const onChange = (e)=> {
    setRecipeName(
        e.target.value
    );
}

const goToHome = () => {

  getAllRecipes();

}

const handleLogOut = () => {
  localStorage.removeItem('token');
    history('/login');
}


    const  handleClick = async (e) => {
        e.preventDefault() ;
        console.log("function called");
        let url = "http://localhost:3001/getrecipe";
        
        let options = {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ dishName: recipeName }),
        };
        let res = await fetch(url, options);
        console.log(res);
        let data = await res.json();
        console.log("this will search " ,data);
        if (data.success === true) {
          
          setRecipes([data.recipe]);
    
        } else {
          props.showAlert('Recipe not found','danger')
        }
      }
  const [data, setData] = useState({ flag: false, data: null });
  return (
    <div>
      
      <nav className="navbar navbar-dark bg-dark justify-content-between">
  <a className="navbar-brand" style={{"cursor":"pointer"}} onClick={goToHome} ><h1> What2Eat !</h1></a>
  <form className="form-inline d-flex">

    { !localStorage.getItem('token') &&<> <Link to="/login" className="btn btn-outline-success my-2 my-sm-0" >
                  {" "}
                  Login
                </Link>
                <Link to="signup" className="btn btn-outline-success my-2 my-sm-0">
                  {" "}
                  SignUp
                </Link>
                </>
}
{
  localStorage.getItem('token') && <>
  <button onClick={handleLogOut} className="btn btn-primary mx-3">Logout</button>

  

    <input className="form-control mr-sm-2"  id="dish" type="search" placeholder="Search" aria-label="Search" value={recipeName} onChange={onChange}/>
    <button onClick={handleClick}  className="btn btn-outline-success my-2 my-sm-0" >Search</button>
    </>
}
  </form>
</nav>
    </div>
  );
 
};

export default Navbar;
