import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;

const Chat = () => {
    const [name, setName] = useState(''); // untrimmed name string
    const [room, setRoom] = useState(''); // untrimmed room string
    const [users, setUsers] = useState([]); //users array that store all user objs
    const [message, setMessage] = useState(''); //message obj with atributte user (trimmed name string) and text (string)
    const [messages, setMessages] = useState([]); //messages array that store all message objs
    const ENDPOINT = 'localhost:5009';

    // get the url
    const location = useLocation();
    
    // establish client's socket connection and send join data
    useEffect(()=>{
        // this utilize object destructuring
        // parsing the name and room in the url
        const { name, room } = queryString.parse(location.search);
        
        socket = io(ENDPOINT)
        
        // give the values to name and room states
        setName(name);
        setRoom(room);
        
        // emit join data (name, room) to server 
        socket.emit('join', { name, room }, () => {

        }) 

        return () => {
            socket.disconnect(); //close the socket when useEffect changes or unmounts
            socket.off(); //detach all eventlisteners on the socker
        }

    }, [ENDPOINT, location.search]) //useEffect only activate when these two vars change

    // listens for message, and add them to messages array
    useEffect(()=>{
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    // listens for room data, and add them to users array
    useEffect(()=>{
        socket.on('roomData', ({users}) => {
            setUsers(users)
        })
    }, [users])


    // functions for sending messages
    const sendMessage = (event) => {
        event.preventDefault(); // prevent default behavior of keypress and button click
        
        // emit message
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }
    
    console.log(message, messages)
    
    return(
        <div className="outerContainer">
            <div className="container">
                <InfoBar room = {room}/>
                <Messages messages = {messages} name = {name}/>
                <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage}/>
            </div>
            <TextContainer users = {users}/>
      </div>
    )
}

export default Chat;