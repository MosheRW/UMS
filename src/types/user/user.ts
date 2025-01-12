export interface User {
    id: string;

    userName: string;
    fullName: string;

    email: string;
    password: string;

    createdAt: Date;
}


export function initUser(): User {
    return {
        id: "",
        userName: "",
        fullName: "",
        email: "",
        password: "",
        createdAt: new Date(),
    };
}