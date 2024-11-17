import express from "express";
const app = express();
const PORT = 3000;
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"; 
import cookieParser from "cookie-parser";
import UserModel from "./models/UserModel.js";
import ExpenseModel from "./models/ExpenseModel.js";


dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/Expense");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL , // Sender email 
      pass: process.env.EMAIL_PASSWORD , // Sender email 
  },
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json("The token is missing");
    } else {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json("The token is wrong");
        } else {
          req.email = decoded.email;
          req.username = decoded.username;
          next();
        }
      });
    }
  };
  
  app.get("/", verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username });
  });
  
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.json({ message: "User Already Exist", success: false });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        name,
        email,
        password: hashPassword,
      });
      await newUser.save();
      return res.json({ message: "User Created", success: true });
    } catch (error) {
      return res.json(error);
    }
  });
  
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.json({ message: "Wrong Email or Password", success: false });
      }
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.json({ message: "Wrong Email or Password", success: false });
      }
  
      const token = jwt.sign(
        { email: user.email, username: user.username },
        process.env.JWT_KEY,
        { expiresIn: "1d" }
      );
      res.cookie("token", token);
      return res.json({
        login: true,
        message: "Successfully Logged In",
        success: true,
      });
    } catch (error) {
      return res.json(error);
    }
  });

  // routes
  app.post('/api/email/send', async (req, res) => {
    const { email, subject, message } = req.body;

    // Input validation
    if (!email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields: email, subject, or message' });
    }

    try {
        // Send the email
        await transporter.sendMail({
            from: process.env.EMAIL, // Sender email
            to: email, // Receiver email
            subject: subject , // Email subject
            text: message , // Email body
        });

        // If successful, send response
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email' });
    }
});

  app.post("/create", verifyUser,async(req, res) => {
    try{
      const {description,amount,createdby}=req.body;
      const expense=await new ExpenseModel({
        description,
        amount,
        createdby
      })
      await expense.save();
    return res.json({message:"Expense Created",success:true});
    }catch{
      return res.json({message:"Expense not Created",success:false})
    }
  });
  
  app.get("/getexpenses", (req, res) => {
    ExpenseModel.find()
      .then((expenses) => res.json(expenses))
      .catch((err) => res.json(err));
  });
  
  app.get("/getexpensebyid/:id", (req, res) => {
    const id = req.params.id;
    ExpenseModel.findById({ _id: id })
      .then((expense) => res.json(expense))
      .catch((err) => console.log(err));
  });
  
  app.put("/editexpense/:id", async(req, res) => {
    try {
      const id = req.params.id;
      const expense = await ExpenseModel.findByIdAndUpdate(
        { _id: id },
        { description: req.body.description,amount: req.body.amount,createdby:req.body.createdby }
      );
      return res.json({ success: true, expense: expense });

    } catch (error) {
      return res.json({ message: "Error in getting expense", success: false });
    }
  });
  
  app.delete("/deleteexpense/:id", async(req, res) => {
    try {
      const id = req.params.id;
      const expense = await ExpenseModel.findByIdAndDelete({ _id: id });
      return res.json({ deleted: true, expense });
    } catch (err) {
      return res.json(err);
    }
  });
  
  
  
  app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json("success");
  });
  

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
  });