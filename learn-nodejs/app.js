const http = require("http");

http.createServer((req,resp)=>{

resp.write("<h>hello</h");
resp.end();
}).listen(4500);