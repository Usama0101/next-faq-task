import { 
    ALL_FAQS_FAIL,
    ALL_FAQS_SUCCESS,
    FAQS_ADD_SUCCESS,
    FAQS_ADD_FAIL,
    CLEAR_ERRORS,
    FAQ_DELETE_FAIL,
    FAQ_DELETE_SUCCESS,
    FAQ_UPDATE_SUCCESS,
    FAQ_UPDATE_FAIL
} from '../constants/faqConstants'

const initialState = { faqs: [] };

// All Rooms Reducers
export const faqsReducer = (state = initialState, action) => {
    switch(action.type){
        case ALL_FAQS_SUCCESS:
            return {
                faqsCount: action.payload.count,
                faqs: action.payload.faqs
            }
        case ALL_FAQS_FAIL: 
            return {
                error: action.payload
            }
        case FAQS_ADD_SUCCESS: 
            return {
                ...state, 
                faqs: [...state.faqs, action.payload]
            }
        case FAQS_ADD_FAIL: 
            return {
                error: action.payload
            }
        case FAQ_DELETE_SUCCESS: {
            return {
                ...state, 
                faqs: state.faqs.filter(item => item._id !== action.payload._id)
            }
        }
        case FAQ_DELETE_FAIL: {
            return {
                error: action.payload
            }
        }
        case FAQ_UPDATE_SUCCESS: {

            const tempFaqs = JSON.parse(JSON.stringify(state.faqs));
            tempFaqs.forEach(item => {
                if(item._id === action.payload.id){
                    item = action.payload.updatedFaq
                }
            })

            return {
                ...state, 
                faqs: tempFaqs
            }
        }
        case FAQ_UPDATE_FAIL: {
            return {
                error: action.payload
            }
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