//MAIN SERVER

const express = require('express');
const multer = require('multer');
const path = require('path');

// const GridFsStorage = require("multer-gridfs-storage");
const app = express();
const port = process.env.PORT || 4000;

//Reuse NavBar

const index_nav =[
    {link:'/index',name:'Home'},
    {link:'/userlogin',name:'Sign In'},
    {link:'/userRegister',name:'Sign Up'}
];

const admin_nav =[
    {link:'/adminhome',name:'Home'},
    {link:'/adminhome/books',name:'Books'},
    {link:'/adminhome/authors',name:'Authors'},
    {link:'/adminhome/addBook',name:'Add Book'},
    {link:'/adminhome/addAuthor',name:'Add Author'},
    {link:'/logout',name:'Logout'}
];

const user_nav = [
    {link:'/home',name:'Home'},
    {link:'/books',name:'Books'},
    {link:'/authors',name:'Authors'},
    {link:'/logout',name:'Logout'}
];

//Title Reuse
const title = "Library App"

//File Seperation

const validateRouter = require('./src/routes/validateRoutes') (index_nav,title);
const booksRouter = require('./src/routes/bookRoutes') (user_nav,title); //passing nav array to bookroutes.js
const authorRouter = require('./src/routes/authorRoutes') (user_nav,title);
const adminRouter = require('./src/routes/adminRoutes') (admin_nav,title);
// we can't use require for ejs

var Storage = multer.diskStorage({
    destination:"./public/images",
    filename:(req,file,cb) =>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage:Storage
}).single('image');

app.use(express.urlencoded({extended:true})); //for POST requests
app.use(express.static('./public'));
app.set('view engine','ejs'); //set view engine
app.set('views','./src/views'); //set ejs path

app.use('/',validateRouter); // Index,SignIn,SignUp,Logout pages
app.use('/books',booksRouter);
app.use('/authors',authorRouter);
app.use('/adminhome',adminRouter);


//HOME
app.post('/home',function(req,res){
    const nav = user_nav;
    res.render("home",
      {
          nav,
          title
      }   
    );
});

app.get('/home',function(req,res){
    const nav = user_nav;
    res.render("home",
      {
          nav,
          title
      }   
    );
});



app.listen(port,()=> {console.log("Server Ready at "+port)});