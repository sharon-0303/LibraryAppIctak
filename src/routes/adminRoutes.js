const express = require('express');
const multer = require('multer');
const path = require('path');


const adminRouter = express.Router();
const Bookdata = require('../model/BookData');
const Authordata = require('../model/AuthorData');

//Storage engine
var Storage = multer.diskStorage({
  destination:"./public/images/",
  filename: function(req,file,cb){
     // cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
     cb(null,file.originalname+path.extname(file.originalname));
  }
});
//Upload variable
var upload = multer({
  storage:Storage //use storage engine for storage
}).single('image');


//write called function
function router(nav,title){

    adminRouter.post('/',function(req,res){
        res.render("adminhome",
          {
              nav,
              title
          }   
        );
    });

    adminRouter.get('/',function(req,res){
        res.render("adminhome",
          {
              nav,
              title
          }   
        );
    });

    //BOOK

    adminRouter.get('/books',function(req,res){
      Bookdata.find() //catch the values
      .then(function(books){
      res.render("books",
          {
          nav,
          title: 'Books',
          books,
          admin:true
          } );
      })
      .catch();
  });

  // for single book page
  adminRouter.get('/books/:i',function(req,res){
  const id = req.params.i;
  Bookdata.findOne({_id:id})
  .then(function(book){

   res.render('book',{
       nav,
       title: 'Books',
       book,
       admin:true
   });

  })
  .catch();
  
});

// Add Book Form
    adminRouter.get('/addBook',function(req,res){
        res.render("addBook",
          {
              nav,
              title
          }   
        );
    });

// Add Book Action    
    adminRouter.post('/addB',upload,function(req,res){

      var item = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        image: req.file.filename
       }

      upload(req, res, function (error) {
        if (error) {
          console.log(`upload.single error: ${error}`);
          return res.sendStatus(500);
        }
        console.log("success upload");
      });

    
      
        var book = Bookdata(item);
        book.save(); //save to DB    

        res.redirect('/adminhome/books');
      });
// Update Book Form
adminRouter.get('/updateBook/:i',function(req,res){

  const id = req.params.i;
  Bookdata.findOne({_id:id})
  .then(function(book){
   res.render('updateBook',{
       nav,
       title: 'Books',
       book,
       admin:true
   });
  });
});

// Update Book Action
adminRouter.post('/updateB/:i',upload,function(req,res){
  console.log('UPDATING',req.body);
  const id = req.params.i;
  var update = Bookdata.findByIdAndUpdate(id,{
       title:req.body.title,
       genre:req.body.genre,
       image: req.file.filename,
       author: req.body.author
  });
  upload(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      return res.sendStatus(500);
    }
    console.log("success upload");
  }); 
  update.exec(function (err,data){
    if(err) throw err;
    res.redirect("/adminhome/books");
    // res.render("books",
    // {
    //     nav,
    //     title
    //     // success : "Record Updated Successfully!",
        
    // }   
    // );    
  })
});

// Delete Book      

adminRouter.get('/deleteBook/:i',function(req,res){
  
  const id = req.params.i;
  var del = Bookdata.findByIdAndDelete(id);
    
  del.exec(function (err){
    if(err) throw err;
    res.redirect("/adminhome/books");  
     
  })
});


// AUTHOR

    //Router for Authors
    adminRouter.get('/authors',function(req,res){
  Authordata.find() //catch the values
  .then(function(authors){
  res.render("authors",
      {
      nav,
      title: 'Authors',
      authors,
      admin:true
      } );
  })
  .catch();
});

// for single author page
adminRouter.get('/authors/:i',function(req,res){
  const id = req.params.i;
  Authordata.findOne({_id:id})
  .then(function(author){

   res.render('author',{
       nav,
       title: 'Authors',
       author,
       admin:true
   });

  })
  .catch();
});

    //Router to add author
    adminRouter.get('/addAuthor',function(req,res){
    res.render("addAuthor",
      {
          nav,
          title
      }   
    );

    adminRouter.post('/addA',upload,function(req,res){
      var item = {
         name: req.body.name,
         genre: req.body.genre,
         books: req.body.books,
         image: req.file.filename
        }
       upload(req, res, function (error) {
        if (error) {
          console.log(`upload.single error: ${error}`);
          return res.sendStatus(500);
        }
        console.log("success upload");
      }); 

        console.log('Files Uploaded: ');
        var author = Authordata(item);
        author.save(); //save to DB

        
        res.redirect('/adminhome/authors');
      });
    
});

adminRouter.get('/updateAuthor/:i',function(req,res){

  const id = req.params.i;
  Authordata.findOne({_id:id})
  .then(function(author){
   res.render('updateAuthor',{
       nav,
       title: 'Authors',
       author,
       admin:true
   });
  });
});

adminRouter.post('/updateA/:i',upload,function(req,res){
  console.log('UPDATING',req.body);
  const id = req.params.i;
  var update = Authordata.findByIdAndUpdate(id,{
       name:req.body.name,
       genre:req.body.genre,
       image: req.file.filename,
       books: req.body.books
  });
 
  upload(req, res, function (error) {
    if (error) {
      console.log(`upload.single error: ${error}`);
      return res.sendStatus(500);
    }
    console.log("success upload");
  });

  update.exec(function (err,data){
    if(err) throw err;
    res.redirect("/adminhome/authors");
    // res.render("authors",
    // {
    //     nav,
    //     title
    //     // success : "Record Updated Successfully!",
        
    // }   
    // );    
  })
});

adminRouter.get('/deleteAuthor/:i',function(req,res){
  
  const id = req.params.i;
  var del = Authordata.findByIdAndDelete(id);
    
  del.exec(function (err){
    if(err) throw err;
    res.redirect("/adminhome/authors");  
     
  })
});




     return adminRouter;
}
//acts as calling function as well
module.exports = router;