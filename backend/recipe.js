const express = require('express');
const app = express();
const cors=require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

const connection = mongoose.connection;

let userSchema = new mongoose.Schema({
    username: String,
    email: String,
    mob: String,
    password: String
});
let userModel = connection.model('user',userSchema);

app.post('/login1',(req,res)=>{
    let userData = {
        username: req.body.username,
       
        password: req.body.pwd
    }

 userModel.find(userData,(err,result)=>{
       console.log(result.length);
       if(result.length>0){
        res.redirect('http://localhost:3001/recipe.html');
       }
       else{
        res.redirect('http://localhost:3001/login1.html');  
       }
    });
});

app.post('/signup',(req,res)=>{
    let userData = {
        username: req.body.username,
        email: req.body.email,
        mob: req.body.mob,
        password: req.body.password
    }

console.log(userData);
    userModel.create(userData,(err,result)=>{
        console.log(result);
        if(err)
            res.redirect('http://localhost:3001/signup.html');
        else
            res.redirect('http://localhost:3001/login1.html');
    });
});

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
