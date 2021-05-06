const users = [];

const addUser = (chatData) => {
  const existingUser = users.find(
    (user) =>
      user.roomId === chatData.roomId && user.nomadId === chatData.nomadId
  );
  if (existingUser) return { error: "User has already joind the room" };
  const user = chatData;
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const removedUser = users.filter((user) => user.nomadId === id);
  const newUsers = users.filter((user) => user.nomadId !== id);
  users.push(newUsers);
  if (removedUser) return removedUser;
};

const getUser = (id) => {
  const user = users.find((user) => user.nomadId === id);
  console.log("user server", user);
  return user;
};

const getUsersInRoom = (roomId) =>
  users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
