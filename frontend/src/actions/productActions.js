import { 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_REVIEW_FAIL, 
    TOP_PRODUCT_LIST_REQUEST,
    TOP_PRODUCT_LIST_SUCCESS,
    TOP_PRODUCT_LIST_FAIL
} from '../constants/productConstants.js'
import axios from 'axios'

const apiBaseUrl = "https://bookfullstack.onrender.com";

export const listProducts = (keyword=' ', pageNumber=' ') => async (dispatch) => {
    try {
        dispatch({ type:PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`${apiBaseUrl}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        
        dispatch({ 
            type:PRODUCT_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type:PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`${apiBaseUrl}/api/products/${id}`)
        
        dispatch({ 
            type:PRODUCT_DETAILS_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addReviewProduct = (id, review) => async (dispatch,getState) => {
    try{    
        dispatch({ 
            type:PRODUCT_REVIEW_REQUEST
        })

        const { userLogin : {userInfo} } = getState()

        if(userInfo){
            const config={
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post(`${apiBaseUrl}/api/products/${id}/review`,review,config)

            dispatch({
                type:PRODUCT_REVIEW_SUCCESS
            })

            dispatch({
                type:PRODUCT_DETAILS_SUCCESS,
                payload: data
            })
        }
        else{
            throw new Error("Not logged in")
        }
    }
    catch(error){
        dispatch({
            type:PRODUCT_REVIEW_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type:TOP_PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`${apiBaseUrl}/api/products/top`)
        
        dispatch({ 
            type:TOP_PRODUCT_LIST_SUCCESS, 
            payload: data
        })
    } catch (error) {
        dispatch({
            type: TOP_PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}