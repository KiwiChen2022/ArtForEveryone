import i18n from "i18next";
import { CHANGE_LANGUAGE } from "./actions";

const languageMiddleware = (store) => (next) => (action) => {
  if (action.type === CHANGE_LANGUAGE) {
    i18n.changeLanguage(action.payload);
  }
  return next(action);
};

export default languageMiddleware;
