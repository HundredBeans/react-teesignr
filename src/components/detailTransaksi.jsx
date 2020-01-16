import React from "react";

function DetailTransaksi(
    idPesanan,
    namaProduk,
    hargaBarang,
    ukuran,
    jumlah,
    tanggalPemesanan
) {
    return (
        <div
            class="card"
            style={{
                backgroundColor: "#F7F7F7"
            }}
        >
            <div class="card-header text-center">
                Copyright &copy; 2020 TEESIGNR.
            </div>
            <div class="card-body text-center border-bottom py-auto">
                <div className="row">
                    <h4 class="card-title mx-auto">
                        <b>RIWAYAT TRANSAKSI</b>
                    </h4>
                </div>
            </div>
            <div className="container">
                <div className="row py-3 border-bottom">
                    <div className="col-md-12 text-center">
                        <h5>DETAIL TRANSAKSI</h5>
                    </div>
                </div>
                <div className="container">
                    <div className="row py-3">
                        <div className="col-lg-5 col-sm-6">
                            <span>Nomor Pemesanan</span>
                        </div>
                        <div className="col-lg-7 col-sm-6">
                            <span>: {idPesanan}</span>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col-lg-5 col-sm-6">
                            <span>Nama Produk</span>
                        </div>
                        <div className="col-lg-7 col-sm-6">
                            <span>: {namaProduk}</span>
                        </div>
                    </div>
                    <div className="row py-3 border-top">
                        <div className="col-lg-5 col-sm-6">
                            <span>Total Harga</span>
                        </div>
                        <div className="col-lg-7 col-sm-6">
                            <span>: {hargaBarang}</span>
                        </div>
                    </div>
                    <div className="row py-3 border-top">
                        <div className="col-lg-5 col-sm-6">
                            <span>Ukuran</span>
                        </div>
                        <div className="col-lg-7 col-sm-6">
                            <span>: {ukuran}</span>
                        </div>
                    </div>
                    <div className="row py-3 border-top">
                        <div className="col-lg-5 col-sm-6">
                            <span>Jumlah</span>
                        </div>
                        <div className="col-lg-7 col-sm-6">
                            <span>: {jumlah}</span>
                        </div>
                    </div>
                    <div className="row py-3 border-top">
                        <div className="col-lg-5 col-sm-6">
                            <span>Tanggal Pemesanan</span>
                        </div>
                        <div className="col-lg-7 col-sm-6">
                            <span>: {tanggalPemesanan}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailTransaksi;
