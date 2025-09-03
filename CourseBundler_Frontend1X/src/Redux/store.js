import {configureStore} from '@reduxjs/toolkit'
import { subscriptionReducer, updateProfileReducer, userReducer } from './reducers/userReducer'
import { courseReducer } from './reducers/courseReducer'
import {otherReducer} from './reducers/otherReducer'
import { adminReducer } from './reducers/adminReducer'
const store = configureStore({
    reducer:{
        user : userReducer,
        profile : updateProfileReducer,
        courses : courseReducer,
        subscription:subscriptionReducer,
        other:otherReducer,
        admin:adminReducer
        

    },
    
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store

export const server =  'https://coursebundler-b4kw.onrender.com/api/v1'
// export const server = 'http://localhost:7000/api/v1'
