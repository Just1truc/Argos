import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Login from "../pages/Login";
import NotFound from "../pages/404";
import Shell from "../pages/shell";
import Client from "../pages/client";
import { decodeToken, isExpired } from 'react-jwt';

const Router = (): JSX.Element => {

    const [connected, setConnected] = useState(false);

    const getItem = () : string | null | undefined => {
        let token = localStorage.getItem("user_token");
        if (!(token === undefined)) {
            let decoded = decodeToken(String(token));
            let isexpired = isExpired(String(token));
            if (isexpired === true || decoded === undefined) {
                return undefined;
            } else {
                return token;
            }
        }
        return token;
    }

    const setUp = () : boolean => {
        return (!(getItem() === undefined) || connected === true)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={(setUp() === true) ? 
                    <Navigate to="/clients"/>
                    :
                    <Login setConnection={() => setConnected(true)} />} />
                <Route path="/shell" element={<Shell />} />
                <Route path="/clients" element={(setUp() === true) ?
                    <Client />
                    :
                    <Navigate to='/login'/>} />
                {/* 404 Not Found page */}
                <Route element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
                <Route path='' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
