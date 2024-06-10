import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const userCredential = new Map();
let user;
let message ='';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.render("login.ejs", { message: message });
  message = '';  // Clear message after rendering
});

// Signup route
app.post("/signup", (req, res) => {
  console.log("Received signup request");
  const name = req.body.data1;
  const pass = req.body.data2;

  if (userCredential.has(name)) {
    res.json({ message: "Already created account", user: name });
  } else {
    userCredential.set(name, pass);
    res.json({ message: "Signup successful", user: name });
  }
});

// Login route
app.post('/login', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName);
  console.log(password);
  if (userCredential.has(userName)) {
    if (userCredential.get(userName) == password) {
      user = userName;
      res.redirect('/home');
    } else {
      message = "Password incorrect";
      res.redirect('/');
    }
  } else {
    message = 'Username not found';
    res.redirect('/');
  }
});

// Home route
app.get('/home', (req, res) => {
  res.render('home.ejs', { user: user });
});

app.listen(port, () => {
  console.log(`Successfully initiated port ${port}`);
});
