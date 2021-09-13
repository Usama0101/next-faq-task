import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import { toast } from 'react-toastify';
import { 
    ALL_FAQS_FAIL,
    ALL_FAQS_SUCCESS,
    CLEAR_ERRORS,
    FAQS_ADD_FAIL,
    FAQS_ADD_SUCCESS,
    FAQ_DELETE_FAIL,
    FAQ_DELETE_SUCCESS,
    FAQ_UPDATE_SUCCESS,
    FAQ_UPDATE_FAIL
} from '../constants/faqConstants'

// Get All FAQ's
export const getFaqs = (req) => async(dispatch) => {
    try {
        const { origin } = absoluteUrl(req);
        
        const { data } = await axios.get(`${origin}/api/faqs`);
        
        dispatch({
            type: ALL_FAQS_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
            type: ALL_FAQS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addFaqs = (faq) => async(dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
      
        const { data } = await axios.post(`/api/faqs`, faq, config);

        dispatch({
            type: FAQS_ADD_SUCCESS,
            payload: data.faq
        })

        toast.success("FAQ Added !");
    }catch (error){
        dispatch({
            type: FAQS_ADD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteFaqs = (faq) => async(dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
      
        const { data } = await axios.delete(`/api/faqs/${faq._id}`, config);

        dispatch({
            type: FAQ_DELETE_SUCCESS,
            payload: faq
        })

        toast.success("FAQ Deleted !");
    }catch (error){
        dispatch({
            type: FAQ_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update FAQ
export const updateFaqs = (faq, id) => async(dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
      
        const { data } = await axios.put(`/api/faqs/${id}`, faq,config);

        dispatch({
            type: FAQ_UPDATE_SUCCESS,
            payload: data.faq
        })

        toast.success("FAQ Updated !");
    }catch (error){
        dispatch({
            type: FAQ_UPDATE_FAIL,
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