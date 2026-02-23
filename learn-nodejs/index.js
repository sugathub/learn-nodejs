const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const users = require("./MOCK_DATA.json");
const { request } = require("http");
const { type } = require("os");
const { generateKey } = require("crypto");
const port = 8000;

// Connection

mongoose.connect("mongodb://localhost:27017/youtub-1")
    .then(() => console.log("MongoDB Connected "))
    .catch(err => console.log("mongo err: ", err));

//schema
const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
},{timestamps:true});


const User = mongoose.model("user", userSchema);






const app = express();


app.use(express.urlencoded({ extended: false }));

const ok = ((req, rep, next) => {
    console.log("ok");
    next();
})

app.get("/api/users", (req, rep) => {



    return rep.send(users)

})

app.get("/users", (req, rep) => {
    rep.setHeader("x-name", "sugat")
    console.log(req.headers);



    const html = `
<ul>

    ${users.map((user) => (
        `  <li>${user.first_name}</li>`
    )).join("")}

    
</ul>
`
    return rep.send(html);


})
app.get("/api/users/:id", (req, rep) => {


    const id = Number(req.params.id);
    const userid = users.find((users) => users.id === id);

    return rep.json(userid);


})




app.get("/users/:id", (req, rep) => {
    const id = Number(req.params.id);
    const userid = users.find((users) => users.id === id);


    const html = `
    <h1> first name: ${userid.first_name}</h1>
    <h1>last name:${userid.last_name}</h1>
    
    <p><b>email:${userid.email} </b></p>
    <p>gender:${userid.gender}</p>
   <p>job_title:${userid.job_title}</p>


    
    `

    return rep.send(html);





})



app.post("/api/users", async (req, res) => {

    const body = req.body;

    if (!body.first_name  || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ "mes": " bad request" });
    }
    const result = await User.create({
        first_name : body.first_name,
        last_name: body.last_name,
       gender: body.gender,
       email: body.email,
      job_title: body.job_title,
    });

    console.log("result ",result);

    return res.status(201).json({msg:"success"});

})

app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = users.find(user => user.id === id)
    if (index === -1) {
        return res.status(404).json({ status: "user not found" });
    }
    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error saving data" });
        }
        return res.json({ status: "User deleted successfully" });
    });
})






app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Good runing")
    }


})