const server = require('./server.js');

const port = process.env.PORT || 3000;

server.then((app) => {
  app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });  
})
