import { 
    FAQ_DETAILS_SUCCESS,
    FAQ_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/faqConstants'

const initialState = { faq: {} };

// FAQ Details Reducers
export const faqDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case FAQ_DETAILS_SUCCESS:
            return {
                faq: action.payload
            }
        case FAQ_DETAILS_FAIL: 
            return {
                error: action.payload
            }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        default: 
            return state
    }
}