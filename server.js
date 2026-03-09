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
                               
     } else if(req.url.startsWith('/api/suburbs/')){
         const id = req.url.split('/api/suburbs/')[1];

         const data = await fs.readFile('./data/suburbs.json', 'utf-8');
         const suburbs = JSON.parse(data);
         const suburb = suburbs.find(s => s.id === id);

         res.writeHead(200, { 'content-type': 'application/json' });
         res.end(JSON.stringify(suburb));

     } else if(req.url.startsWith('/api/reviews/')){
         const suburbId = req.url.split('/api/reviews/')[1];

         const data = await fs.readFile('./data/reviews.json' , 'utf-8');
         const reviews = JSON.parse(data);
         const filtered = reviews.filter(r => r.suburbId === suburbId)

         res.writeHead(200, { 'content-type': 'application/json' });
         res.end(JSON.stringify(filtered))

     } else if(req.url === '/suburb.js'){
         const js = await fs.readFile('./public/suburb.js' , 'utf-8')
         
         res.writeHead(200, { 'content-type': 'text/javascript' })
         res.end(js)
         
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