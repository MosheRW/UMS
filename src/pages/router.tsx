import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Main from "./main";
import Login from "./login";
import Dashboard from "./dasboard";
import Layout from "./layout";
import { basePath } from "../api/urls";

export default function Router({ homePage }: { homePage: string }) {

    return (
        <BrowserRouter basename={basePath}>

            <Routes>
                <Route path={"/"} element={<Layout />} >
                    <Route index element={<Navigate to={homePage} />} />
                    {/* <Route path={`${basePath}/dashboard`} element={<Dashboard />} /> */}
                    <Route path={"/dashboard"} element={<Dashboard />} />
                    {/* <Route path={`${basePath}/login`} element={<Login />} /> */}
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"*"} element={<Login />} />

                </Route>
            </Routes>


        </BrowserRouter>

    );
}
