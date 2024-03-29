import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_FAIL,      
    USER_REGISTER_SUCCESS,      
    USER_REGISTER_REQUEST,      
    USER_DETAILS_FAIL,      
    USER_DETAILS_SUCCESS,      
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_MY_ORDERS_FAIL,
    USER_MY_ORDERS_REQUEST,
    USER_MY_ORDERS_SUCCESS,
    USER_MY_ORDERS_RESET,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DETAILS_ADMIN_REQUEST,
    USER_DETAILS_ADMIN_SUCCESS,
    USER_DETAILS_ADMIN_FAIL,
    USER_UPDATE_RESET,
    PRODUCT_LIST_ADMIN_REQUEST,
    PRODUCT_LIST_ADMIN_SUCCESS,
    PRODUCT_LIST_ADMIN_FAIL,
    PRODUCT_DETAILS_ADMIN_REQUEST,
    PRODUCT_DETAILS_ADMIN_SUCCESS,
    PRODUCT_DETAILS_ADMIN_FAIL,
    ADMIN_PRODUCT_UPDATE_REQUEST,
    ADMIN_PRODUCT_UPDATE_SUCCESS,
    ADMIN_PRODUCT_UPDATE_FAIL,
    ADMIN_PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_RESET,
    ORDER_LIST_ADMIN_REQUEST,
    ORDER_LIST_ADMIN_SUCCESS,
    ORDER_LIST_ADMIN_FAIL,
    ORDER_DETAILS_ADMIN_REQUEST,
    ORDER_DETAILS_ADMIN_SUCCESS,
    ORDER_DETAILS_ADMIN_FAIL,
    ORDER_DETAILS_ADMIN_UPDATE_REQUEST,
    ORDER_DETAILS_ADMIN_UPDATE_SUCCESS,
    ORDER_DETAILS_ADMIN_UPDATE_FAIL,
    ADMIN_ORDER_UPDATE_REQUEST,
    ADMIN_ORDER_UPDATE_SUCCESS,
    ADMIN_ORDER_UPDATE_FAIL,
    ADMIN_ORDER_UPDATE_RESET
} from '../constants/userConstants.js'

export const userLoginReducer = (state = { }, action ) => {
    switch (action.type){
        case USER_LOGIN_REQUEST:
            return { loading:true }
        case USER_LOGIN_SUCCESS:
            return { loading:false, userInfo : action.payload }
        case USER_LOGIN_FAIL:
            return { loading:false, error : action.payload }
        case USER_LOGOUT:
            return { }
        default:
        return state
    }
}

export const userRegisterReducer = (state = { }, action ) => {
    switch (action.type){
        case USER_REGISTER_REQUEST:
            return { loading:true }
        case USER_REGISTER_SUCCESS:
            return { loading:false, userInfo : action.payload }
        case USER_REGISTER_FAIL:
            return { loading:false, error : action.payload }
        default:
        return state
    }
}

export const userDetailsReducer = (state = { user: { } }, action ) => {
    switch (action.type){
        case USER_DETAILS_REQUEST:
            return { ...state, loading:true }
        case USER_DETAILS_SUCCESS:
            return { loading:false, user : action.payload }
        case USER_DETAILS_FAIL:
            return { loading:false, error : action.payload }
        case USER_DETAILS_RESET:
            return { user:{} }
        default:
        return state
    }
}

export const userUpdateProfileReducer = (state = {  }, action ) => {
    switch (action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading:true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading:false, success:true, userInfo : action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading:false, error : action.payload }
        case USER_UPDATE_PROFILE_RESET:
            return {}
        default:
        return state
    }
}

export const userMyOrdersReducer = (state ={ userOrders:[] }, action) => {
    switch(action.type){
        case USER_MY_ORDERS_REQUEST:
            return {
                loading:true
            }
        case USER_MY_ORDERS_SUCCESS:
            return {
                loading:false,
                userOrders : action.payload
            }
        case USER_MY_ORDERS_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        case USER_MY_ORDERS_RESET:
            return { userOrders:[] }
        default:
            return state
    }
}

export const userListReducer = (state = { users:[] } ,action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
            return {
                loading:true
            }
        case USER_LIST_SUCCESS:
            return{
                loading:false,
                users:action.payload.users,
                page:action.payload.page,
                pages:action.payload.pages,
                success:true
            }
        case USER_LIST_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case USER_LIST_RESET:
            return { users:[ ] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = { },action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {
                loading:true,
            }
        case USER_DELETE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case USER_DELETE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user:{} },action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return {
                loading:true
            }
        case USER_UPDATE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case USER_UPDATE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case USER_UPDATE_RESET:
            return{ 
                user:{}
            }
        default:
            return state
    }
}

