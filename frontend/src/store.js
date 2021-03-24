import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, ordeRDetailsReducer, orderPayReducer } from './reducers/orderReducers';
import { userLoginReducer, 
        userRegisterReducer, 
        userDetailsReducer, 
        userUpdateProfileReducer, 
        userMyOrdersReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,
        userDetailsByAdminReducer,
        adminProductListReducer,
        productDetailsByAdminReducer,
        productUpdateReducer,
        productDeleteReducer,
        createProductReducer,
        adminOrderListReducer
    } from './reducers/userReducers';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer, 
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userOrder : userMyOrdersReducer,
    
    userUpdate : userUpdateReducer,
    deleteUser : userDeleteReducer,
    listUser : userListReducer,
    userDetailsByAdmin : userDetailsByAdminReducer,
    productListByAdmin : adminProductListReducer,
    productDetailsByAdmin : productDetailsByAdminReducer,
    productUpdate : productUpdateReducer, 
    deleteProduct : productDeleteReducer,
    createProduct : createProductReducer,
    orderList : adminOrderListReducer,
    
    orderCreate : orderCreateReducer,
    orderDetails : ordeRDetailsReducer,
    orderPay : orderPayReducer
 })

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfosFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null

const initialState = {
    cart : { cartItems:cartItemsFromStorage, shippingAddress:shippingAddressFromStorage, paymentMethod:paymentMethodFromStorage  },
    userLogin : { userInfo : userInfosFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 

export default store