const http = require("http");
// http 作為製作server的class
const fs = require("fs"); // fs = file system
const port = 3000;
const ip = "127.0.0.1";


const sendResponse = (filename, statusCode, response) => {
    fs.readFile(`./html/${filename}`, (error, data) => {
        if(error)
        {
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");//返回的格式
            response.end("Sorry Error!");
        }else{
            response.statusCode = statusCode;
            response.setHeader("Content-Type", "text/html");
            response.end(data);
        }
    });
};
// statusCode 是給用戶的狀態碼

const server = http.createServer((request, response) => {

    console.log(request.url, request.method) // url會知道client請求的頁面  method會知道client請求的方法
    const method = request.method;
    let url = request.url; //let???

    if(method === "GET")
    {
        const requestUrl = new URL(url, `http://${ip}:${port}`);
        console.log(requestUrl);
        console.log(requestUrl.searchParams.get("lang"));
        url = requestUrl.pathname;
        const lang = requestUrl.searchParams.get("lang");
        let selector;

        if(lang === null || lang ==='en')
        {
            selector = "";
        }else if(lang === "zh"){
            selector = "-zh";
        }else{
            selector = "";
        }

        if(url === "/")
        {
            sendResponse(`index${selector}.html`, 200, response); // 200是statusCode 表示正常, response 是回傳要顯示的物件
        }else if(url === "/about.html"){
            sendResponse(`about${selector}.html`, 200, response);
        }else{
            sendResponse(`404${selector}.html`, 404, response);
        }
    }else{

    }
    
    //response.end("Hello From NodeJS Server");

});
// request 和 response 是負責監看是否有請求產生 以做出相對應的服務
// request 可以獲取請求的obj是什麼 
// response 就是負責處理要返回前端 給予相對應處理的obj



//            接口, 位址, callback
server.listen(port, ip, () => {
    console.log(`Server is running at http://${ip}:${port}`);
});
