import axios from 'axios';
import { toast } from 'react-toastify';

function getAuthToken(key: string = 'Authorization') {
    const token = localStorage.getItem("userToken");
    if (token && token.length > 0) {
        console.assert(token, "not getting token");
        return { [key]: `${token}` };
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
    withCostumToken: (token: string) => axios.create({
        headers: {
            "Content-type": "application/json",
            Authorization: `${token}`,
        },
    })
}


export interface Request {
    url: string;
    body: object;
    needsToken?: boolean;

    deBug?: boolean;
    finally?: () => void;
    isToast?: boolean;
    specialToken?: string;
};


export async function post({ ...props }: Request) {
    const { url, body, needsToken = true, isToast = true } = props;
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
        if (counter > 5 && isToast) {
            toast.error("you need to log in first");
            return [];
        }
    }
    try {
        const data = props.specialToken && (await client.withCostumToken(props.specialToken).post(url, body)).data ||
            (await client.standard().post(url, body)).data;
        if (isToast) {
            toast.dismiss();
            toast.success("success");
        }
        return data;

    } catch (error: unknown) {
        console.error(`post Request (${url}) Error:`, error);
    }
}

export async function get({ ...props }: Omit<Request, 'body'>) {
    const { url, isToast = true } = props;



    try {
        const data = props.specialToken && (await client.withCostumToken(props.specialToken).get(url)).data ||
            (await client.standard().get(url)).data;

        if (isToast) {
            toast.dismiss();
            toast.success("success");
        }
        return data;
    } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "status" in error && isToast) {
            const { status } = error as { status: number }; // Type assertion
            switch (status) {
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
}

export async function put({ ...props }: Request) {
    const { url, body, needsToken = true, isToast = true } = props;
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
        if (counter > 5 && isToast) {
            toast.error("you need to log in first");
            return [];
        }
    }

    try {
        const data = (await client.standard().put(url, body)).data;
        if (isToast) {
            toast.dismiss();
            toast.success("success");
        }
        return data;
    } catch (error) {
        console.error(`put Request (${url}) Error:`, error);
    }
}

export async function del({ ...props }: Omit<Request, 'body'>) {
    const { url, needsToken = true, isToast = true } = props;


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
        if (counter > 5 && isToast) {
            toast.error("you need to log in first");
            return [];
        }
    }
    try {
        const data = props.specialToken && (
            await client.withCostumToken(props.specialToken).delete(url)).data ||
            (await client.standard().delete(url)).data;

        if (isToast) {
            toast.dismiss();
            toast.success("success");
        }
        return data;
    } catch (error) {
        console.error(`delete Request (${url}) Error:`, error);
    }
}

export async function patch({ ...props }: Request) {
    const { url, body,} = props;

    try {
        return (await client.standard().patch(url, body)).data;
    } catch (error) {
        console.error(`patch Request (${url}) Error:`, error);
    }
}
