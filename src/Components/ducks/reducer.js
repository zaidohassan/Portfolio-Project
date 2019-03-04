const axios = require("axios");

const initialState = {
  user: {},
  err: false
};

const GET_USER = "GET_USER";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/auth/me")
  };
}

export default function userReducer(state = initialState, action) {
  // console.log("load: " + action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: {
          username: action.payload.data[0].username,
          email: action.payload.data[0].email,
          id: action.payload.data[0].user_id,
          image: action.payload.data[0].image_url
        },
        err: false
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        err: true,
        msg: action.payload.data
      };

    default:
      return state;
  }
}
