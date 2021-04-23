import { AxiosInstance } from "axios";

export default abstract class Utils {
  public static deepClone = (obj: object) => {
    return JSON.parse(JSON.stringify(obj));
  }

  public static setToken = (token: string): void => {
    sessionStorage.setItem('token', token);
  }

  public static getToken = (): ReturnType<typeof sessionStorage.getItem> => {
    return sessionStorage.getItem('token');
  }

  public static setAxiosHeaders = (token: string, instance: AxiosInstance): void => {
    Object.assign(instance.defaults, { headers: { authorization: 'token' } });
  }
}