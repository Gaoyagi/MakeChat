//app.js
const express = require('express');
const app = express();
const server = require('http').Server(app);

//Socket.io
const io = require('socket.io')(server);
let onlineUsers = {};             // store our online users here
let channels = {"General" : []};  //Save the channels in this object.
io.on("connection", (socket) => {
  // Make sure to send the users to our chat file,  will  be read on the new connections
  require('./sockets/chat.js')(io, socket, onlineUsers);
})

//Express View Engine for Handlebars
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//Establish your public folder
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
  res.render('index.handlebars');
})

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})


// Initial app.js

// //App.js
// const express = require('express');
// const app = express();
// //Socket.io has to use the http server
// const server = require('http').Server(app);

// //Express View Engine for Handlebars
// const exphbs  = require('express-handlebars');
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.render('index.handlebars');
// })

// server.listen('3000', () => {
//   console.log('Server listening on Port 3000');
// })