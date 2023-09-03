const initialState = {
  language: "en",
};

function languageReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
}

export default languageReducer;
