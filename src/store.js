import React from "react";
import axios from "axios";
import createStore from "unistore";

const initialState = {
    isLogin: false,
    token: "",
    baseUrl: "http://0.0.0.0:5000",
    emailInput: "",
    passwordInput: "",
    daftarFullName: "",
    daftarEmail: "",
    daftarUsername: "",
    daftarPassword: "",
    quote: "",
    quoteAuthor: "",
    isLoadingQuote: true,
    namaUserLogin: "",
    namaUsernameLogin: "",
    inputNamaToko: "",
    inputDeskripsiToko: "",
    punyaToko: false
};

export const store = createStore(initialState);

export const actions = store => ({
    handleInput: (state, event) => {
        store.setState({ [event.target.name]: event.target.value });
    },
    getRandomQuote: state => {
        axios.get("https://api.quotable.io/random").then(function(response) {
            store.setState({
                quote: response.data.content,
                quoteAuthor: response.data.author,
                isLoadingQuote: false
            });
        });
    },
    getUserInfo: (state, token) => {
        const req = {
            method: "get",
            url: initialState.baseUrl + "/user",
            headers: {
                Authorization: "Bearer " + token
            }
        };
        console.log(initialState.token);
        axios(req).then(function(response) {
            console.log(response.data);
            store.setState({
                namaUserLogin: response.data.info_user.username,
                punyaToko: response.data.info_user.designer_status
            });
        });
    },
    // validate email
    validateEmail: (state, email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("store, " + email);
        console.log(re.test(email));
        return re.test(email);
    }
});
