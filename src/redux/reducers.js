import { combineReducers } from "redux";
import { CREATE_FORM } from "./action-types";

const initialState = {
  forms: []
};

const list = function (state = initialState, action) {
  switch (action.type) {
    case CREATE_FORM: {
      const form = action.data;
      return {
        ...state,
        forms: [...state.forms, form],
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({ list });
