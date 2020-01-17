import React from 'react';
import { Provider } from 'unistore/react';
import MainRoute from './routes/mainRoute';
import { store } from './store';
import './style/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainRoute />
      </Provider>
    </div>
  );
}

export default App;
