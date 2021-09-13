import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import { 
    FAQ_DETAILS_SUCCESS,
    FAQ_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/faqConstants'

// Get Rooms Details
export const getFAQDetails = (req, id) => async(dispatch) => {
    try {

        const { origin } = absoluteUrl(req);
        
        const { data } = await axios.get(`${origin}/api/faqs/${id}`);
        
        dispatch({
            type: FAQ_DETAILS_SUCCESS,
            payload: data.faq
        })
    }catch (error){
        dispatch({
            type: FAQ_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}