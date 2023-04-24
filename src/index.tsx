import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import GlobalStyles from './assets/styles/global.styles'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App/>
        <GlobalStyles/>
    </React.StrictMode>
);
