export const getRemindersLocal = (key) => {
  const reminders = localStorage.getItem(key);

  if (reminders && reminders.length) {
    return JSON.parse(reminders);
  } else {
    return [];
  }
};

export const setRemindersLocal = (key, currentState) => {
  localStorage.setItem(key, currentState);
};

export const getIndex = (key) => {
  const index = localStorage.getItem(key);

  if (index && index.length) {
    return JSON.parse(index);
  } else {
    return [-1];
  }
};

export const setIndex = (key, index) => {
  localStorage.setItem(key, index);
};

export const getUsers = async (key) => {
  return [];
  // const users = localStorage.getItem(key);
  //   await fetch("http://localhost:5000/auth/", {
  //     method: "get",
  //     headers: { "Content-type": "application/json", Authorization: "Bearer " + localStorage.getItem("jwt") },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       return [result];
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return [];
  //     });

  // if(users && users.length) {
  //     return JSON.parse(users);
  // } else {
  //     return [];
  // }
};

export const setUsers = (key, users) => {
  localStorage.setItem(key, users);
};
