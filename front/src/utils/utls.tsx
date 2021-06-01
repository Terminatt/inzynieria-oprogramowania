import { AxiosInstance } from "axios";
import { BreakpointsMap, ResponsiveBreakpoint } from "./utils-types";

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
    Object.assign(instance.defaults, { headers: { authorization: token } });
  }

  public static getResponsiveBreakpoint = (): ResponsiveBreakpoint => {
    const width = Utils.getPageWidth();
    const breakPoints: Array<[number, keyof typeof ResponsiveBreakpoint]> = Object.entries(BreakpointsMap) as any; // fallback due to entries incorretly infering key type
    let breakPoint = ResponsiveBreakpoint.XXL;

    for (const [key, value] of breakPoints) {
      if (width <= key) {
        breakPoint = ResponsiveBreakpoint[value];
        break;
      }
    }
    return breakPoint;
  }

  public static getPageWidth = (): number => {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  public static initCap = (text: string) => {
    return text.toLowerCase().split(/\s|_/).map((el) => el[0].toUpperCase() + el.slice(1)).join(" ");
  }
}