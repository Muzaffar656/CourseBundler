import {createReducer} from '@reduxjs/toolkit'


export const userReducer = createReducer( {
  loading: false,              
  isAuthenticate: false,
  user: null,
},
    
    {
        loginRequest:state =>{
          
            state.loading = true

        },
        
        loginSuccess:(state,action) =>{
            state.loading = false
            state.isAuthenticate = true
            state.user = action.payload.user
            state.message=action.payload.message
        },
        
        loginFail:(state,action) =>{
            state.loading = false
            state.isAuthenticate = false
            state.error = action.payload
        },
        registerRequest:state =>{
            state.loading = true
            
        },
        
        registerSuccess:(state,action) =>{
            state.loading = false
            state.isAuthenticate = true
            state.user = action.payload.user
            state.message= action.payload.message
        },
        
        registerFail:(state,action) =>{
            state.loading = false
            state.isAuthenticate = false
            state.error = action.payload
        },
        logoutRequest:state =>{
            state.loading = true
            
        },
        
        logoutSuccess:(state,action) =>{
            state.loading = false
            state.isAuthenticate = false
            state.user = null
            state.message=action.payload
        },
        
        logoutFail:(state,action) =>{
            state.loading = false
            state.isAuthenticate = true
            state.error = action.payload
        },
   
        loadUserRequest:(state )=>{
            state.loading = true
            
        },
        
        loadUserSuccess:(state,action) =>{
            state.loading = false
            state.isAuthenticate = true
            state.user = action.payload
        },
        
        loadUserFail:(state,action) =>{
            state.loading = false
            state.isAuthenticate = false
            state.error = action.payload
        },
        clearError:(state)=>{
            state.error = null
    },
    clearMessage:(state)=>{
        state.message = null
    }
           
    },)

export const updateProfileReducer = createReducer({},
    {
    updateProfileRequest:state=>{
        state.loading = true
    },
    updateProfileSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    updateProfileFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    changePasswordRequest:state=>{
        state.loading = true
    },
    changePasswordSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    changePasswordFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    updateProfilePictureRequest:state=>{
        state.loading = true
    },
    updateProfilePictureSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    updateProfilePictureFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    forgetPasswordRequest:state=>{
        state.loading = true
    },
    forgetPasswordSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    forgetPasswordFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    resetPasswordRequest:state=>{
        state.loading = true
    },
    resetPasswordSuccess:(state,action)=>{
        state.loading = false
        state.message = action.payload
    },
    resetPasswordFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    clearError:(state)=>{
        state.error = null
},
clearMessage:(state)=>{
    state.message = null
}


},)


export const subscriptionReducer = createReducer({},{
    buySubscriptionRequest:(state,action)=>{
        state.loading = true
    },
    buySubscriptionSuccess:(state,action)=>{
        state.loading = false
        state.sessionID  = action.payload
        state.subMessage = 'Payment Done'
    },
    buySubscriptionFail:(state,action)=>{
        state.loading = false
        state.error = action.payload
    },
    cancelSubscriptionRequest:(state,action)=>{
        state.loading=true
    },
    cancelSubscriptionSuccess:(state,action)=>{
    
        state.loading=false
        state.subMessage=action.payload
    },
    cancelSubscriptionFail:(state,action)=>{
        state.loading=false
        state.error = action.payload
    },
    clearError:(state)=>{
        state.error = null
    },
    clearMessage:(state)=>{
        state.message = null
    }
})