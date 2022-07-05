import RecipeContext from "./recipeContext";
import { useState } from "react";

const RecipeState = (props) => {



  const host = "http://localhost:3001";
  const recipesInitial = [];

  const [recipes, setRecipes] = useState(recipesInitial);

  const getAllRecipes = async () =>{

    let url = `${host}/getAllRecipes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
        "auth-token-pg":localStorage.getItem('token2')
      },
     
    });

    const json = await response.json();
    console.log(json);
    setRecipes(json);

  }
  return (
    <RecipeContext.Provider
      value={{recipes, getAllRecipes,setRecipes }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
