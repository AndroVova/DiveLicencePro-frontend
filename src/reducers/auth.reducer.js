import {createAction, createReducer} from "@reduxjs/toolkit";

const storageName = 'auth'

let data = JSON.parse(localStorage.getItem(storageName))

if (data && Date.now() > data.tokenExpirationTime) {
    data = null
}

const initialState = {
    user: data?.user,
    tokenValue: data?.tokenValue
}

export const login = createAction("LOGIN",(profile, token) => {
    return {
        payload: {
            user : profile,
            tokenValue : token
        },
    }
})
export const logout = createAction("LOGOUT")

export const changeProfile = createAction("CHANGE_PROFILE",(d) => {
    return {
        payload: {
            user : d
        },
    }
})

export const updateUserImage = createAction("UPDATE_USER_IMAGE",(imageUrl) => {
    return {
        payload: imageUrl,
    }
})

export default createReducer(initialState,{
    [login]: (state,action) =>{
        state.user = action.payload.user
        state.tokenValue = action.payload.tokenValue

        if(action.payload){
            localStorage.setItem(storageName, JSON.stringify(state))
        }
    },
    [logout]: (state) =>{
        state.user = null
        state.tokenValue = null
        localStorage.setItem(storageName, null)
    },
    [changeProfile]: (state,action) =>{
        state.user = {...state.user,...action.payload.user}

        if(action.payload){
            localStorage.setItem(storageName, JSON.stringify(state))
        }
    },
    [updateUserImage]: (state,action) =>{
        if(state.user) {
            state.user.image = action.payload
        }
        if(action.payload){
            localStorage.setItem(storageName, JSON.stringify(state))
        }
    },
})