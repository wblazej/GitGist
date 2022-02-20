import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/index.css'
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
    <React.StrictMode>
        <App />
        <Toaster position='bottom-center' toastOptions={{
            style: {
                backgroundColor: '#23272d',
                border: '1px solid #464c55',
                color: '#fff'
            }
        }} />
    </React.StrictMode>,
    document.getElementById('root')
);
