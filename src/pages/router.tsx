import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import Main from "./main";
import Login from "./login";
import Dashboard from "./dasboard";
import Layout from "./layout";


export default function Router() {

    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Main />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>

            
        </BrowserRouter>

    );
}
