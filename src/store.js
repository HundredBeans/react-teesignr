import React from "react";
import axios from "axios";
import createStore from "unistore";

const initialState = {
    isLogin: false, //bisa dipindah ke localstorage
    token: "", //bisa dipindah ke localstorage
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
    namaUserLogin: "", //bisa dipindah ke localstorage
    inputNamaToko: "",
    inputDeskripsiToko: "",
    punyaToko: "", //bisa dipindah ke localstorage
    jualNamaProduk: "",
    jualKeuntungan: "",
    jualJenisBahan: "",
    jualDesignUrl: "",
    jualDeskripsi: "",
    searchKeyword: "",
    listBarangSearch: [],
    isLoadingSearch: true
};

export const store = createStore(initialState);

export const actions = store => ({
    handleInput: (state, event) => {
        store.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value);
        console.log(event.target.name);
        console.log(initialState.searchKeyword);
        console.log(initialState.emailInput);
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
        console.log(token);
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
