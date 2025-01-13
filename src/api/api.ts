import { urls } from "./urls";
import * as  services from "./services";

export interface LoginUser {
    username: string,
    password: string
}
export const api = {    
    login: async (user: LoginUser) => services.post({ url: urls.login(), body: user, needsToken: false }),
    getAllUsers: async () => services.get({ url: urls.getAllUsers() }),
    getAUser: async (userID: string) => services.get({ url: urls.getAUser(userID) }),
    postAnewUser: async (user: any) => services.post({ url: urls.postAnewUser(), body: user }),
    updateAUser: async (userID: string, user: any) => services.put({ url: urls.updateAUser(userID), body: user }),
    deleteAUser: async (userID: string) => services.del({ url: urls.deleteAUser(userID) })
}


