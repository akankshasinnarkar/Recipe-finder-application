import { useState, useContext, useEffect, useRef } from "react";
import React, { Component } from "react";
import RecipeContext from "../../context/recipes/recipeContext";
import RecipeState from "../../context/recipes/RecipeState";
import RecipeItem from "./RecipeItem";
import butterchicken from "./butter-chicken.png";

import "./Recipe.css";
export default function Recipe(props) {
  const [data, setData] = useState({ flag: false, data: null });
  const context = useContext(RecipeContext);
  console.log("thus is context  ", context);
  const { recipes, getAllRecipes } = context;

  const ref = useRef();

  const [currentRecipe, setCurrentRecipe] = useState({
    dishName: "",
    ingredients: [],
    recipe: [],
  });

  const handleClick = (recipe) => {
    setCurrentRecipe(recipe);
    ref.current.click();
  };

  useEffect(() => {
    getAllRecipes();
  }, []);
  return (
    <div>
      <button
        style={{ display: "none" }}
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {currentRecipe.dishName}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body d-lg-flex justify-content-center">
              <div className="d-lg-flex flex-column ">
                <img src={butterchicken} alt="" />
                <div>
                  {" "}
                  
                  <table class="table table-dark table-hover table-stripped my-3">
                    <thead>
                      <tr>
                        <th scope="col">Ingredient</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecipe.ingredients.map((ingredient) => {
                        return (
                          <tr key={ingredient.ingredientName}>
                            <td> {ingredient.ingredientName}</td>
                            <td>{ingredient.quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">

                <h3>Recipe Steps</h3>
                <ol className="list-group list-group-numbered">
                  {currentRecipe.recipe.map((step) => {
                    return <li className="list-group-item" key={step}>{step}</li>;
                  })}
                </ol>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" class="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='nav'>
            <h1>Recipe Finder Application</h1>
            
            <input type = 'text' placeholder='Enter name of a dish' id='dish'/>
            <button className='btn btn-dark'onClick={findRecipe}>Search</button>
            </div> */}
      <div id="info">
        {/* {data.flag && <div className="card" style={{width: "24rem",height: "36rem"}}> */}
        {/* <img src="pav bhaji.jpg" class="card-img-top" alt=" no load"></img> */}
        {/* <div className="card-body"> */}
        {/* <h1 className="card-title">{data.data.dishName}</h1> */}
        {/* <h3 className="card-header mb-2 text-muted">Ingredients</h3>
                    <ul className="list-group list-group-flush">
                        {data.data.ingredients.map((item)=>{
                            
                            return  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center " key={item.ingredientName}>{item.ingredientName} <span className="badge bg-primary rounded-pill"> {item.quantity}</span></li>
                        })}
                        </ul> */}
        {/* <h3 className="card-header mb-2 text-muted">Recipe</h3>
                        <ul className="list-group list-group-flush">
                        {data.data.recipe.map((item)=>{
                            
                            return <li className="list-group-item list-group-item-action" key={item}>{item}</li>
                        })}
                        </ul></div>
                    
                    </div>} */}

        <div className="d-flex">
          {recipes.map((recipe) => {
            // console.log(recipe._id)
            return (
              <RecipeItem
                handleClick={handleClick}
                key={recipe._id}
                recipe={recipe}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
  async function findRecipe() {
    console.log("function called");
    let url = "http://localhost:3001/getrecipe";
    let name = document.getElementById("dish").value;
    let options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ dishName: name }),
    };
    let res = await fetch(url, options);
    console.log(res);
    let data = await res.json();
    if (data.flag === true) {
      console.log(data);
      setData(data);
    } else {
      alert("Recipe not found");
    }
  }
}
