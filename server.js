const http = require('http'); 
const fs = require('fs/promises');


const server = http.createServer(async (req , res) => {
   try {
      if(req.url === '/') {
        const html = await fs.readFile('./public/index.html' , 'utf-8') ;

        res.writeHead(200 , {'content-type' : 'text/html'}) ;
        res.end(html)

     } else if(req.url.startsWith('/suburb')) {
        const html = await fs.readFile('./public/suburb.html' , 'utf-8')

        res.writeHead(200 , {'content-type' : 'text/html'})
        res.end(html)

     } else if(req.url.startsWith('/images/')){

         const image = await fs.readFile('.' + req.url);

         let contentType = 'image/jpeg';
         if (req.url.endsWith('.png')) contentType = 'image/png';
         if (req.url.endsWith('.gif')) contentType = 'image/gif';
         if (req.url.endsWith('.webp')) contentType = 'image/webp';

         res.writeHead(200, { 'content-type': contentType });
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