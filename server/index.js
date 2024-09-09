//username : pashadeviprasanna
//password : DIU2PMOUGoEXBjKG

const express = require("express");
const mongoose = require('mongoose');
const Product = require("./models/product.model.js")
const User = require("./models/user.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const app = express();
app.use(express.json())
app.use(cors(
    {
        origin:["https://node-n-mongodb-frontend.vercel.app"],
        methods:["POST","GET","PUT","DELETE"],
        credentials : true
    }
))

mongoose.connect("mongodb+srv://pashadeviprasanna:DIU2PMOUGoEXBjKG@backenddb.1buhn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(()=>{
    console.log("Connected to Database")
})
.catch(() => {
    console.log("Connection Failed")
})

app.listen(5004,() => {
    console.log("server is running on port 5004")
});

app.get("/",(request,response) => {
    response.send("Hello from Node API")
})

//register api 
app.post("/register",async(request,response) => {
    try{
        const {username,password} = request.body;
        const dbUserDetails = await User.find({username:username})
        if (dbUserDetails.length ===0){
            if (password.length < 5){
                response.status(400);
                response.send("Password is too Short!!")
            }else{
                const hashedPassword = await bcrypt.hash(password,10)
                const userDetails = await User.create({username,password:hashedPassword})
                console.log("User Inserted Successfully")
                response.send("User Inserted Successfully")
            }
             
        }else{
            response.status(400).send("User already exists")
        }
    }catch(error){
        response.status(500).send({message:error.message})
    }
    
})

//get users 
app.get("/users",async(request,response) => {
    try{
        const users = await User.find({})
        response.send(users)
    }catch(error){
        response.status(500).send({message:error.message})
    }
})

//login api
app.post("/login",async(request,response)=>{
    try{
        const {username,password} = request.body;
        const dbUserDetails = await User.find({username:username})
        if(dbUserDetails.length !== 0){
            const isPasswordMatched = await bcrypt.compare(password,dbUserDetails[0].password)
            if (isPasswordMatched === true){
                const payload = {username}
                const jwtToken = await jwt.sign(payload,"MY_SECRET_TOKEN")
                response.send({jwtToken})
            }else{
                response.status(400).send({errorMsg : "Incorrect Password"})
            }
        }else{
            response.status(400).send({errorMsg : "User not exists"})
        }
    }catch(error){
        response.status(500).send({errorMsg:error.message})
    }
})

//get all products
app.get("/api/products",async(request,response) => {
    try{
        const products = await Product.find({})
        response.send(products)
    }catch(error){
        response.status(500).send({message : error.message})
    }
})

//insert a product
app.post("/api/products", async(request,response)=>{
    try{
       const product = await Product.create(request.body);
       response.status(200).send(product)
    }catch(error){
        response.status(500).send({message : error.message})
    }
})

//get a product
app.get("/product/:id",async(request,response) => {
    try{
        const {id} = request.params;
        const productDetails = await Product.find({_id : id})
        response.send(productDetails)
    }catch(error){
        response.status(500).send({message : error.message})
    }
})

//update product
app.put("/product/:id",async(request,response) => {
    try{
        const {id} = request.params
        const data = request.body 
        const after_updation = await Product.findByIdAndUpdate(id,data);
        if(!after_updation){
            return response.status(400).send({message : "Product not found"})
        }
        const updated_product = await Product.find({_id:id})
        response.send({updated_product})
    }catch(error){
        response.status(500).send({message : error.message}) 
    }
})

//delete a product
app.delete("/product/:id",async(request,response) => {
    try{
        const {id} = request.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product){
            return response.status(400).send({message : "Product not found"})
        }
        response.status(200).send({message : "Product deleted successfully!!"})
    }catch(error){
        response.status(500).send({message : error.message}) 
    }
})

