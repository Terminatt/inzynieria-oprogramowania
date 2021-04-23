export default interface BaseResponse<Data = {}> {
  document?: Data;
  success: boolean;
}