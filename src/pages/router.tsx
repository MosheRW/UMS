import React from "react";
import { Routes, Route } from "react-router";
import Main from "./main";
import Login from "./login";


export default function Router() {

    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />

        </Routes>
    );
}
