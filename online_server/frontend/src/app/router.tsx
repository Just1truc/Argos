import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from "../pages/Login";
import NotFound from "../pages/404";

const Router = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* 404 Not Found page */}
                <Route element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
                <Route path='' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
