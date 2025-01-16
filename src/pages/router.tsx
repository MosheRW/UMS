import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router";
import Login from "./login";
import Dashboard from "./dasboard";
import Layout from "./layout";
import Main from "./main";
import EditPage from "./editPage";
import { Version } from "../components/editUserPageComponent/editUserPageComponent";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/`} element={<Layout />} >

                    <Route index element={<Main />} />

                    <Route path={`/dashboard`} element={<Dashboard />} />
                    <Route path={`/login`} element={<Login />} />

                    <Route path={`/signup`} element={<EditPage version={Version.SignUP} />} />
                    <Route path={`/createUser`} element={<EditPage version={Version.Create} />} />
                    <Route path={`/EditUser`} element={<EditPage version={Version.Edit} />} />

                </Route>
            </Routes>
        </BrowserRouter>

    );
}
