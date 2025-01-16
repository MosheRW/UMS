export const  basePath = process.env.REACT_APP_BASE_URL || "";
const baseUrl = 'https://server-n42x.onrender.com/api';

export const urls = {    
    login: () => `${baseUrl}/auth/login`,
    getAllUsers: () => `${baseUrl}/users`,
    getAUser: (userID: string) => `${baseUrl}/users/${userID}`,
    postAnewUser: () => `${baseUrl}/users`,
    updateAUser: (userID: string) => `${baseUrl}/users/${userID}`,
    deleteAUser: (userID: string) => `${baseUrl}/users/${userID}`,
};