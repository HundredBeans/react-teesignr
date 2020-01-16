import React from "react";
import axios from "axios";
import createStore from "unistore";

const initialState = {
    isLogin: false, //bisa dipindah ke localstorage
    token: "", //bisa dipindah ke localstorage
    baseUrl: "http://0.0.0.0:5000",
    // State login dan signup
    emailInput: "",
    passwordInput: "",
    daftarFullName: "",
    daftarEmail: "",
    daftarUsername: "",
    daftarPassword: "",
    // State quote
    quote: "",
    quoteAuthor: "",
    isLoadingQuote: true,
    // State user info
    namaUserLogin: "", //bisa dipindah ke localstorage
    inputNamaToko: "",
    inputDeskripsiToko: "",
    punyaToko: "", //bisa dipindah ke localstorage
    infoToko: "",
    listTransaksi: [],
    userFullName: "",
    userEmail: "",
    transaksiId: "",
    editStatus: false,
    // State dari page jual
    jualNamaProduk: "",
    jualKeuntungan: "",
    jualJenisBahan: "",
    jualDesignUrl: "",
    jualDeskripsi: "",
    // State search
    searchKeyword: "",
    listBarangSearch: [],
    listTokoSearch: [],
    isLoadingSearch: true,
    pageBarang: 1,
    // State detail
    detailNamaProduk: "",
    detailNamaToko: "",
    detailUrlGambar: "",
    detailHargaProduk: "",
    detailProdukTerjual: "",
    detailDeskripsiProduk: "",
    detailTokoId: "",
    detailFound: "",
    // State filter
    hargaMin: "0",
    hargaMax: "999999999999999999",
    urutanBerdasarkan: "id",
    urutan: "asc",
    // State beli
    beliUkuran: "",
    beliJumlah: "",
    // State checkout
    listCheckout: [],
    totalHargaCheckout: "",
    isLoadingCheckout: true,
    checkoutNama: "",
    checkoutTelepon: "",
    checkoutAlamat: "",
    checkoutPembayaran: "",
    detailPembayaran: {},
    // State keranjang
    listKeranjang: [],
    listIdKerangjang: [],
    // State Toko
    tokoNama: "",
    tokoDeskripsi: "",
    tokoPopularitas: "",
    tokoListBarang: [],
    isLoadingToko: true,
    pageToko: 1,
    // State edit password
    inputPassLama: "",
    inputPassBaru: "",
    // State search toko
    searchTokoKeyword: "",
    urutanTokoBerdasarkan: "popularitas",
    urutanToko: "desc",
    pageListToko: ""
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
                punyaToko: response.data.info_user.designer_status,
                infoToko: response.data.info_toko,
                listTransaksi: response.data.riwayat_transaksi.reverse(), // Diurutkan dari yang terbaru
                userFullName: response.data.info_user.full_name,
                userEmail: response.data.info_user.email
            });
        });
    },
    // validate email
    validateEmail: (state, email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log("store, " + email);
        console.log(re.test(email));
        return re.test(email);
    },
    handleFilter: () => {
        console.log("klik");
        store.setState({ isLoadingSearch: true });
        const data = {
            harga_minimal: initialState.hargaMin,
            harga_maksimal: initialState.hargaMax,
            orderby: initialState.urutanBerdasarkan,
            sort: initialState.urutan
        };
        const req = {
            method: "get",
            url:
                initialState.baseUrl +
                `/baju?harga_minimal=${data.harga_minimal}&harga_maksimal=${data.harga_maksimal}&orderby=${data.orderby}&sort=${data.sort}`
        };
        axios(req).then(function(response) {
            store.setState({
                listBarangSearch: response.data,
                isLoadingSearch: false
            });
            console.log(response.data);
        });
    }
});
