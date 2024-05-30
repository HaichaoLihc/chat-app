// the data type of users:
// a list of objects, each objects represent a user,
// with attribute id (socket.id), trimmed name (string), and room (string).
const users = [];

const addUsers = ({id, name, room}) => {
    // remove spaces and make all letters lowercase.
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // keep username in the same room unique
    const userExist = users.find((user) => user.name === name && user.room === room)
    if(userExist){ return {error:'Username is taken'} }

    // add new user if unique
    const user = {id, name, room}
    users.push(user)

    return {user}; // return an oject that has user as property
}

const removeUser = (id) => {
    // find the index of the first element that passes a test
    const index = users.findIndex((user) => user.id === id);
    // returns the removed user object
    if(index != -1) {return users.splice(index, 1)[0];}
  }

const getUser = (id) => users.find((user)=>user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUsers, removeUser, getUser, getUsersInRoom};

