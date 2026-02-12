const express = require("express");
const port = 8000;
const user = require("./MOCK_DATA.json");

const app = express();

app.get("/user",(req,rep)=>{
    const html =`
    <ul>

   ${ user.map((user)=>(`<li>${user.first_name}</li>`)).join("")
    }
    
    </ul>
    `
    rep.send(html);
})


app.get("/user/:id",(req,rep)=>{
    const id =  Number(req.params.id);
    const userid  = user.find((user)=>user.id === id);

    const html = `
    <h1>${userid.first_name}</h1>
    <h2>${userid.last_name}</h2>
        <h2>${userid.email}</h2>
        <p>Gender:${userid.gender}</p>
        <p>job:${userid.job_title}</p>

    `
    return rep.send(html);
})




const ok = (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("running ")
    }

}

app.listen(port ,(err)=>{ok(err)} )