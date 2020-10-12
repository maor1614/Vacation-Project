let intialUser = {
  login: false,
};

export const user = (state = intialUser, action) => {
  switch (action.type) {
    case "LOGIN":
      let newState = {
        login: true,
        userid: action.payload.userid, 
        fname: action.payload.fname,
        role: action.payload.role,
      };
      return newState;
    case "LOGOUT":
      return intialUser;
    default:
      return state;
  }
};

export const vactions = (state = [], action) => {
  switch (action.type) {
    case "ADD_VACATIONS":
      return [...state, { id: 45, dept: "sometime", ret: "sometime" }];
    case "LOGOUT":
      return intialUser;
    default:
      return state;
  }
};
