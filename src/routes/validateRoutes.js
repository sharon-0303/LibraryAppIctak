const express = require('express');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose =   require("passport-local-mongoose");

const validateRouter = express.Router();
const Userdata = require('../model/UserData');

//write called function
function router(nav,title){

  var books = [
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        img: "lotr.jpeg"
    },
    {
        title: "Harry Potter",
        author: "J K Rowling",
        genre: "Fantasy",
        img: "harry.jpg"
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        img: "at.jpeg"
    }
    ]

//INDEX PAGE
validateRouter.get('/',function(req,res){
    // __dirname  gives current dir name
    res.render("index",
      {
          nav,
          title,
          books
      }   
    );
});

validateRouter.get('/index',function(req,res){
    res.render("index",
      {
          nav,
          title,
          books
      }   
    );
});

//LOGIN PAGE

validateRouter.get('/userlogin',function(req,res){
    res.render("login",
      {
          nav,
          title,
          error : ""
      }   
    );
});

//LOGIN VALIDATE PAGE

validateRouter.post('/signinValidate',function(req,res){
  
    let email =req.body.email;
    let password =req.body.password;   

   Userdata.findOne({email:email})
   .then(function(user){
         if(user.password == password)
         {
          res.redirect('/home');
           }
           else if (email == "admin@gmail.com" && password=="admin"){
            res.redirect('/adminhome');
          }

         else{
              res.render("login",
              {
                  nav,
                  title,
                  error : "Invalid Credentials! Please Try again!"
              }   
              );
            }
    })
   .catch( ()=> {

         res.render("login",
              {
                  nav,
                  title,
                  error : "User not found! Please SIGN UP!"
              }   
              );    
            });
  });

//REGISTER
validateRouter.get('/userRegister',function(req,res){
    res.render("signup",
      {
          nav,
          title
      }   
    );
});

//REGISTER VALIDATE PAGE

validateRouter.post('/loginValidate',function(req,res){
  
  var user = {
    name: req.body.fn,
    email: req.body.email,
    dob: req.body.dob,
    // image: req.query.image,
    password: req.body.password,
   }
   var user = Userdata(user);
   user.save(); //save to DB
   res.redirect('/home');
 });

//ADMIN LOGIN
validateRouter.get('/adminlogin',function(req,res){
  res.render("adminLogin",
    {
        nav,
        title,
        error : ""
    }   
  );
});

//ADMIN LOGIN VALIDATE
validateRouter.post('/adminValidate',function(req,res){
  
  let email =req.body.email;
  let password =req.body.password;   

  if (email == "admin@gmail.com" && password=="admin"){
    res.redirect('/adminhome');
  }
  else {

    res.render("adminLogin",
    {
        nav,
        title,
        error : "Invalid Credentials! Please Try again!"
    }   
    );    
  }
});

//LOGOUT
validateRouter.get('/logout',function(req,res){
  res.render("logout",
    {
        nav,
        title
    }   
  );
});



     return validateRouter;
}
//acts as calling function as well
module.exports = router;