const users = [];

const addUser = ({ id, chatData }) => {
  const existingUser = users.find(
    (user) =>
      user.roomId === chatData.roomId && user.nomadId === chatData.nomadId
  );
  if (existingUser) return { error: "User has already joind the room" };
  const user = { id, ...chatData };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
