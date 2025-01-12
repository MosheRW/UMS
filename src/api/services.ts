import axios from 'axios';
import store from '../redux/store';

function getAuthToken(key: string = 'Authorization', prefix: string = `Bearer `) {

    const token = store.getState().userData.token;
    if (token && token.length > 0) {
        console.assert(token, "not getting token");
        return { [key]: `${prefix}${token}` };
    } else
        return {};
};

const client = {
    standard: () => axios.create({
        headers: {
            "Content-type": "application/json",
            ...getAuthToken(),
        },
    }),
    uploadFile: () => axios.create({
        headers: {
            "Content-type": "multipart/form-data",
            ...getAuthToken(),
        },
    }),
    getFile: () => axios.create({
        responseType: 'blob',
        headers: {
            "Content-type": "multipart/form-data",
            ...getAuthToken(),
        },
    })


}


export interface request {
    url: string;
    body: any;

    deBug?: boolean;
    finally?: Function;
};


export async function post(url: string, body: any = {}) {

    try {
        return (await client.standard().post(url, body)).data;
    } catch (error) {
        console.error(`post request (${url}) Error:`, error);
    }
}

export async function get(url: string, body: any = {}) {
    try {
        return (await client.standard().get(url, body)).data;
    } catch (error) {
        console.error(`get request (${url}) Error:`, error);
    }
}

export async function put(url: string, body: any = {}) {
    try {
        return (await client.standard().put(url, body)).data;
    } catch (error) {
        console.error(`put request (${url}) Error:`, error);
    }
}

export async function del(url: string, body: any = {}) {
    try {
        return (await client.standard().delete(url, body)).data;
    } catch (error) {
        console.error(`delete request (${url}) Error:`, error);
    }
}

export async function patch(url: string, body: any = {}) {
    try {
        return (await client.standard().patch(url, body)).data;
    } catch (error) {
        console.error(`patch request (${url}) Error:`, error);
    }
}
