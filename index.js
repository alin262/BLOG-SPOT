import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const userCredential = new Map();
const userTweets = new Map();
//for current user
let user='Edison';
let message = "";
//for global users and tweets
let userNamesArray = [];
let usersTweetsArray = [];

/// demo usersCredentials and tweets.
userCredential.set("alin", "123");
userCredential.set("Edison", " ");
userCredential.set("tuvor", "p5d2k");
userCredential.set("wazil", "q8h3n");
userCredential.set("lemak", "j2f6t");
userCredential.set("nator", "m4b9v");
userCredential.set("zilop", "d7s4h");
userCredential.set("kavin", "z3g8p");
userCredential.set("motel", "y6r2u");
userCredential.set("cinor", "v9p5w");
userCredential.set("duval", "b1t3k");

userTweets.set("alin", [
  "Just another day, living the dream!",
  "Coffee and code, the perfect combination.",
  "Life is a journey, enjoy the ride.",
  "Making memories that last a lifetime.",
]);

userTweets.set("Edison", [
  "Enjoying the silence, away from the chaos.",
  "Embracing the simplicity of life, one moment at a time.",
]);

userTweets.set("tuvor", [
  "Exploring new ideas and pushing the boundaries.",
  "Tackling challenges head-on and never looking back.",
  "Dream big, work hard, stay focused.",
]);

userTweets.set("wazil", [
  "Wandering through the city streets, lost in thought.",
  "Wondering about the mysteries of the universe.",
  "Life is short, make it memorable.",
  "Finding beauty in the ordinary.",
]);

userTweets.set("lemak", [
  "Loving every moment of this beautiful journey.",
  "Learning and growing with each passing day.",
  "Stay positive, good things will happen.",
  "In the end, we only regret the chances we didn't take.",
]);

userTweets.set("nator", [
  "Navigating through life's twists and turns with grace.",
  "Never giving up on my dreams, no matter what.",
  "Every day is a new beginning.",
]);

userTweets.set("zilop", [
  "Zen mode activated: finding peace in the chaos.",
  "Inhale confidence, exhale doubt.",
]);

userTweets.set("kavin", [
  "Keeping it real, one day at a time.",
  "Kindness is the key to unlocking happiness.",
]);

userTweets.set("motel", [
  "Making memories that will last a lifetime.",
  "Moments of joy sprinkled throughout the day.",
  "Happiness is a choice.",
]);

userTweets.set("cinor", [
"Chasing dreams and catching them one by one.",
"Creating a life that feels like a dream come true.",
"Life is tough, but so are you.",
]);

userTweets.set("duval", [
"Diving into new adventures with an open heart.",
"Determined to make every moment count, no regrets.",
"Believe you can and you're halfway there.",
]);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.render("login.ejs", { message: message });
  message = ""; // Clear message after rendering
});




//myprofile route
app.get('/myprofile',(req,res)=>{
  if (userCredential.has(user)) {
    let tw=individualTweets(user)
    console.log(tw)
res.render('myprofile.ejs',{user:user,tw:tw})}

else{
  res.redirect('/')
}
  
})




//post tweet route
app.post('/tweet',(req,res)=>{
  let tw=req.body.tweet;
  console.log(tw)
  if (userTweets.has(user)) {
    let existingArray = userTweets.get(user);
    existingArray.push(tw);
    userTweets.set(user, existingArray);
  } else {
    let newArray = [tw];
    userTweets.set(user, newArray);
  }
})

// Signup route
app.post("/signup", (req, res) => {
  console.log("Received signup request");
  const name = req.body.data1;
  const pass = req.body.data2;

  if (userCredential.has(name)) {
    res.json({ message: "Already created account", user: name });
  } else {
    userCredential.set(name, pass);
    userTweets.set(name, []);
    res.json({ message: "Signup successful", user: name });
  }
});

// Login route
app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (userCredential.has(userName)) {
    if (userCredential.get(userName) == password) {
      user = userName;
      res.redirect("/home");
      console.log(user + " logged");
    } else {
      message = "Password incorrect";
      res.redirect("/");
    }
  } else {
    message = "Username not found";
    res.redirect("/");
  }
});

// Home route
app.get("/home", (req, res) => {
  if(userCredential.has(user)){users();
  globalTweets()
  console.log(user + " logged");
  res.render("home.ejs", { userNamesArray: userNamesArray, user: user,usersTweetsArray:usersTweetsArray });
  }
  else{
    res.redirect('/')
  }

  
});




//individual profile route
app.post('/profile', (req, res) => {
  let author = req.body.author;
  let tweets = individualTweets(author);
  let updatedTweetsHtml = '';
  tweets.forEach(tweet => {
    updatedTweetsHtml += `
      <div class="tweet-tab author" id="${author}">
        <h4 style="margin-top: 3rem">${tweet}</h4>
        <h5 style="text-align: end">~ ${author}</h5>
      </div>
    `;
  });
  res.send(updatedTweetsHtml);
});



app.listen(port, () => {
  console.log(`Successfully initiated port ${port}`);
});

//function to store all username for the story section in home page
function users() {
  userNamesArray = [];
  for (const key of userCredential.keys()) {
    userNamesArray.push(key);
  }
}
//function to get all the tweets with its author
function globalTweets() {
  usersTweetsArray = [];
  userTweets.forEach((value, key) => {
    if (Array.isArray(value)) {
      value.forEach((value) => {
        usersTweetsArray.push({ [key]: value });
      });
    } else {
      usersTweetsArray.push({ [key]: value });
    }
  });
}

//function for individual tweets
function individualTweets(author){
let t=userTweets.get(author);
return t;
}

