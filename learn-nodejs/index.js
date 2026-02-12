const express = require("express");
const user = require("./MOCK_DATA.json");

const app =express();

app.get("/api/user",(req,rep)=>{
    return rep.json(user);
})


app.get("/user",(req,rep)=>{

const html =`

<ul>
${user.map(user)=>(
    ``
)}

</ul>
`;

    return 

})

app.listen(8000,(err)=>{
    if(err){
        console.log(err);
    }else {
        console.log("code is ok");
    }
})