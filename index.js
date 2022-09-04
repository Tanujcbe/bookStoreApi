require("dotenv").config();
 
// Frameworks
const express=require("express");
const mongoose = require("mongoose");

// Database
// const database = require("./database/database");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialize
const booky = express();

// configuration
booky.use(express.json());

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
)
.then(() => console.log("Connection Established!!!!!!"))
/*
Route        /
Description  Get all books
Access       Public
Parameter    None
Methods      GET
*/
booky.get("/",async (req,res)=> {
    const getAllBooks = await BookModel.find();
    // console.log(getAllBooks);
    return res.json({getAllBooks});
});

/*
Route        /isbn  
Description  Get specific book based on ISBN
Access       Public
Parameter    ISBN
Methods      GET
*/
booky.get("/isbn/:isbn", async (req,res) =>{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    //  const getSpecificBook = database.books.filter(
    //     (book) => book.ISBN === req.params.isbn
    // );

    if(!getSpecificBook){
        return res.json({
            error:`No book found for the ISBN of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificBook });
})

/*
Route        /c
Description  Get specific book based on ISBN
Access       Public
Parameter    Category
Methods      GET
*/
booky.get("/c/:category",async (req,res) => {
    const getSpecificBook = await BookModel.find({category: req.params.category})
    // const getSpecificBook = database.books.filter(
    //     (book) => book.category.includes(req.params.category)
    // );
    if(!getSpecificBook){
        return res.json({
            error:`No book found for the category of ${req.params.category}`,
        })
    }
    return res.json({book: getSpecificBook });
});

/*
Route        /lan
Description  Get specific book based on ISBN
Access       Public
Parameter    Language
Methods      GET
*/
booky.get("/lan/:language",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if(getSpecificBook.length === 0){
        return res.json({
            error:`No book found for the language of ${req.params.category}`,
        })
    }
    return res.json({book: getSpecificBook });
})

/*
Route        /author
Description  Get specific book based on ISBN
Access       Public
Parameter    ISBN
Methods      GET
*/
booky.get("/author", async(req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors: getAllAuthors });
});

/*
Route        /author/book
Description  Get specific book based on ISBN
Access       Public
Parameter    ISBN
Methods      GET
*/
booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
        return res.json({
            error:`No author found for the book of ${req.params.isbn}`,
        });
    }
    return res.json({book: getSpecificAuthor });
});

/*
Route        /book/add
Description  add new  book
Access       Public
Parameter    None
Methods      POST
*/
booky.post("/book/add",async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({books: addNewBook, message:"book was added"});
});

/*
Route        /author/add
Description  add new  author
Access       Public
Parameter    None
Methods      POST
*/
booky.post("/author/add",(req,res) => {
    // console.log(req.body);
    const { newAuthor } = req.body;
    const AddNewAuthor  = AuthorModel.create(newAuthor);
    return res.json({authors: AddNewAuthor, message: "author was added"});
});

/*
Route        /book/update/title
Description  add new  author
Access       Public
Parameter    None
Methods      POST
*/
booky.put("/book/update/title/:isbn",async(req,res) => {
     database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.title=req.body.newBookTitle;
            // console.log(book.title);
            return ;
        }
     });
    return res.json({books: database.books});
});

booky.listen(3000,()=> console.log("Server is running..."));

