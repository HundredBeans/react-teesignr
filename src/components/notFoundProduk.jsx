import React from 'react';
// import not found css
import '../style/nomatch.css';

const NotFoundProduct = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
        </div>
        <h2 style={{ color: 'white' }}>404 - Page not found</h2>
        <p style={{ color: 'white' }}>
          Baju yang kamu cari tidak ada. Kamu bisa cari menggunakan fitur search
          di bagian atas <i>page</i> ini terlebih dahulu untuk cek ada atau
          tidaknya barang yang kamu cari.
        </p>
      </div>
    </div>
  );
};

export default NotFoundProduct;
