// In Node.js, require is a built-in function used to import modules. 
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const router = require('./router');
const { addUsers, removeUser, getUser, getUsersInRoom } = require('./users');

// Set up socket.io server
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors:{
        origin:['http://localhost:3000'] //enable cors 
    }
});

// Set up a PORT
const PORT = process.env.PORT || 5009;

// Use the router as a middleware
// mount it at root dir
app.use('/',router)

// use cors
app.use(cors)

// set up eventlistener on io object
// socket represents the connection between client and server
io.on('connection', (socket) => {
    console.log('we have a new connection!!!')

    //test
    
    // listens for users joining
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUsers({id:socket.id, name, room});

        // handle error
        if (error) return callback(error);

        // emit system message
        socket.emit('message', {user: 'admin', text: `Hi ${user.name}, welcome to room ${user.room}!`})
        socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name} has joined the room`});  //send msg to all excluding sender

        // join the socket into a room, an arbitrary channel that sockets can join and leave
        socket.join(user.room) 

        // emit room data to client
        io.to(user.room).emit('roomData', { room:user.room, users:getUsersInRoom(user.room)})
        
        // just run the callback if no errors
        callback();
    })

    // listens for messages
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
  
        // emit mesage to all users including the sender
        io.to(user.room).emit('message', { user: user.name, text: message})

        callback();
    })
    
    // listens for user leaving
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user){
            // emit msg to all users that leftUser has left
            io.to(user.room).emit('message', {user:'admin',text:`${user.name} has left.`})
            // emit updated room data
            io.to(user.room).emit('roomData', { room:user.room, users:getUsersInRoom(user.room)})
        }     
    })
})

// Run the server
server.listen(PORT, () => {console.log(`Server has started on port ${PORT}`)})



// middleware: the thing that runs between 
// the request sent to the server and response sent back by the server