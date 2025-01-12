import { urls } from "./urls";
import * as  services from "./services";

export interface LoginUser {
    username: string,
    password: string
}
export const  api = {
    login: (user: LoginUser) => services.post(urls.login(), user),
    getAllUsers: () => services.get(urls.getAllUsers()),
    getAUser: (userID: string) => services.get(urls.getAUser(userID)),
    postAnewUser: (user: any) => services.post(urls.postAnewUser(), user),
    updateAUser: (userID: string, user: any) => services.patch(urls.updateAUser(userID), user),
    deleteAUser: (userID: string) => services.del(urls.deleteAUser(userID))
}