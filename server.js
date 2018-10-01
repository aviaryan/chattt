var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// global variables
let channels = {};

// magic
io.on('connection', function (socket) {
  console.log('a user connected');
  let conn = {};

  socket.on('disconnect', function () {
    console.log('user disconnected');
    if (conn.channel){
      // remove user trace
      channels[conn.channel].population--;
      channels[conn.channel].users.splice(channels[conn.channel]['users'].indexOf(conn.user), 1);
      // send bye bye message
      io.emit('/msg ' + conn.channel, {user: null, data: `${conn.user} has left the chat`});
      io.emit('/meta ' + conn.channel, {type: 'left', data: conn.user});
    }
  });

  // join channel
  socket.on('/check',(data)=>{
    if(channels.hasOwnProperty(data.chnl)){
      socket.emit('/verifyResult',{matched:true});
    }
    else{
      socket.emit('/verifyResult',{matched:false});
         
    }
    
  });
  socket.on('/verify',(data)=>{
    if(data.pass===channels[data.channel]['pass'])
      socket.emit('/resp',{status:true});
    else{
            socket.emit('/resp',{status:false});

    }
  })
  
  
  socket.on('/join', (msg) => {
    let ch = msg.channel;
    let user = msg.user;
    let pass = msg.pass;
    let d = new Date();
    let timeZoneOffset = d.getTimezoneOffset()/60;
    if (timeZoneOffset <= 0) {
      timeZoneOffset = '+' + String(-timeZoneOffset);
    } else {
      timeZoneOffset = '-' + String(-timeZoneOffset);
    }
    let joinTime =  String(d.getHours()) + ':' + String(d.getMinutes()) + ' UTC' + timeZoneOffset;
    conn = {user: msg.user, channel: msg.channel,pass:pass};

    if (channels.hasOwnProperty(ch)){
      // channel exists
      // check if existing user
      if (channels[ch]['users'].indexOf(user) > -1){
        // fail user join request
        socket.emit('/status', {type: 'join failed', data: 'User with that handle already exists!'});
        conn.channel = null;
        return;
      }
      channels[ch]['population']++;
      channels[ch]['users'].push(user);
      channels[ch]['pass'] = msg.pass;
    } else {
      // need to create channel
      channels[ch] = {population: 1, users: [user], pass: pass};
    }
    // confirm user join
    socket.emit('/status', {type: 'joined', data: null});

    // broadcast update message
    io.emit('/msg ' + ch, {user: null, data: `${user} joined [${joinTime}]`});
    socket.broadcast.emit('/meta ' + ch, { type: 'join', data: user });
    // ^^ send to everyone except the connection, it already gets it

    // setup message listener
    socket.on('/msg ' + ch, (msg) => {
      io.emit('/msg ' + ch, msg);
    });
  });

  // get users list utility
  socket.on('/users', (msg) => {
    let ch = msg.channel;
    socket.emit('/cb', {type: 'users', data: channels[ch].users});
  });

});

app.get("/", function (request, response) {
  response.send('<a href="https://github.com/aviaryan/chattt">LOST?</a>');
});

// listen for requests :)
http.listen(3000, function() {
  console.log('listening on 3000');
});
