import axios from "axios"
import { USER_DETAILS_FAIL, 
         USER_DETAILS_REQUEST, 
         USER_DETAILS_SUCCESS, 
         USER_LOGIN_FAIL, 
         USER_LOGIN_REQUEST, 
         USER_LOGIN_SUCCESS, 
         USER_LOGOUT, 
         USER_REGISTER_FAIL, 
         USER_REGISTER_REQUEST, 
         USER_REGISTER_SUCCESS, 
         USER_UPDATE_PROFILE_FAIL, 
         USER_UPDATE_PROFILE_REQUEST,
         USER_UPDATE_PROFILE_SUCCESS,
        USER_MY_ORDERS_FAIL,
        USER_MY_ORDERS_REQUEST,
        USER_MY_ORDERS_SUCCESS,
        USER_DETAILS_RESET,
        USER_MY_ORDERS_RESET,
        USER_LIST_FAIL,
        USER_LIST_REQUEST,
        USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_DETAILS_ADMIN_REQUEST,
    USER_DETAILS_ADMIN_SUCCESS,
    USER_DETAILS_ADMIN_FAIL,
    PRODUCT_LIST_ADMIN_REQUEST,
    PRODUCT_LIST_ADMIN_SUCCESS,
    PRODUCT_LIST_ADMIN_FAIL,
    ADMIN_PRODUCT_UPDATE_REQUEST,
    ADMIN_PRODUCT_UPDATE_SUCCESS,
    ADMIN_PRODUCT_UPDATE_FAIL,
    PRODUCT_DETAILS_ADMIN_REQUEST,
    PRODUCT_DETAILS_ADMIN_SUCCESS,
    PRODUCT_DETAILS_ADMIN_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_DETAILS_ADMIN_REQUEST,
    ORDER_DETAILS_ADMIN_SUCCESS,
    ORDER_DETAILS_ADMIN_FAIL,
    ADMIN_ORDER_UPDATE_REQUEST,
    ADMIN_ORDER_UPDATE_SUCCESS,
    ADMIN_ORDER_UPDATE_FAIL,
    ORDER_DETAILS_ADMIN_UPDATE_REQUEST,
    ORDER_DETAILS_ADMIN_UPDATE_SUCCESS,
    ORDER_DETAILS_ADMIN_UPDATE_FAIL
} from "../constants/userConstants"

import { PRODUCT_DETAILS_SUCCESS } from '../constants/productConstants'

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const { data } = await axios.post('/api/users', {name, email, password}, config)
    
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', {email,password}, config)
    
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/users/profile', user, config)
    
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:USER_MY_ORDERS_RESET})
    dispatch({type:USER_LIST_RESET})
}

