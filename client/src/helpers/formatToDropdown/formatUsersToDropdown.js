export const formatUsersToDropdown = (usersArray) =>
  usersArray.map(({ id, name, color }) => ({ id, displayName: name, value: id, color }));
