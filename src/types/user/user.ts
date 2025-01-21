export interface User {
    id: string;

    userName: string;
    fullName: string;

    email: string;
    password: string;

    createdAt: Date | null;
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
export function parseUser(_input: object): User {
    const input = _input as { createdAt: string; username: string; _id: string } & Omit<User, "userName" | "createdAt" | "id">;

    return {
        id: input._id,
        userName: input.username,
        fullName: input.fullName,
        email: input.email,
        password: input.password,
        createdAt: new Date(input.createdAt),
    } as User;
}