export const userDetailsByAdminReducer = (state = { user: { } }, action ) => {
    switch (action.type){
        case USER_DETAILS_ADMIN_REQUEST:
            return { ...state, loading:true }
        case USER_DETAILS_ADMIN_SUCCESS:
            return { loading:false, user : action.payload }
        case USER_DETAILS_ADMIN_FAIL:
            return { loading:false, error : action.payload }
        default:
        return state
    }
}

export const adminProductListReducer = (state ={ products : [] }, action ) => {
    switch(action.type){
        case PRODUCT_LIST_ADMIN_REQUEST:
            return { loading: true, products : []}
        case PRODUCT_LIST_ADMIN_SUCCESS:
            return { loading:false, products : action.payload.products, page:action.payload.page, pages:action.payload.pages}
        case PRODUCT_LIST_ADMIN_FAIL:
            return { loading:false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsByAdminReducer = (state = { product: {} }, action ) => {
    switch (action.type){
        case PRODUCT_DETAILS_ADMIN_REQUEST:
            return { ...state, loading:true }
        case PRODUCT_DETAILS_ADMIN_SUCCESS:
            return { loading:false, product : action.payload }
        case PRODUCT_DETAILS_ADMIN_FAIL:
            return { loading:false, error : action.payload }
        default:
        return state
    }
}

export const productUpdateReducer = (state = { product:{} },action) => {
    switch(action.type){
        case ADMIN_PRODUCT_UPDATE_REQUEST:
            return {
                loading:true
            }
        case ADMIN_PRODUCT_UPDATE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case ADMIN_PRODUCT_UPDATE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case ADMIN_PRODUCT_UPDATE_RESET:
            return{ 
                product:{}
            }
        default:
            return state
    }
}

export const productDeleteReducer = (state = { }, action) => {
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return { 
                loading:true 
            }
        case PRODUCT_DELETE_SUCCESS:
            return { 
                loading:false,
                success:true
            }
        case PRODUCT_DELETE_FAIL:
            return{
                loading:false, 
                error : action.payload
            }
        default:
            return state
    }  
}

export const createProductReducer = (state = { }, action ) => {
    switch (action.type){
        case PRODUCT_ADD_REQUEST:
            return { 
                loading:true 
            }
        case PRODUCT_ADD_SUCCESS:
            return { 
                loading:false,
                success:true, 
                product : action.payload 
            }
        case PRODUCT_ADD_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        case PRODUCT_ADD_RESET:
            return { }
        default:
            return state
    }
}

export const adminOrderListReducer = (state ={ orders : [] }, action ) => {
    switch(action.type){
        case ORDER_LIST_ADMIN_REQUEST:
            return { loading: true, orders : []}
        case ORDER_LIST_ADMIN_SUCCESS:
            return { loading:false, orders : action.payload.orders, page:action.payload.page, pages: action.payload.pages}
        case ORDER_LIST_ADMIN_FAIL:
            return { loading:false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailsByAdminReducer = (state = { order: [] }, action ) => {
    switch (action.type){
        case ORDER_DETAILS_ADMIN_REQUEST:
            return {
                loading:true 
            }
        case ORDER_DETAILS_ADMIN_SUCCESS:
            return { 
                loading:false, 
                order: action.payload 
            }
        case ORDER_DETAILS_ADMIN_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        default:
            return state
    }
}

export const orderDetailsByAdminUpdateReducer = (state = { order: { } }, action ) => {
    switch (action.type){
        case ORDER_DETAILS_ADMIN_UPDATE_REQUEST:
            return {
                loading:true 
            }
        case ORDER_DETAILS_ADMIN_UPDATE_SUCCESS:
            return { 
                loading:false, 
                order: action.payload 
            }
        case ORDER_DETAILS_ADMIN_UPDATE_FAIL:
            return { 
                loading:false, 
                error : action.payload 
            }
        default:
            return state
    }
}

export const orderUpdateReducer = (state = { order:{} },action) => {
    switch(action.type){
        case ADMIN_ORDER_UPDATE_REQUEST:
            return {
                loading:true
            }
        case ADMIN_ORDER_UPDATE_SUCCESS:
            return{
                loading:false,
                success:true
            }
        case ADMIN_ORDER_UPDATE_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case ADMIN_ORDER_UPDATE_RESET:
            return{
                order:{ } 
            }
        default:
            return state
    }
}