export const userMyOrders = () => async (dispatch,getState) => {
    try {
        dispatch({
            type:USER_MY_ORDERS_REQUEST,
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/users/profile/orders',config)

        dispatch({
            type:USER_MY_ORDERS_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:USER_MY_ORDERS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const usersList = (pageNumber=' ') => async(dispatch,getState) => {
    try {
        dispatch({
            type:USER_LIST_REQUEST
        })

        const { userLogin:{ userInfo } } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.get(`/api/admin/users/page/${pageNumber}`,config)
            dispatch({
                type:USER_LIST_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error("Not authorized")
        }
        
    } catch (error) {
        dispatch({
            type:USER_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminDeleteUser = (id) => async (dispatch,getState) => {
    try{
        dispatch({
            type:USER_DELETE_REQUEST
        })

        const {userLogin : {userInfo} } = getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.delete(`/api/admin/deleteuser/${id}`,config)
            dispatch({
                type:USER_DELETE_SUCCESS
            })
        }
        else{
            throw new Error("Not authorized")
        }

    }
    catch(error){
        dispatch({
            type:USER_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUpdateUser = (user) => async(dispatch,getState) => {
    try {
        dispatch({
            type:USER_UPDATE_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        } 

        if(userInfo.isAdmin){
            const { data } = await axios.put(`/api/admin/user/${user._id}/edit`,user,config)

            dispatch({
                type:USER_UPDATE_SUCCESS,
            })

            dispatch({
                type:USER_DETAILS_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error('Not authorized')
        }
        
    } catch (error) {
        dispatch({
            type:USER_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetailsByAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_ADMIN_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/user/${id}`, config)

        dispatch({
            type:USER_DETAILS_ADMIN_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listProductsByAdmin = (pageNumber=' ') => async (dispatch, getState) => {
    try {
        dispatch({ 
            type:PRODUCT_LIST_ADMIN_REQUEST 
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.get(`/api/admin/products/page/${pageNumber}`,config)
            dispatch({ 
                type:PRODUCT_LIST_ADMIN_SUCCESS, 
                payload: data
            })
        }
        else{
            throw new Error("Not Authorized")
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUpdateProduct = (product) => async(dispatch,getState) => {
    try {
        dispatch({
            type:ADMIN_PRODUCT_UPDATE_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        } 

        if(userInfo.isAdmin){
            const { data } = await axios.put(`/api/admin/product/${product._id}/edit`,product,config)

            dispatch({
                type:ADMIN_PRODUCT_UPDATE_SUCCESS,
            })

            dispatch({
                type:PRODUCT_DETAILS_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error('Not authorized')
        }
        
    } catch (error) {
        dispatch({
            type:ADMIN_PRODUCT_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getProductDetailsByAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_ADMIN_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/product/${id}`, config)

        dispatch({
            type:PRODUCT_DETAILS_ADMIN_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProductByAdmin = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })

        const { userLogin : {userInfo} } = getState()

        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.delete(`/api/admin/deleteproduct/${id}`,config)

            dispatch({
                type:PRODUCT_DELETE_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error("Not authorized")
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const addProduct = (name, category, price, countInStock, description, publisher, image) => async (dispatch,getState) => {
    try {
        dispatch({
            type: PRODUCT_ADD_REQUEST
        })

        const { userLogin : {userInfo} } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            
            const { data } = await axios.post('/api/admin/addproduct', {name, category, price, countInStock, description, publisher, image}, config)

            dispatch({
                type:PRODUCT_ADD_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error("Not Authorized")
        }
    } catch (error) {
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listOrdersByAdmin = (pageNumber=' ') => async (dispatch, getState) => {
    try {
        dispatch({ 
            type:ORDER_LIST_ADMIN_REQUEST 
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.get(`/api/admin/orders/page/${pageNumber}`,config)
            dispatch({ 
                type:ORDER_LIST_ADMIN_SUCCESS, 
                payload: data
            })
        }
        else{
            throw new Error("Not Authorized")
        }
    } catch (error) {
        dispatch({
            type: ORDER_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetailsByAdmin = (id, nameUrl) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_ADMIN_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.get(`/api/admin/view/order/${id}/${nameUrl}`, config)
    
            dispatch({
                type:ORDER_DETAILS_ADMIN_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error("Not authorized")
        }

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetailsByAdminForUpdate = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_ADMIN_UPDATE_REQUEST
        })

        const { userLogin : { userInfo } } = getState()

        const config = {
            headers:{
                'Content-type':'application/json',
                 Authorization : `Bearer ${userInfo.token}`
            }
        }

        if(userInfo.isAdmin){
            const { data } = await axios.get(`/api/admin/order/${id}`, config)
    
            dispatch({
                type:ORDER_DETAILS_ADMIN_UPDATE_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error("Not authorized")
        }

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_ADMIN_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const adminUpdateOrder = (order) => async(dispatch,getState) => {
    try {
        dispatch({
            type:ADMIN_ORDER_UPDATE_REQUEST
        })

        const { userLogin:{userInfo} } = getState()

        const config = {
            headers:{
                'content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        } 

        if(userInfo.isAdmin){
            const { data } = await axios.put(`/api/admin/order/${order._id}/edit`,order,config)

            dispatch({
                type:ADMIN_ORDER_UPDATE_SUCCESS,
            })

            dispatch({
                type:ORDER_DETAILS_ADMIN_UPDATE_SUCCESS,
                payload:data
            })
        }
        else{
            throw new Error('Not authorized')
        }
        
    } catch (error) {
        dispatch({
            type:ADMIN_ORDER_UPDATE_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}