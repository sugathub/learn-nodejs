const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const { request } = require("http");
const port = 8000;

const app = express();


app.use(express.urlencoded({extended:false}));

const ok = ((req,rep,next)=>{
    console.log("ok");
    next();
})

app.get("/api/users", (req, rep) => {



    return rep.send(users)

})

app.get("/users", (req, rep) => {
        rep.setHeader("x-name","sugat")
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



app.post("/api/users" ,(req,res)=>{

const body = req.body;

if(!body.first_name || !body.first_name || !body.last_name || !body.email  || !body.gender || !body.job_title){
    return res.status(400).json({"mes":" bad request"});
}
users.push({...body,id:users.length +1 });
fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.status(201).json({status: "success",id: users.length+1});

});

})
app.delete("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const index =users.find(user => user.id ===id)
    if(index === -1){
        return res.status(404).json({status:"user not found"});
    }
    users.splice(index,1);

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if(err){
            return res.status(500).json({status: "Error saving data"});
        }
        return res.json({status: "User deleted successfully"});
    });
})






app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Good runing")
    }


})