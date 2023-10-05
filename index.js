
const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index'); // Renders 'index.ejs' in the 'views' directory
});

io.on('connection', (socket) => {
  console.log("connect ");
  socket.on('disconnected',()=>{
    console.log('dis connect ');
  });
  socket.on('chat message' ,(msg) => {
    console.log('messsage : ' + msg );
  });
});
// app.get('/led/on', (req, res) => {
//   // Logic to turn on LED
//   res.send('LED turned on!');
// });

app.post('/test', (req, res) => {
  let r = req.body
  console.log(' Robot is connect to server !! : ' +r);
  res.send('sucess  >>> '+r);
})

app.get('/header', (req, res) => {
  let r = req.headers
  console.log(' Robot is connect to server !! : ' +r);
  res.json({'sucess':r});
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

