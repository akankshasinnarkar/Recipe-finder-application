const express = require('express');
const app = express();
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const router = express.Router();
// const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const fetchUser = require('../middleware/fetchUser');

const { body, validationResult } = require("express-validator");

const JWT_SECRET = "Thisisajwtsecrettokenforthejwttokens";


const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

const connection = mongoose.connection;

let reactUserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
   
    
});
let reactUserModel = connection.model('reactUser',reactUserSchema);


app.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors => return bad request and errors
    const errors = validationResult(req);
    let success =false;
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await reactUserModel.findOne({ email });
      success = false;

      if (!user) {
        return res
          .status(400)
          .json({
            error:
              "Incorrect Credentials ! Try to login with correct credentials",
              success
          });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            error:
              "Incorrect Credentials ! Try to login with correct credentials",
              success
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

app.post(
    "/signup",
    [
        body("fname", "Enter a valid First name ").isLength({ min: 5}),
        body("lname", "Enter a valid Last name ").isLength({ min: 5 }),
      body("email", "Enter a valid email").isEmail(),
  
     
      body("password", "Password must be of atleast 5 characters").isLength({
        min: 5,
      }),
    ],
    async (req, res) => {
  
      let success =false;
      // If there are errors => return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() ,success});
        // res.redirect('http://localhost:3001/signup.html');
      }
  
      try {
        // Check whether the user with same email exists already
        let checkUser = await reactUserModel.findOne({ email: req.body.email });
  
        if (checkUser) {
          return res.status(400).json({ error: "Email already registered",success });
        }
  
        // Encrypting password
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
  
        // Creating a new user
        let reactUser = await reactUserModel.create({
          firstname: req.body.fname,
          lastname: req.body.lname,
          email: req.body.email,
  
          password: secPassword,
        });
  
        const data = {
          reactUser: {
            id: reactUser.id,
          },
        };
  
        const authToken = jwt.sign(data, JWT_SECRET);
  
        console.log(authToken);
        success = true;
  
        res.json({ authToken,success });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
      }
    }
  );

let recipeSchema= new mongoose.Schema({
    dishName:String,
    ingredients:[{
        ingredientName:String,
        quantity:String
    }],
    recipe: Array
});
let RecipeModel=connection.model('recipe',recipeSchema);
app.post('/getrecipe',function(req,res){
    console.log('CONNECTION');
	let recipeName = {
		dishName: req.body.dishName
	};
RecipeModel.findOne(recipeName,(err,recipe)=>{
    let success = false;
		if(err){
			console.log(err);
			res.status(503);
			res.json({
				flag: false,
				data:null,
				msg: 'something went wrong'
			});
		}else{
			if(recipe==null){
				res.status(404);
				res.json({
					flag: false,
					recipe,
					msg: 'recipe doesnt exists'
				});
			}else{
                success = true;
				res.status(200);
				res.json({recipe,success});
			}
		}
	});
});

// app.get('/yar',(req,res) => {
//     res.send("Yar");
// })

app.get('/getAllRecipes',async (req,res) =>  {
    try{
    let recipes =   await RecipeModel.find({});
    res.json(recipes);
    }
    catch(error){
        res.json(error);
    }
})
app.get('/recipe',(req,res)=>{
	res.json({msg:'abc',flag:true});
});

app.listen(3001,()=>{console.log('server started at port 3001');});
