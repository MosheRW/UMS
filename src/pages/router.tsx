import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import Main from "./main";
import Login from "./login";
import Dashboard from "./dasboard";
import Layout from "./layout";

const basePath = "/ums";

export default function Router({ homePage }: { homePage: string }) {

    return (
        <BrowserRouter>

            <Routes>
                <Route path={basePath} element={<Layout />} >
                    <Route index element={<Navigate to={homePage} />} />
                    {/*  <Route path={"/dashboard"} element={<Dashboard />} /> */}
                    <Route path={`${basePath}/dashboard`} element={<Dashboard />} />
                    {/* <Route path="/main" element={<Main />} /> */}
                    <Route path={`${basePath}/login`} element={<Login />} />
                    <Route path={"/login"} element={<Login />} />
                </Route>
            </Routes>


        </BrowserRouter>

    );
}
