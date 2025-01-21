import React from "react";
import EditUserPage, { Version } from "../components/editUserPageComponent/editUserPageComponent";
import { useLocation } from "react-router";


export default function EditPage({ version }: { version: Version }) {
    const location = useLocation();
    const { state } = location;

    return state?.user && <EditUserPage
        version={version} /> ||
        <EditUserPage
            version={version}
            user={state} />

}