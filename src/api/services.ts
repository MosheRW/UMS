import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

function getAuthToken(key: string = 'Authorization', prefix: string = `Bearer `) {
    const token = localStorage.getItem("userToken");
    if (token && token.length > 0) {
        console.assert(token, "not getting token");
        return { [key]:`${token}` };
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


export interface Request {
    url: string;
    body: any;
    needsToken?: boolean;

    deBug?: boolean;
    finally?: Function;
};


export async function post({ ...props }: Request) {
    const { url, body, needsToken = true, deBug = false } = props;
    if (needsToken && typeof (getAuthToken().Authorization) == "undefined") {
        let counter = 0;
        const intervalId = setInterval(() => {
            if (typeof (getAuthToken().Authorization) != "undefined") {
                counter += 1;
            }
            if (counter > 5) {
                clearInterval(intervalId);
            }
        }, 1000);
        if (counter > 5) {
            toast.error("you need to log in first");
            return [];
        }
    }
    try {
        const data = (await client.standard().post(url, body)).data;
        toast.dismiss();
        toast.success("success"); return data;
    } catch (error: AxiosError | any) {
        // switch (error?.response?.status) {
        //     case 400:
        //         toast.error("Bad Request");
        //         break;
        //     case 401:
        //         toast.error("Unauthorized");
        //         break;
        //     case 403:
        //         toast.error("Forbidden");
        //         break;
        //     case 404:
        //         toast.error("Not Found");
        //         break;
        //     case 500:
        //         toast.error("Server Error");
        //         break;
        //     case 503:
        //         toast.error("Service Unavailable");
        //         break;
        //     default:
        //         break;
        // }
        console.error(`post Request (${url}) Error:`, error);
    }
}

export async function get({ ...props }: Omit<Request, 'body'>) {
    const { url, needsToken = true, deBug = false } = props;

    // if (needsToken && typeof (getAuthToken().Authorization) == "undefined") {
    //     let counter = 0;
    //     const intervalId = setInterval(() => {
    //         if (typeof (getAuthToken().Authorization) != "undefined") {
    //             counter += 1;
    //         }
    //         if (counter > 5) {
    //             clearInterval(intervalId);
    //         }
    //     }, 1000);
    //     if (counter > 5) {
    //         toast.error("you need to log in first");
    //         return [];
    //     }
    // }

    try {
        const data = (await client.standard().get(url)).data;
        toast.dismiss();
        toast.success("success");
        return data;
    } catch (error: AxiosError | any) {
        switch (error?.status) {
            case 400:
                toast.error("Bad Request");
                break;
            case 401:
                toast.error("Unauthorized");
                break;
            case 403:
                toast.error("Forbidden");
                break;
            case 404:
                toast.error("Not Found");
                break;
            case 500:
                toast.error("Server Error");
                break;
            case 503:
                toast.error("Service Unavailable");
                break;
            default:
                break;
        }
        console.error(`get Request (${url}) Error:`, error);
        console.error(`get Request (${url}) Error:`, error?.status);

    }
}

export async function put({ ...props }: Request) {
    const { url, body, needsToken = true, deBug = false } = props;
    if (needsToken && typeof (getAuthToken().Authorization) == "undefined") {
        let counter = 0;
        const intervalId = setInterval(() => {
            if (typeof (getAuthToken().Authorization) != "undefined") {
                counter += 1;
            }
            if (counter > 5) {
                clearInterval(intervalId);
            }
        }, 1000);
        if (counter > 5) {
            toast.error("you need to log in first");
            return [];
        }
    }

    try {
        const data = (await client.standard().put(url, body)).data;
        toast.dismiss();
        toast.success("success");
        return data;
    } catch (error) {
        console.error(`put Request (${url}) Error:`, error);
    }
}

export async function del({ ...props }: Omit<Request, 'body'>) {
    const { url, needsToken = true, deBug = false } = props;

    if (needsToken && typeof (getAuthToken().Authorization) == "undefined") {
        let counter = 0;
        const intervalId = setInterval(() => {
            if (typeof (getAuthToken().Authorization) != "undefined") {
                counter += 1;
            }
            if (counter > 5) {
                clearInterval(intervalId);
            }
        }, 1000);
        if (counter > 5) {
            toast.error("you need to log in first");
            return [];
        }
    }
    try {
        const data = (await client.standard().delete(url)).data;
        toast.dismiss();
        toast.success("success");
        return data;
    } catch (error) {
        console.error(`delete Request (${url}) Error:`, error);
    }
}

export async function patch({ ...props }: Request) {
    const { url, body, needsToken = true, deBug = false } = props;

    try {
        return (await client.standard().patch(url, body)).data;
    } catch (error) {
        console.error(`patch Request (${url}) Error:`, error);
    }
}
