import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "../pages/Login";
import NotFound from "../pages/404";
import Shell from "../pages/shell";
import Client from "../pages/client";

const Router = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shell" element={<Shell />} />
                <Route path="/client" element={<Client />} />
                {/* 404 Not Found page */}
                <Route element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
                <Route path='' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
