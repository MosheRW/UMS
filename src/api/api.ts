import { urls } from "./urls";
import * as  services from "./services";

export interface LoginUser {
    username: string,
    password: string
}
export const  api = {
    login: async (user: LoginUser) => services.post(urls.login(), user),
    getAllUsers: async () => services.get(urls.getAllUsers()),
    getAUser: async (userID: string) => services.get(urls.getAUser(userID)),
    postAnewUser: async (user: any) => services.post(urls.postAnewUser(), user),
    updateAUser: async (userID: string, user: any) => services.patch(urls.updateAUser(userID), user),
    deleteAUser: async (userID: string) => services.del(urls.deleteAUser(userID))
}


