const userInitialState = {
  account: "",
  
};

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'LOGIN':
      const { account } = action.payload;
      return {
        ...state,
        account,
      };
    default:
      return state;
  }
}

export default userReducer;
