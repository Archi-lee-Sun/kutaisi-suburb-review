const http = require('http'); 
const fs = require('fs/promises');


const server = http.createServer(async (req , res) => {
   try {
      if(req.url === '/') {
        const html = await fs.readFile('./public/index.html' , 'utf-8') ;

        res.writeHead(200 , {'content-type' : 'text/html'}) ;
        res.end(html)

     } else if(req.url.startsWith('/suburb') && Number(req.url.split('?id=')[1]) >= 1 && Number(req.url.split('?id=')[1]) <= 8) {
        const html = await fs.readFile('./public/suburb.html' , 'utf-8')

        res.writeHead(200 , {'content-type' : 'text/html'})
        res.end(html)

     } else if(req.url.startsWith('/images/')){
         const image = await fs.readFile('.' + req.url);

         res.writeHead(200, { 'content-type': 'image/jpeg' });
         res.end(image);     
                               
     } else {
        const notFound = await fs.readFile('./public/404.html' , 'utf-8')

        res.writeHead(404 , {'content-type' : 'text/html'})
        res.end(notFound)
     } 
   } catch(error) {
      console.error('Server error:' , error);
      res.writeHead(500);
      res.end('Internal server error');
   }
     
     
})


server.listen(8001 , () => {
    console.log("Server is running on http://localhost:8001")
})