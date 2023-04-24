import React from 'react';
import logo from './assets/icons/logo.svg';
import {SApp, SHeader, SLink, SLogo} from "./assets/styles/app.styles";

function App() {
    return (
        <SApp>
            <SHeader>
                <SLogo src={logo} alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <SLink
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </SLink>
            </SHeader>
        </SApp>
    );
}

export default App;
