
export default abstract class Utils {
  public static deepClone = (obj: object) => {
    return JSON.parse(JSON.stringify(obj));
  }
}