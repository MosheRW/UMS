import { urls } from './urls';
import * as services from './services';
import { User } from '../types/user/user';

export interface LoginUser {
  username: string;
  password: string;
}
export const api = {
  login: async (user: LoginUser, toast: boolean = false) =>
    services.post({ url: urls.login(), body: user, needsToken: false, isToast: toast }),
  getAllUsers: async (toast: boolean = false) =>
    services.get({ url: urls.getAllUsers(), isToast: toast }),
  getAUser: async (userID: string, toast: boolean = false) =>
    services.get({ url: urls.getAUser(userID), isToast: toast }),
  postAnewUser: async (user: Omit<User, 'id'>, toast: boolean = false) =>
    services.post({ url: urls.postAnewUser(), body: user, isToast: toast }),
  updateAUser: async (userID: string, user: Partial<User>, toast: boolean = false) =>
    services.put({ url: urls.updateAUser(userID), body: user, isToast: toast }),
  signUpUser: async (user:  Omit<User, 'id'>, token?: string, toast: boolean = false) =>
    services.post({ url: urls.postAnewUser(), body: user, isToast: toast }),
  deleteAUser: async (userID: string, toast: boolean = false) =>
    services.del({ url: urls.deleteAUser(userID), isToast: toast }),
};


