import React from 'react';
import Axios from 'axios';

const initialState = {
    isLogin : false,
    token : ""
}

export const store = createStore(initialState)