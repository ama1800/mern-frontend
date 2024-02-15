import {combineReducers} from "redux"
import authReducer from "./authReducer"
import cartReducer from "./cartRducer"

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
})

export default rootReducer;