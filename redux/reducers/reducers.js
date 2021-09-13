import { combineReducers } from "redux";
import { faqDetailsReducer } from "./faqDetailsReducer";
import { faqsReducer } from './faqsReducer';
import { authReducer } from './userReducer'

const reducer = combineReducers({
    faqs: faqsReducer,
    auth: authReducer,
    faqDetails: faqDetailsReducer
});

export default reducer;