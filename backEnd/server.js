// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors')
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = process.env.PORT || 3001;
// app.use(cors())
// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // MongoDB connection
// const mongoURI = 'mongodb+srv://developeraimw:aimastersworld5@cluster0.xgl5ohh.mongodb.net/';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define Mongoose schema and model
// const formDataSchema = new mongoose.Schema({
//   customerName: String,
//   quoteNumber: String,
//   emailAddress: String,
// });

// const FormData = mongoose.model('FormData', formDataSchema);

// // Handle form submissions
// app.post('/submit-form', (req, res) => {
//   const { customerName, quoteNumber, emailAddress } = req.body;

//   const formData = new FormData({
//     customerName,
//     quoteNumber,
//     emailAddress,
//   });

//   formData.save()
//   .then(() => {
//     res.send('Form submitted successfully');
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser");

const port = 3001;
app.use(cors());
app.use(express.json());

// connection to the newitem database
const newQuotemongoURI = 'mongodb+srv://developeraimw:aimastersworld5@cluster0.xgl5ohh.mongodb.net/NewQuote';
const newQuoteconnection = mongoose.createConnection(newQuotemongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// newitem promise-based approach to handle connection Sucess and error
newQuoteconnection.on("error", console.error.bind(console, "MongoDB connection error for newQuote:"));
newQuoteconnection.once("open", () =>{
  console.log("Connected to newQuote MongoDB")
})

// connection to the newquote database
const newItemmongoURI = 'mongodb+srv://developeraimw:aimastersworld5@cluster0.xgl5ohh.mongodb.net/NewItem';
const newItemconnection = mongoose.createConnection(newItemmongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// newquote promise-based approach to handle connection Sucess and error
newItemconnection.on("error", console.error.bind(console, "MongoDB connection error for newitem:"));
newItemconnection.once("open", () =>{
  console.log("Connected to newItem MongoDB")
})
// Define Model and Schema for newitem database
const quoteSchema = new mongoose.Schema({
  customerName: String,
  quoteNumber: String,
  emailAddress: String
});

const Quote = newQuoteconnection.model("quote", quoteSchema);

// Define Model and schema for newquote database
const itemschema = new mongoose.Schema({
  customerName: String,
  quoteNumber: String,
  emailAddress: String
});

const item = newItemconnection.model("item", itemschema);



// Pushing the data to the quote collection inside newquote database
app.post('/NewQuote', async (req, res) => {
  const newquote = new Quote({
    customerName: req.body.customerName,
    quoteNumber: req.body.quoteNumber,
    emailAddress: req.body.emailAddress
  });
  await newquote.save()
   .then(data => {
    return res.json(data);
   })
   .catch(err => {
    console.error("Error in saving quote", err);
    return res.status(500).json("Error saving quote");
   })
});

// fetching data from the database
// app.get('NewQuote', async (req,res)=>{
//   try{
//   const quotes = await Quote.find({});
//   res.json(quotes);
//   console.log("customer data fetched");
//   }
//   catch(error){
//     console.log("Error in getting data from db ", error);
//     res.status(500).json({error : 'internal server error'});
//   }

// })
// start the server
app.listen(port, () => {
  console.log(`Server is running onn port ${port}`);
});